import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  images: string;
}
