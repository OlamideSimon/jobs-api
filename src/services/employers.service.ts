import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEmployersDTO } from 'src/dto/update/employers.updateDto';
import { Employers } from 'src/entities/employers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(Employers)
    private readonly employersRepository: Repository<Employers>,
  ) {}

  async getAllEmployers() {
    // const employers = await this.employersRepository
    const employers = await this.employersRepository
      .createQueryBuilder('employer')
      .where('employer.company_name IS NOT NULL')
      .andWhere('employer.industry IS NOT NULL')
      .andWhere('employer.founded IS NOT NULL')
      .andWhere('employer.companyDescription IS NOT NULL')
      .andWhere('employer.companyUrl IS NOT NULL')
      .andWhere('employer.location IS NOT NULL')
      .andWhere('employer.employees IS NOT NULL')
      .getMany();

    return {
      status: 'success',
      data: employers,
    };
  }

  async getEmployerById(id: string) {
    const employer = await this.employersRepository.findOneBy({ id });
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }
    return employer;
  }

  async getEmployerByAuthId(id: string) {
    const employer = await this.employersRepository.findOneByOrFail({ id });

    return employer;
  }

  async updateEmployer(id: string, updateEmployerDTO: UpdateEmployersDTO) {
    const employer = await this.employersRepository.findOne({
      where: { userAuth: { id } },
    });

    if (!employer) {
      throw new NotFoundException('Employer not found');
    }

    // Update fields based on the DTO
    Object.assign(employer, updateEmployerDTO);

    return this.employersRepository.save(employer);
  }

  async deleteEmployer(id: string) {
    const employer = await this.employersRepository.findOneBy({ id });
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }

    await this.employersRepository.remove(employer);
    return employer;
  }

  async getAllApplicantsForJobsUnderEmployer(id: string) {
    try {
      const employer = await this.employersRepository.findOne({
        where: { userAuth: { id } },
        relations: { jobs: { applications: { jobSeeker: true, job: true } } },
      });

      if (!employer) {
        return {
          status: 'error',
          message: 'Employer not found',
        };
      }

      const applicants = employer.jobs.flatMap((job) =>
        job.applications.map((application) => ({
          ...application,
          jobId: job.id,
        })),
      );

      return applicants;
    } catch (error) {
      console.error('Error fetching applicants:', error.message);
      return {
        status: 'error',
        message: 'Error fetching applicants',
      };
    }
  }

  async getAllJobsUnderEmployer(id: string) {
    const employer = await this.employersRepository.findOne({
      where: { userAuth: { id } },
    });
    const jobs = employer.jobs;

    return jobs;
  }
}
