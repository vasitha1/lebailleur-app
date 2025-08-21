import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  unitNumber: string;

  @Column('decimal', { precision: 10, scale: 2 })
  rentAmount: number;

  @Column({ default: false })
  isOccupied: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Property, (property) => property.units)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column('uuid')
  propertyId: string;

  @OneToOne(() => Tenant, (tenant) => tenant.unit, { nullable: true })
  tenant: Tenant;
}
