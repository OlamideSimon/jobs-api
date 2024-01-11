import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IndustriesType } from 'src/utils/enums';

export class UpdateEmployersDTO {
  @ApiProperty()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  employees: string;

  @ApiProperty({ required: true, enum: IndustriesType })
  @IsEnum(IndustriesType)
  @IsNotEmpty()
  industry: IndustriesType;

  @ApiProperty({ required: true })
  @IsDate()
  @IsNotEmpty()
  founded: Date;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  companyDescription: string;

  // @ApiProperty({ required: true })
  // @IsOptional()
  // companyInfo?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  companyUrl: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  location: string;
}
