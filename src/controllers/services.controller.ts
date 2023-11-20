import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('services')
@ApiTags('Services')
export class ServicesController {}
