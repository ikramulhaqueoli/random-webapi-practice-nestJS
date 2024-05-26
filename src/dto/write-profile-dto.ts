import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsDate, Matches } from 'class-validator';

abstract class WriteProfileDto {
  @IsOptional()
  @Matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/, {
    message: 'Display name must contain at least two words and no numeric or special characters',
  })
  displayName?: string;

  @IsOptional()
  @Matches(/^(male|female|other)$/i, {
    message: 'Gender must be either "male" or "female".',
  })
  gender?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  birthday?: Date;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;
}

export abstract class CreateProfileDto extends WriteProfileDto {
  @IsOptional()
  @Matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/, {
    message: 'Display name must contain at least two words and no numeric or special characters',
  })
  displayName?: string;

  @IsNotEmpty()
  @Matches(/^(male|female)$/i, {
    message: 'Gender must be either "male" or "female".',
  })
  gender?: string;
}

export abstract class UpdateProfileDto extends WriteProfileDto {
}
