import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth_login.dto';
import { RegisterUserDto } from './dto/auth_register_user.dto';
import { RefreshTokenDto } from './dto/auth_refresh_token.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Post('refresh')
  // async refreshToken(@Body() body: RefreshTokenDto): Promise<any> {
  //   return this.authService.refresh(body.refreshToken);
  // }
}
