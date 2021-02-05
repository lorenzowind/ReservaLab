import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('subjects')
class Laboratory {
  @ObjectIdColumn()
  id: string;

  @Column()
  laboratories_names: string;

  @Column()
  laboratories_numbers: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Laboratory;
