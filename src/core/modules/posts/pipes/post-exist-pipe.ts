import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PostsService } from "../posts.service";

@Injectable()
export class PostExistPipe implements PipeTransform {
    constructor(private readonly postsService: PostsService) { }

    transform(value: number, metadata: ArgumentMetadata) {
        // if (typeof value !== 'string') {
        //     throw new BadRequestException(`Validation failed. Expected a string for argument: ${metadata.data}`);
        // }
        try {
            this.postsService.findOne(value)
        } catch (e) {
            throw new NotFoundException('Post not found')
        }
        // Transform the input value
        // return value.trim().toLowerCase();
        return value;
    }
}