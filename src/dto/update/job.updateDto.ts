import { PartialType } from '@nestjs/swagger';
import { JobDTO } from '../create/job.createDto';

export class UpdateJobsDTO extends PartialType(JobDTO) {}
