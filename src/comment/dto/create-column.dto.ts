import { IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    type: Number,
    description: 'Column ID',
    example: '1',
  })
  @IsNumber()
  cardId: number;

  @ApiProperty({
    type: String,
    description: 'Comment name',
    example: 'this_is_bad_comment',
  })
  @IsString()
  @MinLength(10)
  comment: string;
}
