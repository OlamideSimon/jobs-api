import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('jobs')
@ApiTags('Jobs')
export class JobsController {}
