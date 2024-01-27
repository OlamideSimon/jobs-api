import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import {
  LoginDTO,
  RegistrationDTO,
  UpdateEmailDTO,
  UpdatePasswordDTO,
} from 'src/dto/create/auth.createDto';
import { UserAuth } from 'src/entities/authentication.entity';
import { comparePassword, hashPassword } from 'src/utils/password';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserAuth)
    private readonly authenticationRepository: Repository<UserAuth>,
  ) {}

  async getAll() {
    return await this.authenticationRepository.find();
  }

  async login(loginDto: LoginDTO, res: Response) {
    try {
      const account = await this.authenticationRepository.findOne({
        where: {
          email: loginDto.email,
          role: loginDto.account_type,
        },
      });

      if (!account) {
        return {
          status: 'error',
          message:
            'Account not found. Please check your email or account type.',
        };
      }

      const validatePassword = await comparePassword(
        loginDto.password,
        account.password,
      );
      if (!validatePassword) {
        return {
          status: 'error',
          message: 'Invalid password. Please try again.',
        };
      }

      const access_token = await this.generateToken(
        { ...account },
        loginDto.remember_me,
      );
      const id =
        loginDto.account_type === 'seeker'
          ? account?.seekerDetails?.id
          : account?.employerDetails?.id;

      res.cookie('access_token', access_token);
      res.cookie('__user_id', id);

      return {
        status: 'success',
        access_token,
        role: account.role,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async register(registerDto: RegistrationDTO, res: Response) {
    try {
      let additionalData: any = null;

      if (registerDto.account_type === 'employer') {
        additionalData = {
          employerDetails: { company_name: registerDto.company_name },
        };
      } else if (registerDto.account_type === 'seeker') {
        additionalData = {
          seekerDetails: {
            first_name: registerDto.first_name,
            last_name: registerDto.last_name,
          },
        };
      }

      const account = await this.authenticationRepository.save(
        this.authenticationRepository.create({
          ...registerDto,
          role: registerDto.account_type,
          ...additionalData,
        }),
      );

      const access_token = await this.generateToken({
        ...account,
      });

      const id =
        registerDto.account_type === 'seeker'
          ? account[0]?.seekerDetails?.id
          : account[0]?.employerDetails?.id;

      res.cookie('access_token', access_token);
      res.cookie('__user_id', id);

      return {
        status: 'success',
        access_token,
        role: registerDto.account_type,
      };
    } catch (error) {
      if (error.code === '23505' && error.detail.includes('email')) {
        throw new ConflictException('Email address is already in use.');
      }
      console.log(error);
      throw new InternalServerErrorException(
        'Registration failed. Please try again later.',
      );
    }
  }

  async getMe(userId: string) {
    try {
      const user = await this.authenticationRepository.findOne({
        where: { id: userId },
        relations: ['employerDetails', 'seekerDetails'],
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        status: 'success',
        data: user,
      };
    } catch (error: any) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateEmail(user: UserAuth, data: UpdateEmailDTO) {
    try {
      user.email = data.newEmail;
      await this.authenticationRepository.save(user);

      return {
        status: 'success',
        message: 'Email updated successfully',
      };
    } catch (error) {
      if (error.code === 'SQL_UNIQUE_CONSTRAINT_VIOLATION') {
        throw new HttpException(
          'New email is already in use',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log(error);

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePassword(user: UserAuth, data: UpdatePasswordDTO) {
    try {
      await comparePassword(data.oldPassword, user.password);
      user.password = await hashPassword(data.newPassword);
      await this.authenticationRepository.save(user);

      return {
        status: 'success',
        message: 'Password updated successfully',
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        return {
          status: 'error',
          message: 'Validation error. Please check your input.',
        };
      }

      console.error('Error updating password:', error);

      return {
        status: 'error',
        message: 'An error occurred while updating the password.',
      };
    }
  }

  generateToken(payload: any, remember_me?: boolean): string {
    const expiresIn = remember_me ? '30d' : '3d';
    return this.jwtService.sign(payload, { expiresIn });
  }
}
