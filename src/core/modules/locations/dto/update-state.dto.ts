import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateStateDto {
  @IsOptional()
  @IsNotEmpty({ message: 'State name is required' })
  @IsString({ message: 'State name must be a string' })
  @MinLength(2, { message: 'State name must be at least 2 characters long' })
  name?: string;
}
