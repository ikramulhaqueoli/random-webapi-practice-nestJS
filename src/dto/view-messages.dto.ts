import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ViewMessagesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  partnerUsername: string;

  @IsOptional()
  @ApiProperty()
  pagination?: PaginationDto = {
    page: 1,
    limit: 20
  }
}
