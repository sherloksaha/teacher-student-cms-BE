import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const payload: DeepPartial<Subject> = {
      name: createSubjectDto.name,
      subjectCode: createSubjectDto.subjectCode,
    };
    
    if (createSubjectDto.classId) {
      payload.class = { id: createSubjectDto.classId } as any;
    }

    const subject = this.subjectRepository.create(payload);
    return await this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find({
      relations: { class: true },
    });
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: { class: true },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);
    
    if (updateSubjectDto.name) subject.name = updateSubjectDto.name;
    if (updateSubjectDto.subjectCode) subject.subjectCode = updateSubjectDto.subjectCode;
    if (updateSubjectDto.classId !== undefined) {
      subject.class = updateSubjectDto.classId ? { id: updateSubjectDto.classId } as any : null;
    }

    return await this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    const subject = await this.findOne(id);
    await this.subjectRepository.remove(subject);
  }
}
