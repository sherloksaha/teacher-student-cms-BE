import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Class name is required' })
  @IsString({ message: 'Class name must be a string' })
  // @MinLength(2, { message: 'Class name must be at least 2 characters long' })
  name: string;
}
