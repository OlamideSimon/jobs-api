import {
  Body,
  Controller,
  Get,
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

  @Post()
  @Role('seeker')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Make a new Application' })
  @ApiResponse({
    status: 201,
    description: 'Application submitted successfully',
  })
  async createApplicationHandler(
    @Body() body: CreateApplicationDto,
    @Request() req: any,
  ) {
    const application = await this.applicationService.createApplication(
      body,
      req?.user,
    );
    return {
      status: 'success',
      data: application,
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
}
