import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateAreaDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Area name is required' })
  @IsString({ message: 'Area name must be a string' })
  @MinLength(2, { message: 'Area name must be at least 2 characters long' })
  name?: string;

  @IsOptional()
  @IsInt({ message: 'City id must be an integer' })
  @Min(1, { message: 'City id must be greater than 0' })
  cityId?: number;
}
