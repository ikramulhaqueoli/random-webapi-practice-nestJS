import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsDate, Matches } from 'class-validator';

abstract class WriteProfileDto {
  @IsOptional()
  @Matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/, {
    message: 'Display name must contain at least two words and no numeric or special characters',
  })
  @ApiProperty()
  displayName?: string;

  @IsOptional()
  @Matches(/^(male|female|other)$/i, {
    message: 'Gender must be either "male", "female" or "other".',
  })
  @ApiProperty()
  gender?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  birthday?: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  height?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  weight?: number;
}

export abstract class CreateProfileDto extends WriteProfileDto {
  @IsOptional()
  @Matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/, {
    message: 'Display name must contain at least two words and no numeric or special characters',
  })
  @ApiProperty()
  displayName?: string;

  @IsNotEmpty()
  @ApiProperty()
  @Matches(/^(male|female|other)$/i, {
    message: 'Gender must be either "male", "female" or "other".',
  })
  gender?: string;
}

export abstract class UpdateProfileDto extends WriteProfileDto {
}
