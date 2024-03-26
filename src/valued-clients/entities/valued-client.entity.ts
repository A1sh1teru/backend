import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('valuedClient')
export class ValuedClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  year: number;

  @Column()
  domain: string;

  @Column()
  category: string;

  @Column()
  comment: string;

  @Column()
  website: string;
}
