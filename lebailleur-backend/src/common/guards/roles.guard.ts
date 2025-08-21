import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    // Debug logging (remove in production)
    console.log('RolesGuard - Required roles:', requiredRoles);
    console.log('RolesGuard - User object:', user);
    console.log('RolesGuard - User role:', user?.role);
    
    // Check if user exists and has a role
    if (!user || !user.role) {
      console.log('RolesGuard - No user or role found');
      return false;
    }
    
    // Check if user's role is in the required roles array
    const hasPermission = requiredRoles.includes(user.role);
    console.log('RolesGuard - Has permission:', hasPermission);
    
    return hasPermission;
  }
}