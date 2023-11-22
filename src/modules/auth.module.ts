import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { Employers } from 'src/entities/employers.entity';
import { JobSeekers } from 'src/entities/seekers.entity';
import { AuthService } from 'src/services/auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3d' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Employers, JobSeekers]),
  ],
})
export class AuthModule {}
