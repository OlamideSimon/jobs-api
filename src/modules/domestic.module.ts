import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomesticStaff } from 'src/entities/domestic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DomesticStaff])],
})
export class DomesticModule {}
