import { IsNotEmpty, IsString, IsEmail, MinLength, IsNumber } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  displayName?: string;

  @IsNotEmpty()
  @IsString()
  gender?: string;

  @IsNotEmpty()
  @IsString()
  birthday?: Date;

  @IsString()
  horoscope?: string;

  @IsString()
  zodiac?: string;

  @IsNumber()
  height?: number;

  @IsNumber()
  weight?: number;
}
