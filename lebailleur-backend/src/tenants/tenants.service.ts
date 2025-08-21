import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { Unit } from '../properties/entities/unit.entity';
import { User } from '../users/entities/user.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { UserRole } from '../common/enums/user-role.enum';
import { PaymentStatus } from '../common/enums/payment-status.enum';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private tenantsRepository: Repository<Tenant>,
    @InjectRepository(Unit)
    private unitsRepository: Repository<Unit>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createTenantDto: CreateTenantDto, currentUserId: string, currentUserRole: UserRole): Promise<Tenant> {
    // Verify unit exists and is vacant
    const unit = await this.unitsRepository.findOne({
      where: { id: createTenantDto.unitId },
      relations: ['property'],
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    if (unit.isOccupied) {
      throw new BadRequestException('Unit is already occupied');
    }

    // Verify access to property
    if (currentUserRole === UserRole.OWNER && unit.property.ownerId !== currentUserId) {
      throw new ForbiddenException('Access denied');
    }
    if (currentUserRole === UserRole.MANAGER && unit.property.managerId !== currentUserId) {
      throw new ForbiddenException('Access denied');
    }

    // Verify user exists and is a tenant
    const user = await this.usersRepository.findOne({
      where: { id: createTenantDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRole.TENANT) {
      throw new BadRequestException('User must be a tenant');
    }

    // Create tenant
    const tenant = this.tenantsRepository.create(createTenantDto);
    const savedTenant = await this.tenantsRepository.save(tenant);

    // Update unit as occupied
    await this.unitsRepository.update(createTenantDto.unitId, { isOccupied: true });

    return this.findOne(savedTenant.id, currentUserId, currentUserRole);
  }

  async findAll(currentUserId: string, currentUserRole: UserRole): Promise<Tenant[]> {
    const queryBuilder = this.tenantsRepository.createQueryBuilder('tenant')
      .leftJoinAndSelect('tenant.user', 'user')
      .leftJoinAndSelect('tenant.unit', 'unit')
      .leftJoinAndSelect('unit.property', 'property')
      .leftJoinAndSelect('tenant.payments', 'payments');

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.where('property.ownerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.MANAGER) {
      queryBuilder.where('property.managerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.TENANT) {
      queryBuilder.where('tenant.userId = :currentUserId', { currentUserId });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string, currentUserId: string, currentUserRole: UserRole): Promise<Tenant> {
    const queryBuilder = this.tenantsRepository.createQueryBuilder('tenant')
      .leftJoinAndSelect('tenant.user', 'user')
      .leftJoinAndSelect('tenant.unit', 'unit')
      .leftJoinAndSelect('unit.property', 'property')
      .leftJoinAndSelect('tenant.payments', 'payments')
      .where('tenant.id = :id', { id });

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.andWhere('property.ownerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.MANAGER) {
      queryBuilder.andWhere('property.managerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.TENANT) {
      queryBuilder.andWhere('tenant.userId = :currentUserId', { currentUserId });
    }

    const tenant = await queryBuilder.getOne();
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto, currentUserId: string, currentUserRole: UserRole): Promise<Tenant> {
    const tenant = await this.findOne(id, currentUserId, currentUserRole);
    
    if (currentUserRole === UserRole.TENANT) {
      // Tenants can only update limited fields
      const allowedFields = ['phone'];
      const filteredUpdate = Object.keys(updateTenantDto)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = updateTenantDto[key];
          return obj;
        }, {});
      
      if (Object.keys(filteredUpdate).length === 0) {
        throw new ForbiddenException('No allowed fields to update');
      }
      
      await this.tenantsRepository.update(id, filteredUpdate);
    } else {
      await this.tenantsRepository.update(id, updateTenantDto);
    }

    return this.findOne(id, currentUserId, currentUserRole);
  }

  async remove(id: string, currentUserId: string, currentUserRole: UserRole): Promise<void> {
    if (currentUserRole === UserRole.TENANT) {
      throw new ForbiddenException('Tenants cannot delete their own records');
    }

    const tenant = await this.findOne(id, currentUserId, currentUserRole);
    
    // Mark unit as vacant
    await this.unitsRepository.update(tenant.unitId, { isOccupied: false });
    
    await this.tenantsRepository.remove(tenant);
  }

  async getTenantStats(currentUserId: string, currentUserRole: UserRole) {
    const tenants = await this.findAll(currentUserId, currentUserRole);
    
    const stats = {
      totalTenants: tenants.length,
      activeTenants: 0,
      inactiveTenants: 0,
      overduePayments: 0,
      upcomingPayments: 0,
      totalRentDue: 0,
    };

    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    tenants.forEach(tenant => {
      if (tenant.status === 'active') {
        stats.activeTenants++;
      } else {
        stats.inactiveTenants++;
      }

      // Check for overdue and upcoming payments
      tenant.payments.forEach(payment => {
        if (payment.status === PaymentStatus.OVERDUE) {
          stats.overduePayments++;
          stats.totalRentDue += Number(payment.amount);
        } else if (payment.status === PaymentStatus.PENDING && payment.dueDate <= nextWeek) {
          stats.upcomingPayments++;
        }
      });
    });

    return stats;
  }

  async getTenantsByStatus(status: string, currentUserId: string, currentUserRole: UserRole): Promise<Tenant[]> {
    const queryBuilder = this.tenantsRepository.createQueryBuilder('tenant')
      .leftJoinAndSelect('tenant.user', 'user')
      .leftJoinAndSelect('tenant.unit', 'unit')
      .leftJoinAndSelect('unit.property', 'property')
      .leftJoinAndSelect('tenant.payments', 'payments')
      .where('tenant.status = :status', { status });

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.andWhere('property.ownerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.MANAGER) {
      queryBuilder.andWhere('property.managerId = :currentUserId', { currentUserId });
    }

    return queryBuilder.getMany();
  }
}
