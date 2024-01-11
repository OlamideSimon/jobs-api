import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import Model from './base.entity';
import {
  JobAvailabilityStatus,
  Levels,
  NotificationPreferences,
} from 'src/utils/enums';
import { UserAuth } from './authentication.entity';

@Entity()
export class Seekers extends Model {
  @OneToOne(() => UserAuth, (userAuth) => userAuth.seekerDetails, {
    lazy: true,
  })
  userAuth: UserAuth;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  currentRole: string;

  @Column({ nullable: true })
  about: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  resumeUrl: string;

  @Column({ type: 'bytea', nullable: true })
  resumeData: Buffer;

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

  @Column({
    type: 'enum',
    enum: NotificationPreferences,
    default: [NotificationPreferences.APPLICATIONS],
  })
  notificationPreferences: NotificationPreferences[];
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

  @ManyToOne(() => Seekers, (jobSeeker) => jobSeeker.experiences, {
    onDelete: 'CASCADE',
  })
  jobSeeker: Seekers;
}

@Entity()
export class Education extends Model {
  @ManyToOne(() => Seekers, (jobSeeker) => jobSeeker.experiences, {
    onDelete: 'CASCADE',
  })
  jobSeeker: Seekers;

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
