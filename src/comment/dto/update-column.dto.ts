import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    type: String,
    description: 'Comment name',
    example: 'this_is_bad_comment',
  })
  @IsString()
  @MinLength(10)
  comment: string;
}
