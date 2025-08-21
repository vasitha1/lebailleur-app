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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Tenants')
@Controller('tenants')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Create a new tenant' })
  create(@Body() createTenantDto: CreateTenantDto, @Request() req) {
    return this.tenantsService.create(createTenantDto, req.user.id, req.user.role);
  }

  @Get()
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Get all tenants' })
  findAll(@Request() req) {
    return this.tenantsService.findAll(req.user.id, req.user.role);
  }

  @Get('stats')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get tenant statistics' })
  getStats(@Request() req) {
    return this.tenantsService.getTenantStats(req.user.id, req.user.role);
  }

  @Get('by-status')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get tenants by status' })
  @ApiQuery({ name: 'status', required: true })
  getTenantsByStatus(@Query('status') status: string, @Request() req) {
    return this.tenantsService.getTenantsByStatus(status, req.user.id, req.user.role);
  }

  @Get(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Get tenant by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.tenantsService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.TENANT)
  @ApiOperation({ summary: 'Update tenant' })
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto, @Request() req) {
    return this.tenantsService.update(id, updateTenantDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Delete tenant' })
  remove(@Param('id') id: string, @Request() req) {
    return this.tenantsService.remove(id, req.user.id, req.user.role);
  }
}
