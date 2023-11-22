import { Column, Entity } from 'typeorm';
import User from './user.base';

@Entity()
export class JobSeekers extends User {
  @Column()
  fName: string;

  @Column()
  lName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  resumeUrl: string;

  @Column({ type: 'bytea', nullable: true })
  resumeData: Buffer;

  @Column('text', { array: true, nullable: true })
  skills: string[];

  @Column('text', { array: true, nullable: true })
  experience: string[];

  @Column('text', { array: true, nullable: true })
  education: string[];

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'job_seeker' })
  role: string;
}
