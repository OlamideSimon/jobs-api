import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LoginDTO,
  RegistrationDTO,
  UpdateEmailDTO,
  UpdatePasswordDTO,
} from 'src/dto/create/auth.createDto';
import { Employers } from 'src/entities/employers.entity';
import { JobSeekers } from 'src/entities/seekers.entity';
import { comparePassword, hashPassword } from 'src/utils/password';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Employers)
    private readonly employersRepository: Repository<Employers>,
    @InjectRepository(JobSeekers)
    private readonly seekerRepository: Repository<JobSeekers>,
  ) {}

  async login(loginDto: LoginDTO) {
    try {
      let account: Employers | JobSeekers;
      if (loginDto.account_type === 'seeker') {
        account = await this.seekerRepository.findOneBy({
          email: loginDto.email,
        });
      } else if (loginDto.account_type === 'employer') {
        account = await this.employersRepository.findOneBy({
          email: loginDto.email,
        });
      }

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

      return {
        status: 'success',
        access_token,
        role: account.role,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async register(registerDto: RegistrationDTO) {
    try {
      let account: Employers | JobSeekers;
      if (registerDto.account_type === 'seeker') {
        account = await this.seekerRepository.save(
          this.seekerRepository.create({
            ...registerDto,
            fName: registerDto.first_name,
            lName: registerDto.last_name,
          }),
        );
      } else if (registerDto.account_type === 'employer') {
        account = await this.employersRepository.save(
          this.employersRepository.create({
            ...registerDto,
          }),
        );
      }

      const access_token = await this.generateToken({
        ...account,
      });

      return {
        status: 'success',
        access_token,
        role: account.role,
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
      let user: JobSeekers | Employers;
      const seeker = await this.seekerRepository.findOneBy({ id: userId });
      if (seeker) {
        user = seeker;
      } else {
        user = await this.employersRepository.findOneBy({ id: userId });
      }

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

  async updateEmail(user: JobSeekers | Employers, data: UpdateEmailDTO) {
    try {
      user.email = data.newEmail;
      if (user.role === 'seeker') {
        await this.seekerRepository.preload({ id: user?.id, ...user });
      } else {
        await this.employersRepository.preload({ id: user?.id, ...user });
      }

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

  async updatePassword(user: JobSeekers | Employers, data: UpdatePasswordDTO) {
    try {
      await comparePassword(data.oldPassword, user.password);
      user.password = await hashPassword(data.newPassword);
      if (user.role === 'seeker') {
        await this.seekerRepository.preload({ id: user?.id, ...user });
      } else {
        await this.employersRepository.preload({ id: user?.id, ...user });
      }
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
