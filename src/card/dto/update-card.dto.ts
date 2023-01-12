import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    type: String,
    description: 'Card name',
    example: 'optima-bankcard',
  })
  @IsString()
  @MinLength(10)
  card: string;
}
