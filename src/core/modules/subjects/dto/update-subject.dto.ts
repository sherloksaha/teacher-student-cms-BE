import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString({ message: 'Subject name must be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Subject code must be a string' })
  subjectCode?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Class ID must be a number' })
  classId?: number;
}
