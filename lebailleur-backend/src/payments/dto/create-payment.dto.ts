import { IsUUID, IsNumber, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../common/enums/payment-status.enum';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-of-tenant-profile' })
  @IsUUID()
  tenantProfileId: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2024-11-15' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING, required: false })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({ example: 'Monthly rent payment', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
