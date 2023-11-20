import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('domestic')
@ApiTags('Domestic')
export class DomesticController {}
