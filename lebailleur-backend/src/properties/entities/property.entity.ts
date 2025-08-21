import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PropertyStatus } from '../../common/enums/property-status.enum';
import { User } from '../../users/entities/user.entity';
import { Unit } from './unit.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  address: string;

  @Column({ nullable: true })
  description: string;

  @Column('int')
  totalUnits: number;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.ACTIVE,
  })
  status: PropertyStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.ownedProperties)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column('uuid')
  ownerId: string;

  @ManyToOne(() => User, (user) => user.managedProperties, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: User;

  @Column('uuid', { nullable: true })
  managerId: string;

  @OneToMany(() => Unit, (unit) => unit.property)
  units: Unit[];
}
