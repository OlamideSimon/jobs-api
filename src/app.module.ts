import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { JobSeekersModule } from './modules/seekers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    AuthModule,
    JobSeekersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
