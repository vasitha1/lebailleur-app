import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { UserRole } from '../common/enums/user-role.enum';
import { PaymentStatus } from '../common/enums/payment-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Tenant)
    private tenantsRepository: Repository<Tenant>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, currentUserId: string, currentUserRole: UserRole): Promise<Payment> {
    // Verify tenant exists and user has access
    const tenant = await this.tenantsRepository.findOne({
      where: { id: createPaymentDto.tenantProfileId },
      relations: ['user', 'unit', 'unit.property'],
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    // Verify access
    if (currentUserRole === UserRole.OWNER && tenant.unit.property.ownerId !== currentUserId) {
      throw new ForbiddenException('Access denied');
    }
    if (currentUserRole === UserRole.MANAGER && tenant.unit.property.managerId !== currentUserId) {
      throw new ForbiddenException('Access denied');
    }

    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      tenantId: tenant.userId,
    });

    return this.paymentsRepository.save(payment);
  }

  async findAll(currentUserId: string, currentUserRole: UserRole): Promise<Payment[]> {
    const queryBuilder = this.paymentsRepository.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.tenant', 'tenant')
      .leftJoinAndSelect('payment.tenantProfile', 'tenantProfile')
      .leftJoinAndSelect('tenantProfile.unit', 'unit')
      .leftJoinAndSelect('unit.property', 'property');

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.where('property.ownerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.MANAGER) {
      queryBuilder.where('property.managerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.TENANT) {
      queryBuilder.where('payment.tenantId = :currentUserId', { currentUserId });
    }

    return queryBuilder.orderBy('payment.dueDate', 'DESC').getMany();
  }

  async findOne(id: string, currentUserId: string, currentUserRole: UserRole): Promise<Payment> {
    const queryBuilder = this.paymentsRepository.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.tenant', 'tenant')
      .leftJoinAndSelect('payment.tenantProfile', 'tenantProfile')
      .leftJoinAndSelect('tenantProfile.unit', 'unit')
      .leftJoinAndSelect('unit.property', 'property')
      .where('payment.id = :id', { id });

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.andWhere('property.ownerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.MANAGER) {
      queryBuilder.andWhere('property.managerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.TENANT) {
      queryBuilder.andWhere('payment.tenantId = :currentUserId', { currentUserId });
    }

    const payment = await queryBuilder.getOne();
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto, currentUserId: string, currentUserRole: UserRole): Promise<Payment> {
    const payment = await this.findOne(id, currentUserId, currentUserRole);
    
    if (currentUserRole === UserRole.TENANT && payment.status === PaymentStatus.PAID) {
      throw new ForbiddenException('Cannot update paid payment');
    }

    await this.paymentsRepository.update(id, updatePaymentDto);
    return this.findOne(id, currentUserId, currentUserRole);
  }

  async remove(id: string, currentUserId: string, currentUserRole: UserRole): Promise<void> {
    if (currentUserRole === UserRole.TENANT) {
      throw new ForbiddenException('Tenants cannot delete payments');
    }

    const payment = await this.findOne(id, currentUserId, currentUserRole);
    await this.paymentsRepository.remove(payment);
  }

  async processPayment(id: string, processPaymentDto: ProcessPaymentDto, currentUserId: string, currentUserRole: UserRole): Promise<Payment> {
    const payment = await this.findOne(id, currentUserId, currentUserRole);

    if (payment.status === PaymentStatus.PAID) {
      throw new BadRequestException('Payment already processed');
    }

    const updateData: Partial<Payment> = {
      status: PaymentStatus.PAID,
      paidDate: new Date(),
      paymentMethod: processPaymentDto.paymentMethod,
      transactionId: processPaymentDto.transactionId,
      notes: processPaymentDto.notes,
    };

    if (processPaymentDto.amount && processPaymentDto.amount < payment.amount) {
      updateData.status = PaymentStatus.PARTIAL;
    }

    await this.paymentsRepository.update(id, updateData);
    return this.findOne(id, currentUserId, currentUserRole);
  }

  async getPaymentStats(currentUserId: string, currentUserRole: UserRole) {
    const payments = await this.findAll(currentUserId, currentUserRole);
    
    const stats = {
      totalPayments: payments.length,
      paidPayments: 0,
      pendingPayments: 0,
      overduePayments: 0,
      partialPayments: 0,
      totalRevenue: 0,
      outstandingAmount: 0,
    };

    payments.forEach(payment => {
      switch (payment.status) {
        case PaymentStatus.PAID:
          stats.paidPayments++;
          stats.totalRevenue += Number(payment.amount);
          break;
        case PaymentStatus.PENDING:
          stats.pendingPayments++;
          stats.outstandingAmount += Number(payment.amount);
          break;
        case PaymentStatus.OVERDUE:
          stats.overduePayments++;
          stats.outstandingAmount += Number(payment.amount);
          break;
        case PaymentStatus.PARTIAL:
          stats.partialPayments++;
          stats.outstandingAmount += Number(payment.amount);
          break;
      }
    });

    return stats;
  }

  async getPaymentsByStatus(status: PaymentStatus, currentUserId: string, currentUserRole: UserRole): Promise<Payment[]> {
    const queryBuilder = this.paymentsRepository.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.tenant', 'tenant')
      .leftJoinAndSelect('payment.tenantProfile', 'tenantProfile')
      .leftJoinAndSelect('tenantProfile.unit', 'unit')
      .leftJoinAndSelect('unit.property', 'property')
      .where('payment.status = :status', { status });

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.andWhere('property.ownerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.MANAGER) {
      queryBuilder.andWhere('property.managerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.TENANT) {
      queryBuilder.andWhere('payment.tenantId = :currentUserId', { currentUserId });
    }

    return queryBuilder.orderBy('payment.dueDate', 'ASC').getMany();
  }

  async getPaymentsByDateRange(startDate: Date, endDate: Date, currentUserId: string, currentUserRole: UserRole): Promise<Payment[]> {
    const queryBuilder = this.paymentsRepository.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.tenant', 'tenant')
      .leftJoinAndSelect('payment.tenantProfile', 'tenantProfile')
      .leftJoinAndSelect('tenantProfile.unit', 'unit')
      .leftJoinAndSelect('unit.property', 'property')
      .where('payment.dueDate BETWEEN :startDate AND :endDate', { startDate, endDate });

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.andWhere('property.ownerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.MANAGER) {
      queryBuilder.andWhere('property.managerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.TENANT) {
      queryBuilder.andWhere('payment.tenantId = :currentUserId', { currentUserId });
    }

    return queryBuilder.orderBy('payment.dueDate', 'ASC').getMany();
  }

  async generateMonthlyPayments(currentUserId: string, currentUserRole: UserRole): Promise<Payment[]> {
    if (currentUserRole === UserRole.TENANT) {
      throw new ForbiddenException('Tenants cannot generate payments');
    }

    // Get all active tenants
    const queryBuilder = this.tenantsRepository.createQueryBuilder('tenant')
      .leftJoinAndSelect('tenant.unit', 'unit')
      .leftJoinAndSelect('unit.property', 'property')
      .where('tenant.status = :status', { status: 'active' });

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.andWhere('property.ownerId = :currentUserId', { currentUserId });
    } else if (currentUserRole === UserRole.MANAGER) {
      queryBuilder.andWhere('property.managerId = :currentUserId', { currentUserId });
    }

    const tenants = await queryBuilder.getMany();
    const payments: Payment[] = [];

    const currentDate = new Date();
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    for (const tenant of tenants) {
      const dueDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), tenant.paymentDueDay);
      
      // Check if payment already exists for this month
      const existingPayment = await this.paymentsRepository.findOne({
        where: {
          tenantProfileId: tenant.id,
          dueDate: Between(nextMonth, new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0)),
        },
      });

      if (!existingPayment) {
        const payment = this.paymentsRepository.create({
          tenantId: tenant.userId,
          tenantProfileId: tenant.id,
          amount: tenant.rentAmount,
          dueDate,
          status: PaymentStatus.PENDING,
        });

        const savedPayment = await this.paymentsRepository.save(payment);
        payments.push(savedPayment);
      }
    }

    return payments;
  }
}
