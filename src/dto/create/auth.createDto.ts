import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';
import { UserType } from 'src/utils/enums';

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

  @IsEnum(UserType, {
    message: 'Invalid user_type. Must be either "seeker" or "company".',
  })
  @ApiProperty({
    enum: UserType,
    description: 'User type: "seeker" or "company".',
  })
  account_type: UserType;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  remember_me: boolean;
}

export class RegistrationDTO {
  @IsEnum(UserType, {
    message: 'Invalid user_type. Must be either "seeker" or "company".',
  })
  @ApiProperty({
    enum: UserType,
    description: 'User type: "seeker" or "company".',
  })
  account_type: UserType;

  @IsString()
  @IsNotEmpty({ message: 'First name is required.' })
  @ValidateIf((object) => object.user_type === UserType.Seeker)
  @ApiProperty({ required: false })
  first_name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required.' })
  @ValidateIf((object) => object.user_type === UserType.Seeker)
  @ApiProperty({ required: false })
  last_name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Company name is required.' })
  @ValidateIf((object) => object.user_type === UserType.Company)
  @ApiProperty({ required: false })
  company_name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @ApiProperty()
  password: string;
}

// export class RegisterSeekerDTO {
//   @IsEmail()
//   @ApiProperty()
//   email: string;

//   @IsString()
//   @ApiProperty()
//   fName: string;

//   @IsString()
//   @ApiProperty()
//   lName: string;

//   @IsString()
//   @Matches(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
//     {
//       message:
//         'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
//     },
//   )
//   @ApiProperty()
//   password: string;
// }

// export class RegisterCompanyDTO {
//   @IsString()
//   @ApiProperty()
//   companyName: string;

//   @IsEmail()
//   @ApiProperty()
//   email: string;

//   @IsString()
//   @Matches(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
//     {
//       message:
//         'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
//     },
//   )
//   @ApiProperty()
//   password: string;
// }
