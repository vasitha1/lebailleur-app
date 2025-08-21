import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TenantStatus } from '../../common/enums/tenant-status.enum';
import { User } from '../../users/entities/user.entity';
import { Unit } from '../../properties/entities/unit.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  leaseStartDate: Date;

  @Column()
  leaseEndDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  rentAmount: number;

  @Column('int', { default: 15 })
  paymentDueDay: number;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.ACTIVE,
  })
  status: TenantStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.tenantProfiles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('uuid')
  userId: string;

  @OneToOne(() => Unit, (unit) => unit.tenant)
  @JoinColumn({ name: 'unitId' })
  unit: Unit;

  @Column('uuid')
  unitId: string;

  @OneToMany(() => Payment, (payment) => payment.tenant)
  payments: Payment[];
}
