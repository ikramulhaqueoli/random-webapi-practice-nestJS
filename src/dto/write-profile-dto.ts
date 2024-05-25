import { IsNotEmpty, IsString, IsNumber, IsEmpty, IsOptional, IsAlpha, IsDate } from 'class-validator';

abstract class WriteProfileDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsAlpha()
  displayName?: string;

  @IsOptional()
  @IsAlpha()
  gender?: string;

  @IsDate()
  @IsOptional()
  birthday?: Date;

  @IsAlpha()
  @IsOptional()
  horoscope?: string;

  @IsAlpha()
  @IsOptional()
  zodiac?: string;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;
}

export abstract class CreateProfileDto extends WriteProfileDto {
  @IsNotEmpty()
  @IsString()
  displayName?: string;

  @IsNotEmpty()
  @IsString()
  gender?: string;
}

export abstract class UpdateProfileDto extends WriteProfileDto {
}
