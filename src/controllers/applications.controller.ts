import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('applications')
@ApiTags('Applications')
export class ApplicationsController {}
