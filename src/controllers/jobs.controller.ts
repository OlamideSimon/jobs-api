import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/roles.decorator';
import { JobDTO } from 'src/dto/create/job.createDto';
import { UpdateJobsDTO } from 'src/dto/update/job.updateDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { JobService } from 'src/services/jobs.service';

@Controller('jobs')
@ApiTags('Jobs')
@ApiBearerAuth() // Enable Bearer authentication for Swagger
export class JobsController {
  constructor(private jobService: JobService) {}

  @Post()
  @Role('company')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  createJobHandler(@Body() body: JobDTO, req: any) {
    return this.jobService.createJob(body, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of jobs' })
  @ApiResponse({
    status: 200,
    description: 'List of jobs retrieved successfully',
  })
  getJobsHandler() {
    return this.jobService.getJobs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job by ID' })
  @ApiResponse({ status: 200, description: 'Job retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  getJobHandler(@Param('id') id: string) {
    return this.jobService.getJob(id);
  }

  @Patch(':id')
  @Role('company')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update a job by ID' })
  @ApiResponse({ status: 200, description: 'Job updated successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  updateJobHandler(@Body() body: UpdateJobsDTO, @Param('id') id: string) {
    return this.jobService.updateJob(id, body);
  }

  @Delete(':id')
  @Role(['company', 'admin'])
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete a job by ID' })
  @ApiResponse({ status: 200, description: 'Job deleted successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  deleteJobHandler(@Param('id') id: string) {
    return this.jobService.deleteJob(id);
  }
}
