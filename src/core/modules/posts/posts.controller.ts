import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PostExistPipe } from './pipes/post-exist-pipe';
import { PostEntity } from './entities/posts.entities';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  async findAll(@Query('search') search?: string): Promise<PostEntity[]> {
    const data = await this.postsService.findAll();
    if (search) {
      return data?.filter((post) => post.title.includes(search));
    }
    return data;
  }

  @Post('')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
    }),
  )
  create(@Body() createPostData: CreatePostDto):Promise<PostEntity> {
    return this.postsService.createPost(createPostData)
    // Implementation for creating a new post
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePostData: UpdatePostDto): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatePostData);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe, PostExistPipe) id: number): Promise<PostEntity> {
    return this.postsService.findOne(id)
  }
}
