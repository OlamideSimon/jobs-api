import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsArray, IsNumber, IsDate } from 'class-validator';
import { ExperienceLevel, JobsType } from 'src/entities/jobs.entity';

export class JobDTO {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  qualifications: string[];

  @IsString()
  @ApiProperty()
  location: string;

  @IsEnum(JobsType)
  @ApiProperty({ enum: JobsType })
  type: JobsType;

  @IsString()
  @ApiProperty()
  industry: string;

  @IsEnum(ExperienceLevel)
  @ApiProperty({ enum: ExperienceLevel })
  experienceLevel: ExperienceLevel;

  @IsNumber()
  @ApiProperty()
  salary: number;

  @IsDate()
  @ApiProperty()
  deadline: Date;
}
