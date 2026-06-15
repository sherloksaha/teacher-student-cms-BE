import { IsNumber, IsOptional } from 'class-validator';

export class UpdateStudentSubjectDto {
  @IsOptional()
  @IsNumber({}, { message: 'Student ID must be a number' })
  studentId?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Subject ID must be a number' })
  subjectId?: number;
}
