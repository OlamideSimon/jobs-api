import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsController } from 'src/controllers/applications.controller';
import { Applications } from 'src/entities/applications.entity';
import { ApplicationService } from 'src/services/applications.service';
import { JobsModule } from './jobs.module';
import { JobSeekersModule } from './seekers.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Applications]),
    JobsModule,
    JobSeekersModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationService, JwtService],
})
export class ApplicationModule {}
