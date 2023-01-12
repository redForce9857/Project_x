import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    description: 'Access Token',
    example:
      'wqefwasbjhfvbluawek2345675746353rweqdsahggkt54iwu8q7tygdu2345igru8dyvh',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
