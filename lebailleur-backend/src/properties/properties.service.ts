import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { Unit } from './entities/unit.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    @InjectRepository(Unit)
    private unitsRepository: Repository<Unit>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, ownerId: string): Promise<Property> {
    const property = this.propertiesRepository.create({
      ...createPropertyDto,
      ownerId,
    });
    return this.propertiesRepository.save(property);
  }

  async findAll(userId: string, userRole: UserRole): Promise<Property[]> {
    const queryBuilder = this.propertiesRepository.createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .leftJoinAndSelect('property.manager', 'manager')
      .leftJoinAndSelect('property.units', 'units')
      .leftJoinAndSelect('units.tenant', 'tenant')
      .leftJoinAndSelect('tenant.user', 'tenantUser');

    if (userRole === UserRole.OWNER) {
      queryBuilder.where('property.ownerId = :userId', { userId });
    } else if (userRole === UserRole.MANAGER) {
      queryBuilder.where('property.managerId = :userId', { userId });
    } else {
      throw new ForbiddenException('Access denied');
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string, userId: string, userRole: UserRole): Promise<Property> {
    const queryBuilder = this.propertiesRepository.createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .leftJoinAndSelect('property.manager', 'manager')
      .leftJoinAndSelect('property.units', 'units')
      .leftJoinAndSelect('units.tenant', 'tenant')
      .leftJoinAndSelect('tenant.user', 'tenantUser')
      .where('property.id = :id', { id });

    if (userRole === UserRole.OWNER) {
      queryBuilder.andWhere('property.ownerId = :userId', { userId });
    } else if (userRole === UserRole.MANAGER) {
      queryBuilder.andWhere('property.managerId = :userId', { userId });
    } else {
      throw new ForbiddenException('Access denied');
    }

    const property = await queryBuilder.getOne();
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto, userId: string, userRole: UserRole): Promise<Property> {
    const property = await this.findOne(id, userId, userRole);
    
    if (userRole === UserRole.MANAGER && updatePropertyDto.managerId) {
      throw new ForbiddenException('Managers cannot change property manager');
    }

    await this.propertiesRepository.update(id, updatePropertyDto);
    return this.findOne(id, userId, userRole);
  }

  async remove(id: string, userId: string, userRole: UserRole): Promise<void> {
    if (userRole !== UserRole.OWNER) {
      throw new ForbiddenException('Only owners can delete properties');
    }

    const property = await this.findOne(id, userId, userRole);
    await this.propertiesRepository.remove(property);
  }

  async createUnit(propertyId: string, createUnitDto: CreateUnitDto, userId: string, userRole: UserRole): Promise<Unit> {
    await this.findOne(propertyId, userId, userRole); // Verify access

    const unit = this.unitsRepository.create({
      ...createUnitDto,
      propertyId,
    });
    return this.unitsRepository.save(unit);
  }

  async getUnits(propertyId: string, userId: string, userRole: UserRole): Promise<Unit[]> {
    await this.findOne(propertyId, userId, userRole); // Verify access

    return this.unitsRepository.find({
      where: { propertyId },
      relations: ['tenant', 'tenant.user'],
    });
  }

  async getVacantUnits(propertyId: string, userId: string, userRole: UserRole): Promise<Unit[]> {
    await this.findOne(propertyId, userId, userRole); // Verify access

    return this.unitsRepository.find({
      where: { propertyId, isOccupied: false },
    });
  }

  async getPropertyStats(userId: string, userRole: UserRole) {
    const properties = await this.findAll(userId, userRole);
    
    const stats = {
      totalProperties: properties.length,
      totalUnits: 0,
      occupiedUnits: 0,
      vacantUnits: 0,
      totalRevenue: 0,
      occupancyRate: 0,
    };

    properties.forEach(property => {
      stats.totalUnits += property.units.length;
      property.units.forEach(unit => {
        if (unit.isOccupied) {
          stats.occupiedUnits++;
          stats.totalRevenue += Number(unit.rentAmount);
        } else {
          stats.vacantUnits++;
        }
      });
    });

    stats.occupancyRate = stats.totalUnits > 0 ? (stats.occupiedUnits / stats.totalUnits) * 100 : 0;

    return stats;
  }
}
