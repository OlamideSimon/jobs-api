import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Min,
} from 'class-validator';

export class SeekerDTO {
  @IsString()
  @ApiProperty()
  fName: string;

  @IsString()
  @ApiProperty()
  lName: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Min(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\\d!@#$%^&*()-_+=]{8,}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
    },
  )
  @ApiProperty()
  password: string;

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
