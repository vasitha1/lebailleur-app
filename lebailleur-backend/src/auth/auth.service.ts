import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from '../users/entities/user.entity';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto) {
    // Check by WhatsApp number or email
    const identifier = registerDto.whatsappNumber || registerDto.email;
    const existingUser = await this.usersService.findByWhatsapp(identifier);

    if (existingUser) {
      const conflictField = registerDto.whatsappNumber ? 'WhatsApp number' : 'email';
      throw new ConflictException(`User with this ${conflictField} already exists`);
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    // Prepare user data with split name
    const userData = {
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      whatsappNumber: registerDto.whatsappNumber,
      password: hashedPassword,
      role: registerDto.role || UserRole.OWNER,
      // Store property information (you might want to create a separate Property entity)
      propertyName: registerDto.propertyName,
      propertyLocation: registerDto.propertyLocation,
      propertyType: registerDto.propertyType,
    };

    const user = await this.usersService.create(userData);

    if (!user) {
      throw new InternalServerErrorException('Failed to create user');
    }

    const payload = {
      whatsappNumber: user.whatsappNumber || user.email,
      sub: user.id,
      role: user.role,
      isFirstLogin: true // Mark as first login after registration
    };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        whatsappNumber: user.whatsappNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`.trim(),
        role: user.role,
        isFirstLogin: true,
        propertyInfo: {
          name: registerDto.propertyName,
          location: registerDto.propertyLocation,
          type: registerDto.propertyType,
        }
      },
    };
  }

  async validateUser(whatsappNumber: string, password: string, preferredRole?: UserRole): Promise<any> {
    console.log('Validating user with WhatsApp:', whatsappNumber); // Debug log

    // Find all user profiles with this WhatsApp number (including password for auth)
    const userProfiles = await this.usersService.findUserProfilesForAuthByWhatsapp(whatsappNumber);
    console.log('Found user profiles:', userProfiles?.length || 0); // Debug log

    if (!userProfiles || userProfiles.length === 0) {
      console.log('No user profiles found for WhatsApp:', whatsappNumber); // Debug log
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get the first profile to validate password
    const firstProfile = userProfiles[0];
    console.log('First profile:', firstProfile?.id, firstProfile?.whatsappNumber, 'Has password:', !!firstProfile?.password); // Debug log

    // Check if password exists
    if (!firstProfile.password) {
      console.log('No password found for user profile'); // Debug log
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password against any profile (they should have the same password)
    const isPasswordValid = await bcrypt.compare(password, firstProfile.password);
    console.log('Password valid:', isPasswordValid); // Debug log

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Determine which profile to use for login
    let selectedProfile = firstProfile;

    if (preferredRole) {
      const preferredProfile = userProfiles.find(profile => profile.role === preferredRole);
      if (preferredProfile) {
        selectedProfile = preferredProfile;
      }
    } else {
      // Default to owner profile if available, otherwise first profile
      const ownerProfile = userProfiles.find(profile => profile.role === UserRole.OWNER);
      if (ownerProfile) {
        selectedProfile = ownerProfile;
      }
    }

    console.log('Selected profile:', selectedProfile?.id, selectedProfile?.role); // Debug log

    const { password: _, ...result } = selectedProfile;
    return {
      ...result,
      availableRoles: userProfiles.map(profile => profile.role)
    };
  }

  async login(user: any) {
    console.log('Login method - user object:', user); // Debug log

    if (!user || !user.id || !user.role) {
      console.log('Invalid user object in login method'); // Debug log
      throw new UnauthorizedException('Invalid user data');
    }

    // Check if this is first login after registration
    const isFirstLogin = await this.usersService.checkIsFirstLogin(user.id);

    // Check for invitation tokens (you might want to store this in database)
    const invitationToken = null; // This should come from your invitation system

    const payload = {
      whatsappNumber: user.whatsappNumber || user.email,
      sub: user.id,
      role: user.role,
      availableRoles: user.availableRoles,
      isFirstLogin,
      invitationToken
    };

    console.log('JWT payload:', payload); // Debug log

    // Update last login
    if (user.id) {
      await this.usersService.updateLastLogin(user.id);
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        whatsappNumber: user.whatsappNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        availableRoles: user.availableRoles,
        isFirstLogin,
        invitationToken
      }
    };
  }

  async switchRole(userId: string, newRole: UserRole) {
    const context = await this.usersService.getUserContext(userId, newRole);

    const payload = {
      whatsappNumber: context.user.whatsappNumber || context.user.email,
      sub: context.user.id,
      role: context.user.role,
      availableRoles: context.availableRoles
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: context.user.id,
        email: context.user.email,
        whatsappNumber: context.user.whatsappNumber,
        firstName: context.user.firstName,
        lastName: context.user.lastName,
        role: context.user.role,
        availableRoles: context.availableRoles
      }
    };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 12);
    await this.usersService.updatePassword(userId, hashedNewPassword);

    return { message: 'Password changed successfully' };
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.usersService.updatePassword(user.id, hashedPassword);

    return { message: 'Password reset successfully' };
  }
}