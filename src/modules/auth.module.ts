import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { UserAuth } from 'src/entities/authentication.entity';
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
    TypeOrmModule.forFeature([UserAuth]),
  ],
})
export class AuthModule {}
