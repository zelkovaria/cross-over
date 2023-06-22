import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  async findOne(id: string, userId?: string) {
    const post = await this.postsRepository.findOne({ where: { postId: id } });
    if (!post) {
      throw new NotFoundException('해당 아이디를 가진 글 없음 인간아');
    }

    if (userId) {
      return {
        ...post,
        isMine: post.user.id === userId,
      };
    }

    return post;
  }

  async createPost(userId: string, createPostDto: CreatePostDto) {
    if (!userId) {
      throw new UnauthorizedException('로그인 안하셨잖아요');
    }

    const user = await this.usersService.findOne(userId);

    const { postTitle, content } = createPostDto;
    const post = await this.postsRepository.create({
      postTitle,
      content,
      user,
    });
    await this.postsRepository.save(post);
  }

  async findAll(userId?: string) {
    if (userId) {
      return await this.postsRepository.find({
        relations: ['user'],
        where: { user: { id: userId } },
      }); // 필터링한 값 반환
    }
    return await this.postsRepository.find({
      relations: ['user'],
    }); //page도 받아서(컨트롤러->서비스 -> postRepository에서 페이지 몇번부터 몇번까지 어떻게 가져오는지 확인)
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId);
    await this.postsRepository.delete(id);
  }
}
