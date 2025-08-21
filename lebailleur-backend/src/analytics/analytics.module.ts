import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Property } from '../properties/entities/property.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { Unit } from '../properties/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Payment, Tenant, Unit])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
