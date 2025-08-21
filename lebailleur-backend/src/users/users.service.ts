import { ForbiddenException, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto, currentUser?: any) {
    if (!currentUser) {
      // Handle public registration - this creates owners only
      if (createUserDto.role !== UserRole.OWNER) {
        throw new ForbiddenException('Public registration only allows creating owner accounts');
      }
      const user = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(user);
    }

    const { role: currentUserRole, sub: currentUserId } = currentUser;

    // Special handling for dual role accounts (owner becoming manager)
    if (createUserDto.role === UserRole.MANAGER && currentUserRole === UserRole.OWNER) {
      return this.createManagerProfile(createUserDto, currentUserId);
    }

    // Check if email already exists for different role combinations
    await this.validateEmailForRole(createUserDto.email, createUserDto.role, currentUserId);

    // Apply role-based creation rules
    if (currentUserRole === UserRole.OWNER) {
      return this.handleOwnerCreation(createUserDto, currentUserId);
    } else if (currentUserRole === UserRole.MANAGER) {
      return this.handleManagerCreation(createUserDto, currentUserId);
    } else if (currentUserRole === UserRole.TENANT) {
      // Tenants cannot create any users
      throw new ForbiddenException('Tenants cannot create other users');
    } else {
      throw new ForbiddenException('Invalid user role for creating users');
    }
  }

  private async handleOwnerCreation(createUserDto: CreateUserDto, currentUserId: string) {
    // Owners can create managers and tenants, but not other owners
    if (createUserDto.role === UserRole.OWNER) {
      throw new ForbiddenException('Owners cannot create other owner accounts');
    }

    if (![UserRole.MANAGER, UserRole.TENANT].includes(createUserDto.role)) {
      throw new ForbiddenException('Owners can only create managers and tenants');
    }

    // First, get the current owner to ensure they exist
    const currentOwner = await this.usersRepository.findOne({
      where: { id: currentUserId, role: UserRole.OWNER }
    });

    if (!currentOwner) {
      throw new NotFoundException('Current owner not found');
    }

    const user = this.usersRepository.create(createUserDto);

    // Set owner relationship - both managers and tenants are owned by the creating owner
    user.owner = currentOwner; // Use the full owner entity instead of just { id: currentUserId }

    const createdUser = await this.usersRepository.save(user);

    return this.usersRepository.findOne({
      where: { id: createdUser.id },
      relations: ['owner'],
    });
  }

  private async handleManagerCreation(createUserDto: CreateUserDto, currentUserId: string) {
    // Managers can only create tenants
    if (createUserDto.role !== UserRole.TENANT) {
      throw new ForbiddenException('Managers can only create tenants');
    }

    // Get the manager with owner relation
    const manager = await this.usersRepository.findOne({
      where: { id: currentUserId },
      relations: ['owner']
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (!manager.owner) {
      throw new ForbiddenException('Manager must be assigned to an owner before creating tenants');
    }

    const user = this.usersRepository.create(createUserDto);

    // Tenant's owner is the manager's owner (not the manager themselves)
    user.owner = manager.owner;

    const createdUser = await this.usersRepository.save(user);

    return this.usersRepository.findOne({
      where: { id: createdUser.id },
      relations: ['owner'],
    });
  }

  // Create a manager profile for an existing owner with the same email
  private async createManagerProfile(createUserDto: CreateUserDto, currentUserId: string) {
    // Get the current owner
    const owner = await this.usersRepository.findOne({
      where: { id: currentUserId, role: UserRole.OWNER }
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    // Check if manager profile already exists for this email
    const existingManager = await this.usersRepository.findOne({
      where: { email: createUserDto.email, role: UserRole.MANAGER }
    });

    if (existingManager) {
      throw new ConflictException('Manager profile already exists for this email');
    }

    // Create manager profile with same email but different role
    const managerUser = this.usersRepository.create({
      ...createUserDto,
      role: UserRole.MANAGER
    });

    // Manager is owned by the current owner (themselves in owner role)
    managerUser.owner = owner; // Use the full owner entity

    const createdManager = await this.usersRepository.save(managerUser);

    return this.usersRepository.findOne({
      where: { id: createdManager.id },
      relations: ['owner'],
    });
  }

  // Validate email based on role and current user
  private async validateEmailForRole(email: string, role: UserRole, currentUserId?: string) {
    const existingUsers = await this.usersRepository.find({ where: { email } });

    if (existingUsers.length === 0) {
      return; // Email is free to use
    }

    // If creating a manager with same email as current owner, that's allowed
    if (role === UserRole.MANAGER && currentUserId) {
      const ownerWithSameEmail = existingUsers.find(u => u.id === currentUserId && u.role === UserRole.OWNER);
      if (ownerWithSameEmail && existingUsers.length === 1) {
        return; // Same person creating manager profile
      }
    }

    // For any other case, email must be unique
    throw new ConflictException('Email already exists');
  }

  // Get all profiles for a user (owner and manager profiles with same email)
  async findUserProfiles(email: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { email },
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'isActive', 'createdAt'],
      order: { role: 'ASC' } // Owner first, then manager
    });
  }

  async findUserProfilesForAuth(email: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { email },
      order: { role: 'ASC' }
    });
  }

  // Switch context - useful for frontend to know which role user is acting in
  async getUserContext(userId: string, requestedRole?: UserRole): Promise<{ user: User, availableRoles: UserRole[] }> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['owner']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find all profiles with same email
    const allProfiles = await this.findUserProfiles(user.email);
    const availableRoles = allProfiles.map(profile => profile.role);

    // If specific role requested, validate and return that profile
    if (requestedRole) {
      const requestedProfile = allProfiles.find(profile => profile.role === requestedRole);
      if (!requestedProfile) {
        throw new ForbiddenException('Requested role not available for this user');
      }
      return { user: requestedProfile, availableRoles };
    }

    return { user, availableRoles };
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'isActive', 'createdAt'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'isActive', 'createdAt'],
      relations: ['owner']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByEmailAndRole(email: string, role: UserRole): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email, role } });
  }

  async findManagers(ownerId: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: UserRole.MANAGER, owner: { id: ownerId } },
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'isActive', 'lastLoginAt', 'createdAt'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.usersRepository.update(id, { password: hashedPassword });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { lastLoginAt: new Date() });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    // If removing a manager profile, check if it's a dual-role user
    if (user.role === UserRole.MANAGER) {
      const ownerProfile = await this.usersRepository.findOne({
        where: { email: user.email, role: UserRole.OWNER }
      });

      // If owner profile exists, only remove manager profile
      if (ownerProfile) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException('User not found');
        }
        return;
      }
    }

    // If removing owner with manager profile, remove both
    if (user.role === UserRole.OWNER) {
      await this.usersRepository.delete({ email: user.email, role: UserRole.MANAGER });
    }

    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async assignManager(ownerId: string, managerId: string): Promise<User> {
    const manager = await this.findOne(managerId);

    if (manager.role !== UserRole.MANAGER) {
      throw new ForbiddenException('User is not a manager');
    }

    // Get the owner entity to assign
    const owner = await this.usersRepository.findOne({
      where: { id: ownerId, role: UserRole.OWNER }
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    await this.usersRepository.update(managerId, { owner: owner });
    return this.findOne(managerId);
  }

  // Method to find all users under an owner (managers and tenants)
  async findUsersByOwner(ownerId: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { owner: { id: ownerId } },
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'isActive', 'createdAt'],
      order: { createdAt: 'DESC' }
    });
  }

  async findByWhatsapp(identifier: string): Promise<User | null> {
    // First try to find by whatsappNumber, then by email as fallback
    let user = await this.usersRepository.findOne({ where: { whatsappNumber: identifier } });

    if (!user) {
      // Fallback to email if WhatsApp number not found
      user = await this.usersRepository.findOne({ where: { email: identifier } });
    }

    return user;
  }

  // Get all profiles for authentication by WhatsApp number
  async findUserProfilesForAuthByWhatsapp(whatsappNumber: string): Promise<User[]> {
    // First try to find by whatsappNumber
    let profiles = await this.usersRepository.find({
      where: { whatsappNumber },
      order: { role: 'ASC' }
    });

    // If no profiles found by WhatsApp number, try by email as fallback
    if (profiles.length === 0) {
      profiles = await this.usersRepository.find({
        where: { email: whatsappNumber }, // In case they entered email instead
        order: { role: 'ASC' }
      });
    }

    return profiles;
  }

  // Find user by WhatsApp number and role
  async findByWhatsappAndRole(whatsappNumber: string, role: UserRole): Promise<User | null> {
    let user = await this.usersRepository.findOne({ where: { whatsappNumber, role } });

    if (!user) {
      // Fallback to email
      user = await this.usersRepository.findOne({ where: { email: whatsappNumber, role } });
    }

    return user;
  }

  // Check if this is user's first login (you can implement based on your logic)
  async checkIsFirstLogin(userId: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'lastLoginAt', 'createdAt']
    });

    if (!user) {
      return false;
    }

    // Consider it first login if lastLoginAt is null or very close to createdAt (within 5 minutes)
    if (!user.lastLoginAt) {
      return true;
    }

    const timeDifference = user.lastLoginAt.getTime() - user.createdAt.getTime();
    const fiveMinutesInMs = 5 * 60 * 1000;

    return timeDifference <= fiveMinutesInMs;
  }
}