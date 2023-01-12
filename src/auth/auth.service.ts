import {
  BadRequestException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/auth_login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/auth_tokens.dto';
import { RegisterUserDto } from './dto/auth_register_user.dto';
import { sign, verify } from 'jsonwebtoken';
import RefreshToken from './entities/refresh.entity';
import { hash, compare } from 'bcrypt';

export class AuthService {
  private refreshTokens: RefreshToken[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        `Не найден по id = ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async register({
    username,
    email,
    password,
  }: RegisterUserDto): Promise<TokensDto> {
    const encodedPassword = { password: (await hash(password, 10)) as string };
    const user = await this.create({
      username,
      email,
      ...encodedPassword,
    });
    return this.createTokens({ id: user.id, role: user.role });
  }
  async create(registerDto: RegisterUserDto): Promise<UserEntity> {
    await this.checkUserExist(registerDto.email);

    const user = this.userRepository.create(registerDto);
    return this.userRepository.save(user);
  }
  async checkUserExist(email: string): Promise<void> {
    const existedUser = await this.userRepository.findOneBy({
      email: email,
    });

    if (existedUser) {
      throw new UnprocessableEntityException(
        'Пользователь с таким номером или email уже создан',
      );
    }
  }

  async login(loginDto: LoginDto): Promise<TokensDto> {
    const user = await this.validateUser(loginDto);
    return this.createTokens(user);
  }

  async createTokens({ id, role }: any): Promise<{ accessToken: string; user: UserEntity; refreshToken: string }> {
    const user = await this.userRepository.findOneBy({ id: id });
    const accessToken = this.jwtService.sign(
      { id, role, type: 'accessToken' },
      { expiresIn: '2h', secret: process.env.JWT_SECRET },
    );
    const refreshToken = this.jwtService.sign(
      { id, role, type: 'refreshToken' },
      { expiresIn: '10d', secret: process.env.JWT_SECRET },
    );

    return { accessToken, refreshToken, user };
  }

  async validateUser({ email, password }: LoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      throw new BadRequestException('Wrong input values');
    }

    const isPasswordMatched = await compare(password, user.password);
    if (!isPasswordMatched) {
      throw new BadRequestException('Password is not correct');
    }
    delete user.password;

    return user;
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      throw new UnauthorizedException('no refresh token');
    }

    const user = await this.getById(Number(refreshToken.userId));
    if (!user) {
      throw new UnauthorizedException('пользователь не найден');
    }

    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.JWT_SECRET);
      if (typeof decoded === 'string') {
        throw new UnauthorizedException();
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (e) {
      throw new UnauthorizedException('JWT Error: ' + e.message);
    }
  }
}
