import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginDTO,
  RegisterCompanyDTO,
  RegisterSeekerDTO,
} from 'src/dto/create/auth.createDto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDTO) {
    return { loginDto };
  }

  async registerSeeker(registerDto: RegisterSeekerDTO) {
    return { registerDto };
  }

  async registerCompany(registerDto: RegisterCompanyDTO) {
    return { registerDto };
  }

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async googleAuth() {}
}
