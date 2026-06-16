import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/posts.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    // This will make the the post repository available for injection
    TypeOrmModule.forFeature([PostEntity])
  ]
})
export class PostsModule {}
