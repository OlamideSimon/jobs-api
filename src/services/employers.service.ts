import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployersDTO } from 'src/dto/create/employers.createDto';
import { UpdateEmployersDTO } from 'src/dto/update/employers.updateDto';
import { Employers } from 'src/entities/employers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(Employers)
    private readonly employersRepository: Repository<Employers>,
  ) {}

  async createEmployer(createEmployerDTO: CreateEmployersDTO) {
    const employer = await this.employersRepository.create(createEmployerDTO);
    return this.employersRepository.save(employer);
  }

  async getAllEmployers() {
    return this.employersRepository.find();
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
}
