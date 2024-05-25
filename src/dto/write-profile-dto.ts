import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

abstract class WriteProfileDto {
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

export abstract class CreateProfileDto extends WriteProfileDto {
}

export abstract class UpdateProfileDto extends WriteProfileDto {
}
