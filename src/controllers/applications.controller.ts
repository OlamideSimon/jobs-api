import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles.decorator';
import { CreateApplicationDto } from 'src/dto/create/applications.createDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { ApplicationService } from 'src/services/applications.service';

@Controller('applications')
@ApiTags('Applications')
export class ApplicationsController {
  constructor(private applicationService: ApplicationService) {}

  @Get()
  async getApplicationsHandler() {
    const applications = await this.applicationService.getApplications();
    return {
      status: 'success',
      data: applications,
    };
  }

  @Delete(':id')
  // @Role('employer')
  // @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete an Application' })
  @ApiResponse({
    status: 204,
    description: 'Application deleted successfully',
  })
  async deleteApplicationHandler(@Param('id') id: string) {
    await this.applicationService.deleteApplication(id);
    return {
      status: 'success',
      message: 'Application deleted successfully',
    };
  }

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
      req?.user?.id,
    );
    return {
      status: 'success',
      data: applications,
    };
  }

  @Get('applied/:jobId/:applicantId')
  @Role('employer')
  @UseGuards(AuthGuard, RoleGuard)
  async getApplicationBySeekerIdHandler(
    @Request() req: any,
    @Param('jobId') jobId: string,
    @Param('applicantId') applicantId: string,
  ) {
    const applications = await this.applicationService.getApplicationBySeekerId(
      req?.user?.id,
      jobId,
      applicantId,
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
    @Body() body: CreateApplicationDto,
  ) {
    const application = await this.applicationService.createApplication(
      jobId,
      req?.user,
      body,
    );
    return {
      status: 'success',
      data: application,
    };
  }
}
