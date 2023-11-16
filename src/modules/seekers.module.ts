import { Module } from '@nestjs/common';
import { SeekersController } from 'src/controllers/seekers.controller';
import { SeekerService } from 'src/services/seekers.service';

@Module({
  providers: [SeekerService],
  controllers: [SeekersController],
})
export class JobSeekersModule {}
