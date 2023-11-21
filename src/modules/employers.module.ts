import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployersController } from 'src/controllers/employers.controller';
import { Employers } from 'src/entities/employers.entity';
import { EmployersService } from 'src/services/employers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employers])],
  controllers: [EmployersController],
  providers: [EmployersService, JwtService],
})
export class EmployersModule {}
