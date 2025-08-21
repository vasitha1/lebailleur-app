import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get dashboard statistics' })
  getDashboardStats(@Request() req) {
    return this.analyticsService.getDashboardStats(req.user.id, req.user.role);
  }

  @Get('revenue')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get revenue analytics' })
  @ApiQuery({ name: 'period', required: false, enum: ['monthly', 'yearly'] })
  getRevenueAnalytics(@Request() req, @Query('period') period?: string) {
    return this.analyticsService.getRevenueAnalytics(req.user.id, req.user.role, period);
  }

  @Get('payments')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get payment analytics' })
  getPaymentAnalytics(@Request() req) {
    return this.analyticsService.getPaymentAnalytics(req.user.id, req.user.role);
  }

  @Get('occupancy-trends')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get occupancy trends' })
  getOccupancyTrends(@Request() req) {
    return this.analyticsService.getOccupancyTrends(req.user.id, req.user.role);
  }

  @Get('property-performance')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get property performance metrics' })
  getPropertyPerformance(@Request() req) {
    return this.analyticsService.getPropertyPerformance(req.user.id, req.user.role);
  }
}
