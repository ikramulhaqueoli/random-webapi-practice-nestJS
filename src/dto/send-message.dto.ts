import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  receiverUsername: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string
}

