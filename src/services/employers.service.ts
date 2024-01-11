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

  async updateEmployer(id: string, updateEmployerDTO: UpdateEmployersDTO) {
    const employer = await this.employersRepository.findOneBy({ id });
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
    const employer = await this.employersRepository.findOneBy({ id });
    const jobs = employer.jobs;

    const applicants = jobs.reduce((acc, job) => {
      return acc.concat({ ...job.applications, jobId: job.id });
    }, []);

    return applicants;
  }
}
