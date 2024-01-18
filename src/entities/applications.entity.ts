import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { Seekers } from './seekers.entity';
import { Jobs } from './jobs.entity';
import { Currency, Status } from 'src/utils/enums';

@Entity()
export class Applications extends Model {
  @ManyToOne(() => Seekers)
  jobSeeker: Seekers;

  @ManyToOne(() => Jobs, { nullable: true })
  job: Jobs;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @Column({ type: 'bytea', nullable: true })
  resumeData: Buffer;

  @Column({ type: 'boolean', default: false })
  applyWithCV: boolean;

  @Column({ default: 0 })
  yearsOfExperience: number;

  @Column({ type: 'enum', enum: Currency, default: Currency.NAIRA })
  currency: Currency;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  exp_salary: number;
}
