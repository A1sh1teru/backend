import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column('text', { array: true, nullable: true })
  // images: string[];

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  position: string;

  @Column()
  vk: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
