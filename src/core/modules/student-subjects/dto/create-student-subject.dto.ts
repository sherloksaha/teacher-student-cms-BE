import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentSubjectDto {
  @IsNotEmpty({ message: 'Student ID is required' })
  @IsNumber({}, { message: 'Student ID must be a number' })
  studentId: number;

  @IsNotEmpty({ message: 'Subject ID is required' })
  @IsNumber({}, { message: 'Subject ID must be a number' })
  subjectId: number;
}
