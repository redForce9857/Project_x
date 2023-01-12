import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    type: String,
    description: 'Access Token',
    example:
      'wqefwasbjhfvbluawek2345675746353rweqdsahggkt54iwu8q7tygdu2345igru8dyvh',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'Refresh Token',
    example:
      'wqefwasbjhfvbluawek2345675746353rweqdsahggkt54iwu8q7tygdu2345igru8dyvh',
  })
  @IsString()
  refreshToken: string;
}
