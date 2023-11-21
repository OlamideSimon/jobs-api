import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { Employers } from './employers.entity';
import { ExperienceLevel, IndustriesType, JobsType } from 'src/utils/enums';

@Entity()
export class Jobs extends Model {
  @ManyToOne(() => Employers, { eager: true })
  employer: Employers;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column('text')
  responsibilities: string;

  @Column('text')
  who_you_are: string;

  @Column('text')
  nice_to_haves: string;

  @Column('text', { array: true })
  categories: string[];

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: JobsType,
    default: [JobsType.FULL_TIME],
    array: true,
  })
  type: JobsType[];

  @Column({
    type: 'enum',
    enum: IndustriesType,
    default: [IndustriesType.Miscellaneous],
  })
  industry: IndustriesType[];

  @Column('text', { array: true })
  skills: string[];

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
