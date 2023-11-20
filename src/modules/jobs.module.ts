import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobs } from 'src/entities/jobs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs])],
})
export class JobsModule {}
