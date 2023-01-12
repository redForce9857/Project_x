import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    type: String,
    description: 'Your Name',
    example: 'Stepan',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Your Email',
    example: 'stepan@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Your Password',
    example: '123456Aplle',
  })
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
