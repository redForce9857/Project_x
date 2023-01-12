import { IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({
    type: Number,
    description: 'Column ID',
    example: '1',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    type: String,
    description: 'Column name',
    example: 'column_number_one',
  })
  @IsString()
  @MinLength(10)
  column: string;
}
