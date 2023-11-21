import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { JobSeekers } from './seekers.entity';
import { Jobs } from './jobs.entity';
import { Status } from 'src/utils/enums';

@Entity()
export class Applications extends Model {
  @ManyToOne(() => JobSeekers)
  jobSeeker: JobSeekers;

  @ManyToOne(() => Jobs, { nullable: true })
  job: Jobs;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
}
