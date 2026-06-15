import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'Subject name is required' })
  @IsString({ message: 'Subject name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Subject code is required' })
  @IsString({ message: 'Subject code must be a string' })
  subjectCode: string;

  @IsOptional()
  @IsNumber({}, { message: 'Class ID must be a number' })
  classId?: number;
}
