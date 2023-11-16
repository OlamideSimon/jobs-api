import { Column } from 'typeorm';
import User from './user.base';

export class Artisans extends User {
  @Column()
  fName: string;

  @Column()
  lName: string;

  @Column()
  contactInfo: string;

  @Column()
  address: string;

  @Column('text', { array: true, nullable: true })
  skills: string[];

  @Column('text', { array: true, nullable: true })
  experience: string[];

  @Column('text', { array: true, nullable: true })
  portfolio: string[];

  @Column()
  location: string;

  @Column({ default: 'artisan' })
  role: string;
}
