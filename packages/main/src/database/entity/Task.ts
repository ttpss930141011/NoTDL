import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text'})
  title: string;

  @Column({type: 'text'})
  icon: string;

  @Column({type: 'text'})
  color: string;

  @Column({type: 'int', default: 0})
  priority: number;

  @Column({type: 'int', default: 0})
  mental_load: number; // 0-10

  @Column({type: 'boolean', default: false})
  is_unplanned: boolean;

  @Column({type: 'boolean', default: false})
  is_completed: boolean;

  @Column({type: 'boolean', default: false})
  is_rest: boolean;

  @CreateDateColumn({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  task_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
