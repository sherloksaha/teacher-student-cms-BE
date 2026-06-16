import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { StudentSubject } from '../users/entities/student-subject.entity';
import { CreateStudentSubjectDto } from './dto/create-student-subject.dto';
import { UpdateStudentSubjectDto } from './dto/update-student-subject.dto';

@Injectable()
export class StudentSubjectsService {
  constructor(
    @InjectRepository(StudentSubject)
    private readonly studentSubjectRepository: Repository<StudentSubject>,
  ) {}

  async create(createDto: CreateStudentSubjectDto): Promise<StudentSubject> {
    const payload: DeepPartial<StudentSubject> = {
      studentId: createDto.studentId,
      subjectId: createDto.subjectId,
    };
    const studentSubject = this.studentSubjectRepository.create(payload);
    return await this.studentSubjectRepository.save(studentSubject);
  }

  async findAll(): Promise<StudentSubject[]> {
    return await this.studentSubjectRepository.find({
      relations: { student: true, subject: true },
    });
  }

  async findOne(studentId: number, subjectId: number): Promise<StudentSubject> {
    const studentSubject = await this.studentSubjectRepository.findOne({
      where: { studentId, subjectId },
      relations: { student: true, subject: true },
    });
    if (!studentSubject) {
      throw new NotFoundException(`StudentSubject record not found`);
    }
    return studentSubject;
  }

  // Update operation is not standard for a junction table using composite primary keys
  // It's typically better to remove the old record and create a new one.
  // But we provide a dummy placeholder per the DTO.
  async update(studentId: number, subjectId: number, updateDto: UpdateStudentSubjectDto): Promise<StudentSubject> {
    const studentSubject = await this.findOne(studentId, subjectId);
    
    // In TypeORM, updating primary keys directly on an entity can be tricky.
    // We would delete and insert if keys changed, or just save if there were other columns.
    if (updateDto.studentId) studentSubject.studentId = updateDto.studentId;
    if (updateDto.subjectId) studentSubject.subjectId = updateDto.subjectId;

    return await this.studentSubjectRepository.save(studentSubject);
  }

  async remove(studentId: number, subjectId: number): Promise<void> {
    const studentSubject = await this.findOne(studentId, subjectId);
    await this.studentSubjectRepository.remove(studentSubject);
  }
}
