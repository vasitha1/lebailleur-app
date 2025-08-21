import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessPaymentDto {
  @ApiProperty({ example: 'MTN Mobile Money' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ example: 'TXN123456789', required: false })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiProperty({ example: 50000, required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ example: 'Payment processed successfully', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
