import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignupDto) {
    return await this.usersService.create(signUpDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneById(loginDto.id);
    if (loginDto.password !== user.password) {
      throw new UnauthorizedException(
        '비밀번호를 잘못입력하셨습니다. 다시 입력해주세요.',
      );
    }
    return this.jwtService.sign({
      id: user.id,
    }); //-> jwt
  }
}
