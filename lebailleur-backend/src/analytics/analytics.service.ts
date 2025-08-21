import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { Unit } from '../properties/entities/unit.entity';
import { UserRole } from '../common/enums/user-role.enum';
import { PaymentStatus } from '../common/enums/payment-status.enum';

export interface OccupancyTrend {
  month: string;
  occupancyRate: number;
  totalUnits: number;
  occupiedUnits: number;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Tenant)
    private tenantsRepository: Repository<Tenant>,
    @InjectRepository(Unit)
    private unitsRepository: Repository<Unit>,
  ) {}

  async getDashboardStats(currentUserId: string, currentUserRole: UserRole) {
    if (currentUserRole === UserRole.TENANT) {
      throw new ForbiddenException('Tenants cannot access analytics');
    }

    const whereClause = currentUserRole === UserRole.OWNER
      ? { ownerId: currentUserId }
      : { managerId: currentUserId };

    // Get properties
    const properties = await this.propertiesRepository.find({
      where: whereClause,
      relations: ['units', 'units.tenant'],
    });

    // Calculate basic stats
    const totalProperties = properties.length;
    let totalUnits = 0;
    let occupiedUnits = 0;
    let totalRevenue = 0;

    properties.forEach(property => {
      totalUnits += property.units.length;
      property.units.forEach(unit => {
        if (unit.isOccupied) {
          occupiedUnits++;
          totalRevenue += Number(unit.rentAmount);
        }
      });
    });

    const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

    // Get payment stats
    const paymentStats = await this.getPaymentAnalytics(currentUserId, currentUserRole);

    return {
      totalProperties,
      totalUnits,
      occupiedUnits,
      vacantUnits: totalUnits - occupiedUnits,
      occupancyRate: Math.round(occupancyRate * 100) / 100,
      totalRevenue,
      ...paymentStats,
    };
  }

  async getRevenueAnalytics(currentUserId: string, currentUserRole: UserRole, period: string = 'monthly') {
    if (currentUserRole === UserRole.TENANT) {
      throw new ForbiddenException('Tenants cannot access analytics');
    }

    const queryBuilder = this.paymentsRepository.createQueryBuilder('payment')
      .leftJoin('payment.tenantProfile', 'tenantProfile')
      .leftJoin('tenantProfile.unit', 'unit')
      .leftJoin('unit.property', 'property')
      .where('payment.status = :status', { status: PaymentStatus.PAID });

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.andWhere('property.ownerId = :currentUserId', { currentUserId });
    } else {
      queryBuilder.andWhere('property.managerId = :currentUserId', { currentUserId });
    }

    const payments = await queryBuilder.getMany();

    // Group payments by period
    const revenueData = {};
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      revenueData[key] = 0;
    }

    payments.forEach(payment => {
      if (payment.paidDate) {
        const date = new Date(payment.paidDate);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (revenueData[key] !== undefined) {
          revenueData[key] += Number(payment.amount);
        }
      }
    });

    return Object.entries(revenueData).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  }

  async getPaymentAnalytics(currentUserId: string, currentUserRole: UserRole) {
    if (currentUserRole === UserRole.TENANT) {
      throw new ForbiddenException('Tenants cannot access analytics');
    }

    const queryBuilder = this.paymentsRepository.createQueryBuilder('payment')
      .leftJoin('payment.tenantProfile', 'tenantProfile')
      .leftJoin('tenantProfile.unit', 'unit')
      .leftJoin('unit.property', 'property');

    if (currentUserRole === UserRole.OWNER) {
      queryBuilder.where('property.ownerId = :currentUserId', { currentUserId });
    } else {
      queryBuilder.where('property.managerId = :currentUserId', { currentUserId });
    }

    const payments = await queryBuilder.getMany();

    const stats = {
      totalPayments: payments.length,
      paidPayments: 0,
      pendingPayments: 0,
      overduePayments: 0,
      partialPayments: 0,
      collectedRevenue: 0,
      outstandingAmount: 0,
      collectionRate: 0,
    };

    const today = new Date();

    payments.forEach(payment => {
      const dueDate = new Date(payment.dueDate);
      switch (payment.status) {
        case PaymentStatus.PAID:
          stats.paidPayments++;
          stats.collectedRevenue += Number(payment.amount);
          break;
        case PaymentStatus.PENDING:
          if (dueDate < today) {
            stats.overduePayments++;
            stats.outstandingAmount += Number(payment.amount);
          } else {
            stats.pendingPayments++;
            stats.outstandingAmount += Number(payment.amount);
          }
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

    const totalExpected = stats.collectedRevenue + stats.outstandingAmount;
    stats.collectionRate = totalExpected > 0 ? (stats.collectedRevenue / totalExpected) * 100 : 0;

    return stats;
  }

  async getOccupancyTrends(currentUserId: string, currentUserRole: UserRole): Promise<OccupancyTrend[]> {
    if (currentUserRole === UserRole.TENANT) {
      throw new ForbiddenException('Tenants cannot access analytics');
    }

    const whereClause = currentUserRole === UserRole.OWNER
      ? { ownerId: currentUserId }
      : { managerId: currentUserId };

    const properties = await this.propertiesRepository.find({
      where: whereClause,
      relations: ['units'],
    });

    // Explicitly type the trends array
    const trends: OccupancyTrend[] = [];
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      let totalUnits = 0;
      let occupiedUnits = 0;

      properties.forEach(property => {
        totalUnits += property.units.length;
        occupiedUnits += property.units.filter(unit => unit.isOccupied).length;
      });

      // Add some variation for demo purposes
      const variation = Math.random() * 0.1 - 0.05; // ±5% variation
      const occupancyRate = totalUnits > 0 ? ((occupiedUnits / totalUnits) + variation) * 100 : 0;

      trends.push({
        month,
        occupancyRate: Math.max(0, Math.min(100, occupancyRate)),
        totalUnits,
        occupiedUnits: Math.round(totalUnits * (occupancyRate / 100)),
      });
    }

    return trends;
  }

  async getPropertyPerformance(currentUserId: string, currentUserRole: UserRole) {
    if (currentUserRole === UserRole.TENANT) {
      throw new ForbiddenException('Tenants cannot access analytics');
    }

    const whereClause = currentUserRole === UserRole.OWNER
      ? { ownerId: currentUserId }
      : { managerId: currentUserId };

    const properties = await this.propertiesRepository.find({
      where: whereClause,
      relations: ['units', 'units.tenant', 'units.tenant.payments'],
    });

    return properties.map(property => {
      const totalUnits = property.units.length;
      const occupiedUnits = property.units.filter(unit => unit.isOccupied).length;
      const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

      let totalRevenue = 0;
      let collectedRevenue = 0;

      property.units.forEach(unit => {
        if (unit.tenant) {
          totalRevenue += Number(unit.rentAmount);
          unit.tenant.payments
            .filter(payment => payment.status === PaymentStatus.PAID)
            .forEach(payment => {
              collectedRevenue += Number(payment.amount);
            });
        }
      });

      return {
        id: property.id,
        name: property.name,
        address: property.address,
        totalUnits,
        occupiedUnits,
        occupancyRate: Math.round(occupancyRate * 100) / 100,
        monthlyRevenue: totalRevenue,
        collectedRevenue,
        performance: occupancyRate >= 90 ? 'excellent' : occupancyRate >= 75 ? 'good' : 'needs_attention',
      };
    });
  }
}