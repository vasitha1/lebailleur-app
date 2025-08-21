import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { PaymentStatus } from '../common/enums/payment-status.enum';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Create a new payment' })
  create(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
    return this.paymentsService.create(createPaymentDto, req.user.id, req.user.role);
  }

  @Get()
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Get all payments' })
  findAll(@Request() req) {
    return this.paymentsService.findAll(req.user.id, req.user.role);
  }

  @Get('stats')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Get payment statistics' })
  getStats(@Request() req) {
    return this.paymentsService.getPaymentStats(req.user.id, req.user.role);
  }

  @Get('by-status')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Get payments by status' })
  @ApiQuery({ name: 'status', enum: PaymentStatus })
  getPaymentsByStatus(@Query('status') status: PaymentStatus, @Request() req) {
    return this.paymentsService.getPaymentsByStatus(status, req.user.id, req.user.role);
  }

  @Get('by-date-range')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Get payments by date range' })
  @ApiQuery({ name: 'startDate', type: 'string' })
  @ApiQuery({ name: 'endDate', type: 'string' })
  getPaymentsByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Request() req,
  ) {
    return this.paymentsService.getPaymentsByDateRange(
      new Date(startDate),
      new Date(endDate),
      req.user.id,
      req.user.role,
    );
  }

  @Post('generate-monthly')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Generate monthly payments for all tenants' })
  generateMonthlyPayments(@Request() req) {
    return this.paymentsService.generateMonthlyPayments(req.user.id, req.user.role);
  }

  @Get(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Get payment by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.paymentsService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Update payment' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto, @Request() req) {
    return this.paymentsService.update(id, updatePaymentDto, req.user.id, req.user.role);
  }

  @Post(':id/process')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Process payment' })
  processPayment(@Param('id') id: string, @Body() processPaymentDto: ProcessPaymentDto, @Request() req) {
    return this.paymentsService.processPayment(id, processPaymentDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Delete payment' })
  remove(@Param('id') id: string, @Request() req) {
    return this.paymentsService.remove(id, req.user.id, req.user.role);
  }
}
