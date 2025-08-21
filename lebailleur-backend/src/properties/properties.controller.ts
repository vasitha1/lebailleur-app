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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreateUnitDto } from './dto/create-unit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Properties')
@Controller('properties')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Create a new property (Owner only)' })
  create(@Body() createPropertyDto: CreatePropertyDto, @Request() req) {
    return this.propertiesService.create(createPropertyDto, req.user.id);
  }

  @Get()
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get all properties' })
  findAll(@Request() req) {
    return this.propertiesService.findAll(req.user.id, req.user.role);
  }

  @Get('stats')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get property statistics' })
  getStats(@Request() req) {
    return this.propertiesService.getPropertyStats(req.user.id, req.user.role);
  }

  @Get(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get property by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.propertiesService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Update property' })
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto, @Request() req) {
    return this.propertiesService.update(id, updatePropertyDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Delete property (Owner only)' })
  remove(@Param('id') id: string, @Request() req) {
    return this.propertiesService.remove(id, req.user.id, req.user.role);
  }

  @Post(':id/units')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Create a new unit in property' })
  createUnit(@Param('id') propertyId: string, @Body() createUnitDto: CreateUnitDto, @Request() req) {
    return this.propertiesService.createUnit(propertyId, createUnitDto, req.user.id, req.user.role);
  }

  @Get(':id/units')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get all units in property' })
  getUnits(@Param('id') propertyId: string, @Request() req) {
    return this.propertiesService.getUnits(propertyId, req.user.id, req.user.role);
  }

  @Get(':id/units/vacant')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get vacant units in property' })
  getVacantUnits(@Param('id') propertyId: string, @Request() req) {
    return this.propertiesService.getVacantUnits(propertyId, req.user.id, req.user.role);
  }
}
