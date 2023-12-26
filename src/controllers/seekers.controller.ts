import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles.decorator';
import {
  EducationDTO,
  ExperienceDTO,
  UpdateSeekerDTO,
} from 'src/dto/update/seeker.updateDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { SeekerService } from 'src/services/seekers.service';

@Controller('seeker')
@ApiTags('Job Seekers')
export class SeekersController {
  constructor(private readonly seekerService: SeekerService) {}

  @Post('education')
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  addSeekerEducationHandler(@Body() data: EducationDTO, @Request() req: any) {
    const response = this.seekerService.addSeekerEducation(req?.user, data);
    return {
      status: 'success',
      message: 'Education added successfully',
      data: response,
    };
  }

  @Delete('education/:id')
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  async deleteEducationHandler(@Param('id') id: string, @Request() req: any) {
    await this.seekerService.deleteSeekerEducation(req?.user, id);
    return {
      status: 'success',
      message: 'Education deleted successfully',
    };
  }

  @Post('experience')
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  addSeekerExperienceHandler(@Body() data: ExperienceDTO, @Request() req: any) {
    const response = this.seekerService.addSeekerExperience(req?.user, data);
    return {
      status: 'success',
      message: 'Experience added successfully',
      data: response,
    };
  }

  @Delete('experience/:id')
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  async deleteExperienceHandler(@Param('id') id: string, @Request() req: any) {
    await this.seekerService.deleteSeekerExperience(req?.user, id);
    return {
      status: 'success',
      message: 'Experience deleted successfully',
    };
  }

  @Patch()
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  updateSeekerHandler(@Body() data: UpdateSeekerDTO, @Request() req: any) {
    const response = this.seekerService.updateSeeker(req?.user?.id, data);
    return {
      status: 'success',
      message: 'Seeker updated successfully',
      data: response,
    };
  }

  @Get(':id')
  async getSeekerHandler(@Param('id') id: string) {
    const response = await this.seekerService.getSeeker(id);
    return {
      status: 'success',
      message: 'Seeker found successfully',
      data: response,
    };
  }

  @Delete(':id')
  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard)
  deleteSeekerHandler(@Param('id') id: string) {
    return this.seekerService.deleteSeeker(id);
  }

  @Delete()
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  deleteSelfHandler(@Request() req: any) {
    return this.seekerService.deleteSeeker(req?.user);
  }
}
