import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty({ message: 'City name is required' })
  @IsString({ message: 'City name must be a string' })
  @MinLength(2, { message: 'City name must be at least 2 characters long' })
  name: string;

  @IsNotEmpty({ message: 'State id is required' })
  @IsInt({ message: 'State id must be an integer' })
  @Min(1, { message: 'State id must be greater than 0' })
  stateId: number;
}
