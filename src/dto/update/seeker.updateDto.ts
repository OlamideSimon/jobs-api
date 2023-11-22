import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

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
  skills: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  experience: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  education: string[];

  @IsOptional()
  @IsString()
  location: string;
}
