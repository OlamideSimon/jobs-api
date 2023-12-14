import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegistrationDTO } from 'src/dto/create/auth.createDto';
import { AuthGuard } from 'src/guards/auth.guard';
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

  @Post('register')
  @ApiOperation({ summary: 'Register as a new user(seeker or company)' })
  @ApiResponse({
    status: 201,
    description: 'Job seeker registration successful',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  registerSeekerHandler(@Body() data: RegistrationDTO) {
    return this.authService.register(data);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getLoggedInUser(@Request() req: any) {
    return req.user;
  }
}
