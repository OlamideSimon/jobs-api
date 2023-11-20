import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/entities/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
})
export class ServicesModule {}
