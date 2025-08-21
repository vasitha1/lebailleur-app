import { IsString, IsInt, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyStatus } from '../../common/enums/property-status.enum';

export class CreatePropertyDto {
  @ApiProperty({ example: 'Sunshine Apartments' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123 Main Street, Douala' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Modern apartment complex with amenities', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 50 })
  @IsInt()
  totalUnits: number;

  @ApiProperty({ enum: PropertyStatus, example: PropertyStatus.ACTIVE, required: false })
  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @ApiProperty({ example: 'uuid-of-manager', required: false })
  @IsOptional()
  @IsUUID()
  managerId?: string;
}
