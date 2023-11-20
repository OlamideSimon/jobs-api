import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from 'src/controllers/jobs.controller';
import { Jobs } from 'src/entities/jobs.entity';
import { JobService } from 'src/services/jobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs])],
  controllers: [JobsController],
  providers: [JobService],
})
export class JobsModule {}
