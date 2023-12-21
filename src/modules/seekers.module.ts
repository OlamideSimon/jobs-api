import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekersController } from 'src/controllers/seekers.controller';
import { Education, Experience, JobSeekers } from 'src/entities/seekers.entity';
import { SeekerService } from 'src/services/seekers.service';

@Module({
  providers: [SeekerService, JwtService],
  controllers: [SeekersController],
  imports: [TypeOrmModule.forFeature([JobSeekers, Education, Experience])],
  exports: [SeekerService],
})
export class JobSeekersModule {}
