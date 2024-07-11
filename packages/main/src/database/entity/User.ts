// src/entity/User.ts
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', unique: true})
  user_id: string;

  @Column({type: 'text'})
  email: string;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text', default: ''})
  picture: string;

  @Column({type: 'text', default: null, nullable: true})
  access_token: string | null;

  @Column({type: 'text', default: null, nullable: true})
  refresh_token: string | null;

  @Column({type: 'boolean', default: true})
  is_active: boolean;
}
