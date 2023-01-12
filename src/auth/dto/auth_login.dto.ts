import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
  @IsString()
  @IsNotEmpty()
  password: string;
}
