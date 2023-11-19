import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
    },
  )
  @ApiProperty()
  password: string;
}

export class RegisterSeekerDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  fName: string;

  @IsString()
  @ApiProperty()
  lName: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
    },
  )
  @ApiProperty()
  password: string;
}

export class RegisterCompanyDTO {
  @IsString()
  @ApiProperty()
  companyName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
    },
  )
  @ApiProperty()
  password: string;
}
