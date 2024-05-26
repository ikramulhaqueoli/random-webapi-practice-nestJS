import { IsNotEmpty, IsString, IsEmail, MinLength, Matches } from 'class-validator';

abstract class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character' 
  })
  password: string;
}

export class CreateUserDto extends AuthUserDto {
  @IsEmail()
  email: string;
}

export class LoginUserDto extends AuthUserDto {
}