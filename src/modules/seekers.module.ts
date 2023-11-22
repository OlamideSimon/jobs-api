import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekersController } from 'src/controllers/seekers.controller';
import { JobSeekers } from 'src/entities/seekers.entity';
import { SeekerService } from 'src/services/seekers.service';

@Module({
  providers: [SeekerService],
  controllers: [SeekersController],
  imports: [TypeOrmModule.forFeature([JobSeekers])],
})
export class JobSeekersModule {}
