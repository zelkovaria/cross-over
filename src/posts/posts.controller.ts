import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Delete,
  Headers,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Headers('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost(userId, createPostDto);
  }

  // @Get()
  // async read(@Query('page') page = 1) {
  //   return await this.postsService.paginate(page);
  // }
  // @Get()
  // findPage(@Query('limit') limit: number, @Query('page') page: number) {
  //   return this.postsService.findPage(limit, page);
  // }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: string, @Req() req) {
    this.postsService.findOne(id, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:postId')
  remove(@Param('postId') postId: string, @Req() req) {
    const { id } = req.user;
    return this.postsService.remove(id, postId);
    //jwt로 하면 userId없어짐
  }
}
