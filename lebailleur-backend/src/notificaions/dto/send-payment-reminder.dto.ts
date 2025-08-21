import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendPaymentReminderDto {
  @ApiProperty({ example: ['tenant1-id', 'tenant2-id'] })
  @IsArray()
  @IsString({ each: true })
  tenantIds: string[];

  @ApiProperty({ example: 'Your rent payment is due soon. Please make payment by the due date.' })
  @IsString()
  message: string;
}
