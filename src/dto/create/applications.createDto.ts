import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Currency, Status } from 'src/utils/enums';

export class CreateApplicationDto {
  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsString()
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
}
