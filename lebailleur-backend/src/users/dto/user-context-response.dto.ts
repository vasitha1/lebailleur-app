import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';
import { User } from '../entities/user.entity';

export class UserContextResponseDto {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ enum: UserRole, isArray: true })
  availableRoles: UserRole[];
}