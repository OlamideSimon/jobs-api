import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, Min } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Min(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\\d!@#$%^&*()-_+=]{8,}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
    },
  )
  @ApiProperty()
  password: string;
}

export class RegisterSeekerDTO {
  @IsString()
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
  @Min(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\\d!@#$%^&*()-_+=]{8,}$/,
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

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Min(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\\d!@#$%^&*()-_+=]{8,}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
    },
  )
  @ApiProperty()
  password: string;
}
