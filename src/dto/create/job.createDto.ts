import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExperienceLevel, IndustriesType, JobsType } from 'src/utils/enums';

export class CreateJobDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  who_you_are: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nice_to_haves: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ enum: JobsType, isArray: true })
  @IsArray()
  @IsEnum(JobsType, { each: true })
  type: JobsType[];

  @ApiProperty({ enum: IndustriesType })
  @IsEnum(IndustriesType)
  industry: IndustriesType;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @ApiProperty({ enum: ExperienceLevel })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  salary: number[];

  @ApiProperty({ type: Date })
  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isFeatured: boolean;
}
