import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applications } from 'src/entities/applications.entity';
import { Repository } from 'typeorm';
import { JobService } from './jobs.service';
import { SeekerService } from './seekers.service';
import { Seekers } from 'src/entities/seekers.entity';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly jobService: JobService,
    private readonly seekerService: SeekerService,
    @InjectRepository(Applications)
    private readonly applicationRepository: Repository<Applications>,
  ) {}

  async createApplication(jobId: string, applicant: Seekers) {
    try {
      const job = await this.jobService.getJob(jobId);

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
        relations: { job: { employer: true } },
      });

      return applications;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getApplicationBySeekerId(
    companyId: string,
    jobId: string,
    applicantId: string,
  ) {
    try {
      const application = await this.applicationRepository.findOne({
        relations: { job: true, jobSeeker: { userAuth: true } },
        where: {
          jobSeeker: { id: applicantId },
          job: { employer: { id: companyId }, isOpen: true, id: jobId },
        },
      });

      return application || null;
    } catch (error) {
      console.error('Error fetching job application:', error);
      throw new Error('An error occurred while fetching the job application.');
    }
  }
}
