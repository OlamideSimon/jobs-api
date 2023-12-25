import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Levels } from 'src/utils/enums';

export class UpdateSeekerDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  fName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  lName: string;

  @IsEmail()
  @ApiProperty()
  @IsOptional()
  email: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  contact: string;

  @IsOptional()
  @IsUrl()
  resumeUrl: string;

  @IsOptional()
  resumeData: Buffer;

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

  @IsDateString()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsString()
  responsibilities: string;

  @IsBoolean()
  @IsOptional()
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
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
