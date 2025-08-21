import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { SendPaymentReminderDto } from './dto/send-payment-reminder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('payment-reminder')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Send payment reminder to tenants' })
  sendPaymentReminder(@Body() sendPaymentReminderDto: SendPaymentReminderDto, @Request() req) {
    return this.notificationsService.sendPaymentReminder(
      sendPaymentReminderDto.tenantIds,
      sendPaymentReminderDto.message,
      req.user.id,
      req.user.role,
    );
  }

  @Post('custom')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Send custom notification' })
  sendCustomNotification(@Body() sendNotificationDto: SendNotificationDto, @Request() req) {
    return this.notificationsService.sendCustomNotification(sendNotificationDto, req.user.id, req.user.role);
  }

  @Get('history')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get notification history' })
  getNotificationHistory(@Request() req) {
    return this.notificationsService.getNotificationHistory(req.user.id, req.user.role);
  }

  @Get('automatic-reminders')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get automatic reminder settings' })
  getAutomaticReminders() {
    return this.notificationsService.getAutomaticReminders();
  }

  @Patch('automatic-reminders')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Update automatic reminder settings' })
  updateAutomaticReminders(@Body() schedules: any[]) {
    return this.notificationsService.updateAutomaticReminders(schedules);
  }
}
