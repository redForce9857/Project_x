import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnDto } from './create-column.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateColumnDto {
  @ApiProperty({
    type: String,
    description: 'Column name',
    example: 'column_number_one',
  })
  @IsString()
  @MinLength(10)
  column: string;
}
