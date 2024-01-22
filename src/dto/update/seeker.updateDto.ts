import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { JobAvailabilityStatus, Levels } from 'src/utils/enums';

export class UpdateSeekerDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  last_name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  about: string;

  @IsEnum(JobAvailabilityStatus)
  @ApiProperty()
  @IsOptional()
  availability: JobAvailabilityStatus;

  @IsEmail()
  @ApiProperty()
  @IsOptional()
  email: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  phone: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  currentRole: string;

  @IsOptional()
  @IsUrl()
  resumeUrl: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  skills: string[];

  @IsOptional()
  @IsString()
  location: string;
}

export class ExperienceDTO {
  @IsString()
  employer: string;

  @IsString()
  title: string;

  @IsEnum(Levels)
  level: Levels;

  @IsString()
  country: string;

  @IsDate()
  startDate: Date;

  @IsOptional()
  endDate?: Date | undefined;

  @IsString()
  responsibilities: string;

  @IsOptional()
  @IsBoolean()
  isCurrentRole?: boolean;
}

export class EducationDTO {
  @IsNotEmpty()
  @IsString()
  institution: string;

  @IsNotEmpty()
  @IsString()
  degree: string;

  @IsNotEmpty()
  @IsString()
  fieldOfStudy: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsOptional()
  endDate?: Date | undefined;

  @IsBoolean()
  isStudying?: boolean;
}
