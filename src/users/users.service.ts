import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new ConflictException('사용하실 수 없는 이메일입니다');
    }
    const user = await this.usersRepository.create({
      email,
      id,
      password,
    });
    //id 중복 확인하기
    await this.usersRepository.save(user);
    return user;
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }
}
