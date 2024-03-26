import { CategoryEntity } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'int' })
  bedroom: number;

  @Column({ type: 'int' })
  bathroom: number;

  @Column()
  location: string;

  @Column({ type: 'int' })
  area: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  year: number;

  @Column('text', { array: true, nullable: true })
  features: string[];

  @ManyToOne(() => CategoryEntity, (category) => category.cards, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;
}
