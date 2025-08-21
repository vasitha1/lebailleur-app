import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new user or additional role profile',
    description: 'Owners can create managers, tenants, or additional manager profile for themselves. Managers can only create tenants.'
  })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 409, description: 'Conflict. Email already exists or manager profile already exists.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Request() req: any  // or however you get the current user
  ) {
    const currentUser = req.user; // This should have { sub, email, role }
    return this.usersService.create(createUserDto, currentUser);
  }

  @Get()
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Get all users (Owner only)' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profiles/:email')
  @ApiOperation({ summary: 'Get all profiles for a user email (owner and manager profiles)' })
  @ApiResponse({ status: 200, description: 'User profiles retrieved successfully.' })
  findUserProfiles(@Param('email') email: string) {
    return this.usersService.findUserProfiles(email);
  }

  @Get('context/:userId')
  @ApiOperation({ summary: 'Get user context with available roles' })
  @ApiQuery({ name: 'role', enum: UserRole, required: false, description: 'Specific role to switch to' })
  @ApiResponse({ status: 200, description: 'User context retrieved successfully.' })
  getUserContext(
    @Param('userId') userId: string,
    @Query('role') requestedRole?: UserRole
  ) {
    return this.usersService.getUserContext(userId, requestedRole);
  }

  @Get('managers')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Get all managers for owner' })
  findManagers(@Request() req) {
    return this.usersService.findManagers(req.user.sub);
  }

  @Get('my-users')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Get all users under current owner (managers and tenants)' })
  findMyUsers(@Request() req) {
    return this.usersService.findUsersByOwner(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.OWNER)
  @ApiOperation({
    summary: 'Delete user (Owner only)',
    description: 'If deleting a dual-role user, only the specific profile is removed unless it\'s the owner profile.'
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('assign-manager/:managerId')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Assign manager to owner' })
  assignManager(@Request() req, @Param('managerId') managerId: string) {
    return this.usersService.assignManager(req.user.sub, managerId);
  }
}