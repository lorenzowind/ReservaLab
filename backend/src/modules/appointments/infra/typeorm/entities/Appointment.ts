import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Laboratory from '@modules/laboratories/infra/typeorm/entities/Laboratory';

@Entity('appointments')
class Appointment {
  @PrimaryColumn()
  id: string;

  @Column()
  teacher_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @Column()
  laboratory_id: string;

  @ManyToOne(() => Laboratory)
  @JoinColumn({ name: 'laboratory_id' })
  laboratory: Laboratory;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column()
  day: number;

  @Column()
  time: string;

  @Column()
  subject: string;

  @Column()
  classroom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
