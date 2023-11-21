import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';
import { ExperienceLevel, IndustriesType, JobsType } from 'src/utils/enums';

@ApiTags('Jobs')
export class CreateJobDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  responsibilities: string;

  @ApiProperty()
  @IsString()
  who_you_are: string;

  @ApiProperty()
  @IsString()
  nice_to_haves: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categories: string[];

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(JobsType, { each: true })
  type: JobsType[];

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(IndustriesType, { each: true })
  industry: IndustriesType[];

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills: string[];

  @ApiProperty()
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty()
  @IsNumber()
  salary: number;

  @ApiProperty()
  @IsDate()
  deadline: Date;
}
