import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateSeekerDTO } from 'src/dto/update/seeker.dto';
import { SeekerService } from 'src/services/seekers.service';

@Controller('seeker')
@ApiTags('Job Seekers')
export class SeekersController {
  constructor(private readonly seekerService: SeekerService) {}

  @Patch()
  updateSeekerHandler(@Body() data: UpdateSeekerDTO) {
    return this.seekerService.upDateSeeker(data);
  }

  @Get(':id')
  getSeekerHandler(@Param('id') id: string) {
    return this.seekerService.getSeeker(id);
  }
}
