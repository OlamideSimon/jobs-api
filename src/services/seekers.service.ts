import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EducationDTO,
  ExperienceDTO,
  UpdateSeekerDTO,
} from 'src/dto/update/seeker.updateDto';
import { Education, Experience, JobSeekers } from 'src/entities/seekers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeekerService {
  constructor(
    @InjectRepository(JobSeekers)
    private jobSeekerRepository: Repository<JobSeekers>,

    @InjectRepository(Education)
    private educationRepository: Repository<Education>,

    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  async addSeekerEducation(user: JobSeekers, data: EducationDTO) {
    const newSeekerEducation = await this.educationRepository.save(
      this.educationRepository.create({ ...data, jobSeeker: user }),
    );
    return { newSeekerEducation };
  }

  async addSeekerExperience(user: JobSeekers, data: ExperienceDTO) {
    const newSeekerExperience = await this.experienceRepository.save(
      this.experienceRepository.create({ ...data, jobSeeker: user }),
    );
    return { newSeekerExperience };
  }

  async updateSeeker(userId: string, seekerDto: UpdateSeekerDTO) {
    const seeker = await this.jobSeekerRepository.preload({
      id: userId,
      ...seekerDto,
    });
    return await this.jobSeekerRepository.save(seeker);
  }

  async deleteSeekerEducation(user: JobSeekers, id: string) {
    const seekerEducation = await this.educationRepository.findOne({
      where: { id, jobSeeker: { id: user.id } },
    });
    await this.educationRepository.remove(seekerEducation);
    return {
      message: 'Education deleted successfully',
    };
  }

  async deleteSeekerExperience(user: JobSeekers, id: string) {
    const seekerExperience = await this.experienceRepository.findOne({
      where: { id, jobSeeker: { id: user.id } },
    });
    await this.experienceRepository.remove(seekerExperience);
    return {
      message: 'Experience deleted successfully',
    };
  }

  async getSeeker(id: string) {
    return id;
  }

  async deleteSeeker(id: string) {
    const seeker = await this.jobSeekerRepository.findOneBy({ id });
    if (!seeker) {
      return {
        status: 'error',
        message: 'Seeker not found',
      };
    }
    seeker.remove();
    return {
      status: 'success',
      message: 'Seeker deleted successfully',
    };
  }

  async deleteSelf(user: JobSeekers) {
    user.remove();
    return {
      status: 'success',
      message: 'Seeker deleted successfully',
    };
  }
}
