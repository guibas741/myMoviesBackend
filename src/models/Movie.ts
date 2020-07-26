/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('movies')
class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column()
  duration: string;

  @Column()
  actors: string;

  @Column()
  director: string;

  @Column()
  poster_url: string;

  @Column()
  is_favorite: boolean;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Movie;
