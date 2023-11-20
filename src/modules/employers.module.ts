import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employers } from 'src/entities/employers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employers])],
})
export class EmployersModule {}
