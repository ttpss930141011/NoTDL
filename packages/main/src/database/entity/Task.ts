import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'text'})
  title: string;

  @Column({type: 'int', default: 0})
  priority: number;

  @Column({type: 'int', default: 0})
  mental_load: number; // 0-10

  @Column({type: 'boolean', default: false})
  completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
