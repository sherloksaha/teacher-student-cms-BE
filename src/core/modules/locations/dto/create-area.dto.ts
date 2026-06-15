import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateAreaDto {
  @IsNotEmpty({ message: 'Area name is required' })
  @IsString({ message: 'Area name must be a string' })
  @MinLength(2, { message: 'Area name must be at least 2 characters long' })
  name: string;

  @IsNotEmpty({ message: 'City id is required' })
  @IsInt({ message: 'City id must be an integer' })
  @Min(1, { message: 'City id must be greater than 0' })
  cityId: number;

  @IsNotEmpty({ message: 'zip id is required' })
  @IsInt({ message: 'zip id must be an integer' })
  zip: number
}
