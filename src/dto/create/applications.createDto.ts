import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/utils/enums';

export class CreateApplicationDto {
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  jobId: string;

  @ApiProperty({ enum: Status, default: Status.PENDING })
  @IsEnum(Status)
  status: Status;
}
