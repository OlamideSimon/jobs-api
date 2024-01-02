import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginDTO,
  RegistrationDTO,
  UpdateEmailDTO,
  UpdatePasswordDTO,
} from 'src/dto/create/auth.createDto';
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
  @ApiOperation({ summary: 'Register as a new user(job seeker or company)' })
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
    return this.authService.getMe(req?.user?.id);
  }

  @Post('update-email')
  @UseGuards(AuthGuard)
  updateEmailHandler(@Body() data: UpdateEmailDTO, @Request() req: any) {
    return this.authService.updateEmail(req?.user, data);
  }

  @Post('update-password')
  @UseGuards(AuthGuard)
  updatePasswordHandler(@Body() data: UpdatePasswordDTO, @Request() req: any) {
    return this.authService.updatePassword(req?.user, data);
  }
}
