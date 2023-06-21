import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  // users: User[] = [];
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: SignupDto) {
    const { email, id, password } = createUserDto;
    const exist = await this.usersRepository.findOneBy({ email: email });
    if (exist) {
      throw new ConflictException('사용하실 수 없는 아이디입니다');
    }
    const user = await this.usersRepository.create({
      email,
      id,
      password,
    });
    await this.usersRepository.save(user);
    return user;
  }
}
