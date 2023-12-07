import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegistrationDTO } from 'src/dto/create/auth.createDto';
import { Employers } from 'src/entities/employers.entity';
import { JobSeekers } from 'src/entities/seekers.entity';
import { comparePassword } from 'src/utils/password';
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
      } else if (loginDto.account_type === 'company') {
        account = await this.employersRepository.findOneBy({
          email: loginDto.email,
        });
      }

      if (!account) {
      }

      await comparePassword(loginDto.password, account.password);
      const access_token = await this.generateToken(account);

      return {
        status: 'success',
        access_token,
      };
    } catch (error) {
      throw error;
    }
  }

  async register(registerDto: RegistrationDTO) {
    try {
      let account: Employers | JobSeekers;
      if (registerDto.account_type === 'seeker') {
        account = await this.seekerRepository.save(
          this.seekerRepository.create({ ...registerDto }),
        );
      } else if (registerDto.account_type === 'company') {
        account = await this.employersRepository.save(
          this.employersRepository.create({ ...registerDto }),
        );
      }

      const access_token = await this.generateToken(account);

      return {
        status: 'success',
        access_token,
        data: account,
      };
    } catch (error) {
      if (error.code === '23505' && error.detail.includes('email')) {
        throw new ConflictException('Email address is already in use.');
      }
      throw new InternalServerErrorException(
        'Registration failed. Please try again later.',
      );
    }
  }

  generateToken(payload: any, remember_me?: boolean): string {
    const expiresIn = remember_me ? '30d' : undefined;
    return this.jwtService.sign(payload, { expiresIn });
  }
}
