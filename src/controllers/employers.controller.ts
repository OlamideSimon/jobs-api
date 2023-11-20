import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('employers')
@ApiTags('Employers')
export class EmployersController {}
