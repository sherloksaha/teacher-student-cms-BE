import { Injectable, NotFoundException } from '@nestjs/common';
import { PostInterface } from './interfaces/post.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entities';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) { }


    async findAll(): Promise<PostEntity[]> {
        return this.postRepository.find();
    }

    async findOne(id: number): Promise<PostEntity> {
        const singlePost = await this.postRepository.findOneBy({ id });
        if (!singlePost) {
            throw new NotFoundException('Post not found')
        }
        return singlePost;
    }

    async createPost(createData: CreatePostDto): Promise<PostEntity> {
        const newPost = this.postRepository.create({
            title: createData.title,
            content: createData.content,
            authorName: createData.authorName
        })
        return this.postRepository.save(newPost);
    }

    async updatePost(id: number, updateData: UpdatePostDto): Promise<PostEntity> {
        const post = await this.findOne(id);

        if (post) {
            if (updateData?.authorName) {
                post.authorName = updateData?.authorName
            }
            if (updateData.content) {
                post.content = updateData?.content
            }
            if (updateData.title) {
                post.title = updateData?.title
            }
            return this.postRepository.save(post)
        } else {
            throw new NotFoundException('Post not found')
        }
    }
}
