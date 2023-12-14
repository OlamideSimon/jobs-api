import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from 'src/dto/create/applications.createDto';
import { Applications } from 'src/entities/applications.entity';
import { Repository } from 'typeorm';
import { JobService } from './jobs.service';
import { SeekerService } from './seekers.service';
import { JobSeekers } from 'src/entities/seekers.entity';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly jobService: JobService,
    private readonly seekerService: SeekerService,
    @InjectRepository(Applications)
    private readonly applicationRepository: Repository<Applications>,
  ) {}

  async createApplication(
    applicationDto: CreateApplicationDto,
    applicant: JobSeekers,
  ) {
    try {
      const job = await this.jobService.getJob(applicationDto.jobId);

      const application = await this.applicationRepository.save(
        this.applicationRepository.create({ job, jobSeeker: applicant }),
      );

      return application;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSeekerApplications(id: string) {
    try {
      const applications = await this.applicationRepository.find({
        where: { jobSeeker: { id } },
      });

      return applications;
    } catch (error) {
      throw new Error(error);
    }
  }
}
