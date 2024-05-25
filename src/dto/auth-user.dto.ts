import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

abstract class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class CreateUserDto extends AuthUserDto {
  @IsEmail()
  email: string;
}

export class LoginUserDto extends AuthUserDto {
}