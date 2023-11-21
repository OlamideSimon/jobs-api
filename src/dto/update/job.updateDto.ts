import { PartialType } from '@nestjs/swagger';
import { CreateJobDTO } from '../create/job.createDto';

export class UpdateJobsDTO extends PartialType(CreateJobDTO) {}
