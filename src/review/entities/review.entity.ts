import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string = 'text';

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
