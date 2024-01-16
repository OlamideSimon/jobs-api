import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  jobId: string;
}
