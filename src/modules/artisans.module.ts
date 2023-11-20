import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtisansController } from 'src/controllers/artisans.controller';
import { Artisans } from 'src/entities/artisans.entity';
import { ArtisanService } from 'src/services/artisans.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artisans])],
  controllers: [ArtisansController],
  providers: [ArtisanService],
})
export class ArtisanModule {}
