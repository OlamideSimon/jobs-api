import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSeekerDTO } from 'src/dto/update/seeker.updateDto';
import { JobSeekers } from 'src/entities/seekers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeekerService {
  constructor(
    @InjectRepository(JobSeekers)
    private jobSeekerRepository: Repository<JobSeekers>,
  ) {}

  async upDateSeeker(seekerDto: UpdateSeekerDTO) {
    return { seekerDto };
  }

  async getSeeker(id: string) {
    return id;
  }
}
