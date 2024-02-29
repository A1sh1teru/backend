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

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  bedroom: string;

  @Column()
  bathroom: string;

  @Column()
  location: string;

  @Column()
  area: string;

  @Column()
  price: string;

  @Column()
  year: string;

  // @Column('int', { array: true })
  // sizes: number[200];

  // @IsString({ each: true })
  @Column('simple-array')
  features: string[];

  @ManyToOne(() => CategoryEntity, (category) => category.cards, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;
}
