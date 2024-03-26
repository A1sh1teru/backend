import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('officeLocation')
export class OfficeLocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  category: string;

  @Column()
  descriprion: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  location: string;
}
