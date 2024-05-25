import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  
  @IsEmail()
  email: string;
  
  @IsString()
  horoscope?: string;
  
  @IsString()
  zodiac?: string;
}

