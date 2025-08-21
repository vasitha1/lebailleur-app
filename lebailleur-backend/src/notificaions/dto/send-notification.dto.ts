import { IsArray, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({ example: ['tenant1-id', 'tenant2-id'] })
  @IsArray()
  @IsString({ each: true })
  recipients: string[];

  @ApiProperty({ example: 'Important Notice' })
  @IsString()
  subject: string;

  @ApiProperty({ example: 'This is an important message for all tenants.' })
  @IsString()
  message: string;

  @ApiProperty({ example: 'email', required: false })
  @IsOptional()
  @IsString()
  method?: string;
}
