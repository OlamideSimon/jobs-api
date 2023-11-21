// employers.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IndustriesType } from 'src/utils/enums';

export class CreateEmployersDTO {
  @IsString()
  @ApiProperty()
  companyName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  logoUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  employees?: string;

  @IsOptional()
  @IsEnum(IndustriesType)
  @ApiProperty({ enum: IndustriesType, required: false })
  industry?: IndustriesType;

  @IsOptional()
  @ApiProperty({ type: String, format: 'date', required: false })
  founded?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  companyDescription?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  companyInfo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  companyUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  location?: string;
}
