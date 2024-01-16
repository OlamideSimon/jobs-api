import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { ApplicationService } from 'src/services/applications.service';

@Controller('applications')
@ApiTags('Applications')
export class ApplicationsController {
  constructor(private applicationService: ApplicationService) {}

  @Get('applied')
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get a list of Applications by applicant' })
  @ApiResponse({
    status: 200,
    description: 'List of Applications retrieved successfully',
  })
  async getSeekerApplicationsHandler(@Request() req: any) {
    const applications = await this.applicationService.getSeekerApplications(
      req?.user?.seekerDetails?.id,
    );
    return {
      status: 'success',
      data: applications,
    };
  }

  @Post(':jobId')
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Make a new Application' })
  @ApiResponse({
    status: 201,
    description: 'Application submitted successfully',
  })
  async createApplicationHandler(
    @Param('jobId') jobId: string,
    @Request() req: any,
  ) {
    const application = await this.applicationService.createApplication(
      jobId,
      req?.user?.seekerDetails,
    );
    return {
      status: 'success',
      data: application,
    };
  }

  @Get('applied/:jobId/:applicantId')
  @Role('employer')
  @UseGuards(AuthGuard, RoleGuard)
  getApplicationBySeekerIdHandler(
    @Request() req: any,
    @Param('jobId') jobId: string,
    @Param('applicantId') applicantId: string,
  ) {
    const applications = this.applicationService.getApplicationBySeekerId(
      req?.user?.employerDetails?.id,
      jobId,
      applicantId,
    );
    return {
      status: 'success',
      data: applications,
    };
  }
}
