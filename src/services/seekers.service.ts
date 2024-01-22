import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PDFDocument from 'pdfkit';
import * as blobStream from 'blob-stream';

import {
  EducationDTO,
  ExperienceDTO,
  UpdateSeekerDTO,
} from 'src/dto/update/seeker.updateDto';
import { Education, Experience, Seekers } from 'src/entities/seekers.entity';
import { UserAuth } from 'src/entities/authentication.entity';

@Injectable()
export class SeekerService {
  constructor(
    @InjectRepository(Seekers)
    private jobSeekerRepository: Repository<Seekers>,

    @InjectRepository(Education)
    private educationRepository: Repository<Education>,

    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  async getSeekers() {
    const seekers = await this.jobSeekerRepository.find();

    return {
      status: 'success',
      data: seekers,
    };
  }

  async addSeekerEducation(user: UserAuth, data: EducationDTO) {
    if (!user?.seekerDetails) {
      throw new NotFoundException('Seeker not found');
    }

    const newSeekerEducation = await this.educationRepository.save(
      this.educationRepository.create({
        ...data,
        jobSeeker: user?.seekerDetails,
      }),
    );
    return { ...newSeekerEducation };
  }

  async addSeekerExperience(user: UserAuth, data: ExperienceDTO) {
    if (!user?.seekerDetails) {
      throw new NotFoundException('Seeker not found');
    }

    const newSeekerExperience = await this.experienceRepository.save(
      this.experienceRepository.create({
        ...data,
        jobSeeker: user?.seekerDetails,
      }),
    );
    return { ...newSeekerExperience };
  }

  async updateSeeker(userId: string, seekerDto: UpdateSeekerDTO) {
    const seeker = await this.jobSeekerRepository.findOneBy({
      userAuth: { id: userId },
    });
    if (seeker) {
      await this.jobSeekerRepository.update({ id: seeker?.id }, seekerDto);
    } else {
      await this.jobSeekerRepository.save(
        this.jobSeekerRepository.create({
          ...seekerDto,
          userAuth: { id: userId },
        }),
      );
    }

    return;
  }

  async deleteSeekerEducation(user: UserAuth, id: string) {
    const seekerEducation = await this.educationRepository.findOne({
      where: { id, jobSeeker: { id: user.seekerDetails?.id } },
    });
    await this.educationRepository.remove(seekerEducation);
    return {
      message: 'Education deleted successfully',
    };
  }

  async deleteSeekerExperience(user: UserAuth, id: string) {
    const seekerExperience = await this.experienceRepository.findOne({
      where: { id, jobSeeker: { id: user.seekerDetails?.id } },
    });
    await this.experienceRepository.remove(seekerExperience);
    return {
      message: 'Experience deleted successfully',
    };
  }

  async getSeeker(id: string) {
    const seeker = await this.jobSeekerRepository.findOneBy({ id });
    if (!seeker) {
      return {
        status: 'error',
        message: 'Seeker not found',
      };
    }
    return seeker;
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

  async deleteSelf(user: Seekers) {
    user.remove();
    return {
      status: 'success',
      message: 'Seeker deleted successfully',
    };
  }

  async generateCV(jobSeekerId: string) {
    const jobSeeker = await this.jobSeekerRepository.findOneOrFail({
      where: { id: jobSeekerId },
      relations: ['experiences', 'educations'],
    });

    if (!jobSeeker) {
      throw new NotFoundException(`JobSeeker with id ${jobSeekerId} not found`);
    }

    const pdf = new PDFDocument();
    const stream = pdf.pipe(blobStream());
    pdf.font('Helvetica-Bold');

    // Header
    pdf.fontSize(20).text(`Curriculum Vitae`, { align: 'center' });
    pdf.fontSize(16).text(`${jobSeeker.first_name} ${jobSeeker.last_name}`, {
      align: 'center',
    });
    pdf.moveDown(1);

    // Experiences
    pdf.fontSize(18).text('Experiences');
    jobSeeker.experiences.forEach((experience) => {
      pdf.moveDown(0.5);
      pdf.fontSize(16).text(`${experience.title} at ${experience.employer}`);
      pdf.fontSize(14).text(`Location: ${experience.country}`);
      pdf
        .fontSize(14)
        .text(
          `Duration: ${experience.startDate.toDateString()} - ${
            experience.isCurrentRole
              ? 'Present'
              : experience.endDate.toDateString()
          }`,
        );
      pdf.fontSize(14).text(`Responsibilities: ${experience.responsibilities}`);
      pdf.moveDown(0.5);
    });

    // Education
    pdf.moveDown(1);
    pdf.fontSize(18).text('Education');
    jobSeeker.education.forEach((education) => {
      pdf.moveDown(0.5);
      pdf.fontSize(16).text(`${education.degree} in ${education.fieldOfStudy}`);
      pdf.fontSize(14).text(`Institution: ${education.institution}`);
      pdf
        .fontSize(14)
        .text(
          `Duration: ${education.startDate.toDateString()} - ${
            education.isStudying ? 'Present' : education.endDate.toDateString()
          }`,
        );
      pdf.moveDown(0.5);
    });

    pdf.end();
    stream.on('finish', () => {
      const blob = stream.toBlobURL('application/pdf');

      return blob;
    });
  }
}
