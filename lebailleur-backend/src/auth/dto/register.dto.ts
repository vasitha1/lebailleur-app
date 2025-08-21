import { IsString, IsEmail, IsOptional, IsEnum, MinLength, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';

export class RegisterDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'WhatsApp number with country code',
    example: '+237123456789',
  })
  @IsOptional()
  @IsPhoneNumber(undefined)
  whatsappNumber?: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Property name',
    example: 'Sunset Apartments',
  })
  @IsOptional()
  @IsString()
  propertyName?: string;

  @ApiProperty({
    description: 'Property location',
    example: 'Douala, Cameroon',
  })
  @IsOptional()
  @IsString()
  propertyLocation?: string;

  @ApiProperty({
    description: 'Property type',
    example: 'Apartments',
    enum: ['Rooms', 'Apartments', 'Shops', 'Offices'],
  })
  @IsOptional()
  @IsString()
  propertyType?: string;

  @ApiProperty({
    description: 'User role - defaults to OWNER for public registration',
    enum: UserRole,
    example: UserRole.OWNER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = UserRole.OWNER;

  // Virtual properties for backend compatibility
  get firstName(): string {
    return this.name?.split(' ')[0] || '';
  }

  get lastName(): string {
    const nameParts = this.name?.split(' ') || [];
    return nameParts.slice(1).join(' ') || '';
  }
}