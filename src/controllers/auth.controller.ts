import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginDTO,
  RegisterCompanyDTO,
  RegisterSeekerDTO,
} from 'src/dto/create/auth.createDto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  loginHandler(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @Post('register/seeker')
  @ApiOperation({ summary: 'Register as a job seeker' })
  @ApiResponse({
    status: 201,
    description: 'Job seeker registration successful',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  registerSeekerHandler(@Body() data: RegisterSeekerDTO) {
    return this.authService.registerSeeker(data);
  }

  @Post('register/company')
  @ApiOperation({ summary: 'Register as a company' })
  @ApiResponse({ status: 201, description: 'Company registration successful' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  registerCompanyHandler(@Body() data: RegisterCompanyDTO) {
    return this.authService.registerCompany(data);
  }
}
