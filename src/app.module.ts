import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { JobSeekersModule } from './modules/seekers.module';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST,
    //   username: process.env.DATABASE_USERNAME,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // }),
    AuthModule,
    JobSeekersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
