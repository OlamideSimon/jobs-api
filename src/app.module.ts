import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { JobSeekersModule } from './modules/seekers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './modules/applications.module';
import { ArtisanModule } from './modules/artisans.module';
import { DomesticModule } from './modules/domestic.module';
import { EmployersModule } from './modules/employers.module';
import { JobsModule } from './modules/jobs.module';
import { ServicesModule } from './modules/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      //   host: process.env.DATABASE_HOST,
      //   username: process.env.DATABASE_USERNAME,
      //   password: process.env.DATABASE_PASSWORD,
      //   database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    JobSeekersModule,
    ApplicationModule,
    ArtisanModule,
    DomesticModule,
    EmployersModule,
    JobsModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
