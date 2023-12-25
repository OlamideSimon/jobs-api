import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import User from './user.base';
import Model from './base.entity';
import {
  JobAvailabilityStatus,
  Levels,
  NotificationPreferences,
} from 'src/utils/enums';

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

  @Column('text', { array: true, nullable: true })
  skills: string[];

  @OneToMany(() => Experience, (experience) => experience.jobSeeker, {
    eager: true,
  })
  experiences: Experience[];

  @OneToMany(() => Education, (education) => education.jobSeeker, {
    eager: true,
  })
  education: Education[];

  @Column({ nullable: true })
  location: string;

  @Column({
    type: 'enum',
    enum: JobAvailabilityStatus,
    default: JobAvailabilityStatus.ActivelySeeking,
  })
  availability: JobAvailabilityStatus;

  @Column({ type: 'enum', enum: NotificationPreferences })
  notificationPreferences: NotificationPreferences[];

  @Column({ default: 'job_seeker' })
  role: string;
}

@Entity()
export class Experience extends Model {
  @Column()
  employer: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: Levels,
    default: Levels['no experience'],
  })
  level: Levels;

  @Column()
  country: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column()
  responsibilities: string;

  @Column({ type: 'boolean', nullable: true })
  isCurrentRole?: boolean;

  @ManyToOne(() => JobSeekers, (jobSeeker) => jobSeeker.experiences, {
    onDelete: 'CASCADE',
  })
  jobSeeker: JobSeekers;

  calculateDurationInMonths(startDate, endDate, isCurrentRole): number {
    if (!endDate || isCurrentRole) {
      return 0; // Employment is ongoing or end date is not provided
    }

    startDate = new Date(this.startDate);
    endDate = new Date(this.endDate);
    const diffInMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    return diffInMonths;
  }

  toString(): string {
    const endDateString = this.endDate
      ? ` - ${this.endDate.toDateString()}`
      : '';
    const currentRoleString = this.isCurrentRole ? ' (Current Role)' : '';
    return `${this.title} at ${this.employer}, ${
      this.country
    }, ${this.startDate.toDateString()}${endDateString}${currentRoleString}`;
  }
}

@Entity()
export class Education extends Model {
  @ManyToOne(() => JobSeekers, (jobSeeker) => jobSeeker.experiences, {
    onDelete: 'CASCADE',
  })
  jobSeeker: JobSeekers;

  @Column()
  institution: string;

  @Column()
  degree: string;

  @Column()
  fieldOfStudy: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'boolean', nullable: true })
  isStudying?: boolean;
}
