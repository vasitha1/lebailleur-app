import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';
import { Property } from '../../properties/entities/property.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENANT,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'whatsapp_number', nullable: true, unique: true })
  whatsappNumber?: string;

// Property information fields (temporary until  a separate Property entity is created)
@Column({ name: 'property_name', nullable: true })
propertyName?: string;

@Column({ name: 'property_location', nullable: true })
propertyLocation?: string;

@Column({ name: 'property_type', nullable: true })
propertyType?: string;

  // Relationships
  @OneToMany(() => Property, (property) => property.owner)
  ownedProperties: Property[];

  @OneToMany(() => Property, (property) => property.manager)
  managedProperties: Property[];

  @OneToMany(() => Tenant, (tenant) => tenant.user)
  tenantProfiles: Tenant[];

  @OneToMany(() => Payment, (payment) => payment.tenant)
  payments: Payment[];

  // Manager relationship - managers can be assigned to owners
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => User, (user) => user.owner)
  managers: User[];
}
