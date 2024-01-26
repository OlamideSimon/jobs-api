import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Currency } from 'src/utils/enums';

export class CreateApplicationDto {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  resumeData?: string;

  @ApiProperty()
  @IsBoolean()
  applyWithCV: boolean;

  @ApiProperty()
  @IsNumber()
  yearsOfExperience: number;

  @ApiProperty({ enum: Currency })
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty()
  @IsNumber()
  expSalary: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverLetter?: string;
}
