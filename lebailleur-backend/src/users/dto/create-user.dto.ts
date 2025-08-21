import { IsEmail, IsString, IsEnum, IsOptional, MinLength, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsPhoneNumber(undefined) // Validates international phone numbers
  whatsappNumber?: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '+237123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ enum: UserRole, example: UserRole.TENANT })
  @IsEnum(UserRole)
  role: UserRole;

   @IsOptional()
  @IsString()
  propertyName?: string;

  @IsOptional()
  @IsString()
  propertyLocation?: string;

  @IsOptional()
  @IsString()
  propertyType?: string;

}
