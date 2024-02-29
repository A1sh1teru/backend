import { ApiHideProperty } from '@nestjs/swagger';
import { CardEntity } from 'src/card/entities/card.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  propertyType: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiHideProperty()
  @OneToMany(() => CardEntity, (card) => card.category)
  cards: CardEntity[];
}
