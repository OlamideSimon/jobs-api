import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import puppeteer from 'puppeteer';
import * as hbs from 'handlebars';
import * as fs from 'fs';

import {
  EducationDTO,
  ExperienceDTO,
  UpdateSeekerDTO,
} from 'src/dto/update/seeker.updateDto';
import { Education, Experience, Seekers } from 'src/entities/seekers.entity';
import { UserAuth } from 'src/entities/authentication.entity';
import { Applications } from 'src/entities/applications.entity';
import { convertDate } from 'src/utils/templates/handlebars.functions';

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
    const seekerDetails = await this.jobSeekerRepository.findOneBy({
      userAuth: { id: user.id },
    });

    const newSeekerEducation = await this.educationRepository.save(
      this.educationRepository.create({
        ...data,
        jobSeeker: seekerDetails,
      }),
    );
    return { ...newSeekerEducation };
  }

  async addSeekerExperience(user: UserAuth, data: ExperienceDTO) {
    const seekerDetails = await this.jobSeekerRepository.findOneBy({
      userAuth: { id: user.id },
    });

    const newSeekerExperience = await this.experienceRepository.save(
      this.experienceRepository.create({
        ...data,
        jobSeeker: seekerDetails,
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
    const seekerDetails = await this.jobSeekerRepository.findOneBy({
      userAuth: { id: user.id },
    });
    const seekerEducation = await this.educationRepository.findOne({
      where: { id, jobSeeker: { id: seekerDetails?.id } },
    });
    await this.educationRepository.remove(seekerEducation);
    return {
      message: 'Education deleted successfully',
    };
  }

  async deleteSeekerExperience(user: UserAuth, id: string) {
    const seekerDetails = await this.jobSeekerRepository.findOneBy({
      userAuth: { id: user.id },
    });

    const seekerExperience = await this.experienceRepository.findOne({
      where: { id, jobSeeker: { id: seekerDetails?.id } },
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

  async getSeekerByAuthId(userId: string) {
    const seeker = await this.jobSeekerRepository.findOneByOrFail({
      userAuth: { id: userId },
    });

    return seeker;
  }

  async deleteSeeker(id: string) {
    const seeker = await this.jobSeekerRepository.findOne({
      where: { userAuth: { id } },
    });
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

  async generateCV(jobSeekerId: string, application: Applications) {
    const jobSeeker = await this.jobSeekerRepository.findOneOrFail({
      where: { id: jobSeekerId },
      relations: ['experiences', 'education'],
    });

    const resumeContent = {
      name: `${jobSeeker.first_name} ${jobSeeker.last_name}`,
      phone: jobSeeker.phone,
      email: jobSeeker.userAuth.email,
      location: jobSeeker.location,
      about: jobSeeker.about,
      skills: jobSeeker.skills,
      experiences: jobSeeker.experiences,
      education: jobSeeker.education,
      availability: jobSeeker.availability,
      experience: application.yearsOfExperience,
    };

    hbs.registerHelper('convertDate', convertDate);
    const template = hbs.compile(
      fs.readFileSync('./src/utils/templates/resumeDesign.hbs', 'utf8'),
    );
    const htmlContent = template(resumeContent);

    // Create a browser instance
    const browser = await puppeteer.launch({ headless: 'new' });

    // Create a new page
    const page = await browser.newPage();

    page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'a4',
      printBackground: false,
    });

    // Close the browser
    await browser.close();

    // Convert PDF buffer to data URL
    const blob = URL.createObjectURL(
      new Blob([pdfBuffer], { type: 'application/pdf' }),
    );

    return blob;
  }
}
