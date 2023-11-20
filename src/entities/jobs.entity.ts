import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { Employers } from './employers.entity';

export enum JobsType {
  FULL_TIME = 'full',
  PART_TIME = 'part',
  CONTRACT = 'contract',
}

export enum ExperienceLevel {
  ENTRY = 'entry',
  INTERMEDIATE = 'intermediate',
  SENIOR = 'senior',
}

@Entity()
export class Jobs extends Model {
  @ManyToOne(() => Employers, { eager: true })
  employer: Employers;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column('text', { array: true })
  qualifications: string[];

  @Column()
  location: string;

  @Column({ type: 'enum', enum: JobsType, default: JobsType.FULL_TIME })
  type: JobsType;

  @Column()
  industry: string;

  @Column({
    type: 'enum',
    enum: ExperienceLevel,
    default: ExperienceLevel.ENTRY,
  })
  experienceLevel: ExperienceLevel;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  salary: number;

  @Column('date')
  deadline: Date;
}
