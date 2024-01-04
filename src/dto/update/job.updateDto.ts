import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from '../create/job.createDto';

export class UpdateJobsDTO extends PartialType(CreateJobDto) {}
