import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({ example: 'A101' })
  @IsString()
  unitNumber: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  rentAmount: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isOccupied?: boolean;

  @ApiProperty({ example: '2 bedroom apartment with balcony', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
