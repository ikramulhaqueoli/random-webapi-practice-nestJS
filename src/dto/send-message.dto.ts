import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  receiverUsername: string

  @IsNotEmpty()
  @IsString()
  text: string
}

