import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './users.entities';
import RealEstate from './realEstate.entities';

@Entity('schedules')
class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('date')
  date: string | Date;

  @Column({ type: 'time' })
  hour: string;

  @ManyToOne(() => RealEstate)
  realEstate: RealEstate;

  @ManyToOne(() => User)
  user: User;
}

export default Schedule;
