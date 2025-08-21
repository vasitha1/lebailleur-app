import { Injectable } from '@nestjs/common';
import { SendNotificationDto } from './dto/send-notification.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class NotificationsService {
  async sendPaymentReminder(tenantIds: string[], message: string, currentUserId: string, currentUserRole: UserRole) {
    if (currentUserRole === UserRole.TENANT) {
      throw new Error('Tenants cannot send notifications');
    }

    // Mock implementation - in real app, integrate with email/SMS service
    const notification = {
      id: `notif_${Date.now()}`,
      type: 'payment_reminder',
      recipients: tenantIds,
      message,
      sentBy: currentUserId,
      sentAt: new Date(),
      status: 'sent',
    };

    console.log('Payment reminder sent:', notification);
    return notification;
  }

  async sendCustomNotification(sendNotificationDto: SendNotificationDto, currentUserId: string, currentUserRole: UserRole) {
    if (currentUserRole === UserRole.TENANT) {
      throw new Error('Tenants cannot send notifications');
    }

    // Mock implementation
    const notification = {
      id: `notif_${Date.now()}`,
      type: 'custom',
      recipients: sendNotificationDto.recipients,
      message: sendNotificationDto.message,
      subject: sendNotificationDto.subject,
      sentBy: currentUserId,
      sentAt: new Date(),
      status: 'sent',
    };

    console.log('Custom notification sent:', notification);
    return notification;
  }

  async getNotificationHistory(currentUserId: string, currentUserRole: UserRole) {
    // Mock implementation - return sample notification history
    return [
      {
        id: 'notif_1',
        type: 'payment_reminder',
        recipients: ['tenant1', 'tenant2'],
        message: 'Your rent payment is due in 3 days',
        sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'delivered',
      },
      {
        id: 'notif_2',
        type: 'overdue_notice',
        recipients: ['tenant3'],
        message: 'Your rent payment is overdue',
        sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'sent',
      },
    ];
  }

  async getAutomaticReminders() {
    return {
      enabled: true,
      schedules: [
        { days: 7, message: 'Rent due in 7 days', active: true },
        { days: 3, message: 'Rent due in 3 days', active: true },
        { days: 0, message: 'Rent is due today', active: true },
        { days: -1, message: 'Rent payment is overdue', active: true },
      ],
    };
  }

  async updateAutomaticReminders(schedules: any[]) {
    // Mock implementation
    return {
      enabled: true,
      schedules,
      updatedAt: new Date(),
    };
  }
}
