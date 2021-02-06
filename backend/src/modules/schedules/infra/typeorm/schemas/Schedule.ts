import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('schedules')
class Schedule {
  @ObjectIdColumn()
  id: string;

  @Column()
  schedule_name: string;

  @Column()
  schedule_begin: string;

  @Column()
  schedule_end: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;
