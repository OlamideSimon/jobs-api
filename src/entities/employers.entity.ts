import { Column, Entity } from 'typeorm';
import User from './user.base';

@Entity()
export class Employers extends User {
  @Column()
  companyName: string;

  @Column({ nullable: true })
  companyDescription: string;

  @Column({ nullable: true })
  companyInfo: string;

  @Column({ nullable: true })
  companyUrl: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'employer' })
  role: string;
}
