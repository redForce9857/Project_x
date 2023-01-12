import { IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({
    type: Number,
    description: 'Column ID',
    example: '1',
  })
  @IsNumber()
  columnId: number;

  @ApiProperty({
    type: String,
    description: 'Card name',
    example: 'optima-bankcard',
  })
  @IsString()
  @MinLength(10)
  card: string;
}
