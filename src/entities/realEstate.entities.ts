import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import Address from './addresses.entities';

import Schedule from './schedules.entities';

import Category from './categories.entities';

@Entity('real-estate')
class RealEstate {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', default: false })
  sold: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column()
  size: number;

  @CreateDateColumn({ type: 'date' })
  createdAt: string | Date;

  @UpdateDateColumn({ type: 'date' })
  updateAt: string | Date;

  @OneToOne(() => Address, (address) => address.realEstate)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category)
  category: Category;

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  @ManyToOne(() => Schedule, (schedule) => schedule.realEstate)
  schedules: Schedule[];
}

export default RealEstate;
