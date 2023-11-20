import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('artisans')
@ApiTags('Artisans')
export class ArtisansController {}
