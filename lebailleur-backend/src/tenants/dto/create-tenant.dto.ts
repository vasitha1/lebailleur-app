import { IsUUID, IsDateString, IsNumber, IsInt, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TenantStatus } from '../../common/enums/tenant-status.enum';

export class CreateTenantDto {
  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'uuid-of-unit' })
  @IsUUID()
  unitId: string;

  @ApiProperty({ example: '2024-01-01' })
  @IsDateString()
  leaseStartDate: string;

  @ApiProperty({ example: '2024-12-31' })
  @IsDateString()
  leaseEndDate: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  rentAmount: number;

  @ApiProperty({ example: 15, required: false })
  @IsOptional()
  @IsInt()
  paymentDueDay?: number;

  @ApiProperty({ enum: TenantStatus, example: TenantStatus.ACTIVE, required: false })
  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;
}
