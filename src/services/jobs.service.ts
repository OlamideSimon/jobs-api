import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDto } from 'src/dto/create/job.createDto';
import { UpdateJobsDTO } from 'src/dto/update/job.updateDto';
import { Jobs } from 'src/entities/jobs.entity';
import { Repository } from 'typeorm';
import { EmployersService } from './employers.service';

@Injectable()
export class JobService {
  constructor(
    private readonly employerService: EmployersService,
    @InjectRepository(Jobs)
    private readonly jobRepository: Repository<Jobs>,
  ) {}

  async createJob(jobDto: CreateJobDto, userId: string) {
    try {
      const user = await this.employerService.getEmployerByAuthId(userId);
      const company = await this.jobRepository.save(
        this.jobRepository.create({
          ...jobDto,
          employer: user,
        }),
      );

      return {
        status: 'success',
        data: company,
      };
    } catch (error) {
      throw error;
    }
  }

  async getJobs() {
    try {
      const jobs = await this.jobRepository.find({
        order: { created_at: 'ASC' },
        where: { isOpen: true },
        relations: { employer: true },
      });

      return {
        status: 'success',
        data: jobs,
      };
    } catch (error) {
      throw error;
    }
  }

  async getFeaturedJobs() {
    try {
      const jobs = await this.jobRepository.find({
        where: { isFeatured: true, isOpen: true },
        relations: { employer: true },
      });

      return {
        status: 'success',
        data: jobs,
      };
    } catch (error) {
      throw error;
    }
  }

  async getJob(id: string) {
    try {
      const job = await this.jobRepository.findOne({
        where: { id },
        relations: { employer: true, applications: { jobSeeker: true } },
      });

      if (!job) {
        throw new HttpException('Job does not exist', HttpStatus.BAD_REQUEST);
      }

      return job;
    } catch (error) {
      throw error;
    }
  }

  async updateJob(id: string, data: UpdateJobsDTO) {
    const job = await this.jobRepository.preload({ id, ...data });

    if (!job) {
      throw new HttpException(`Job not Found`, HttpStatus.BAD_REQUEST);
    }

    await job.save();

    return {
      status: 'success',
      data: job,
    };
  }

  async deleteJob(id: string) {
    const job = await this.jobRepository.findOneBy({ id });

    if (!job) {
      throw new HttpException('Job does not exist', HttpStatus.BAD_REQUEST);
    }

    await this.jobRepository.delete({ id });

    return { status: 'success' };
  }
}
