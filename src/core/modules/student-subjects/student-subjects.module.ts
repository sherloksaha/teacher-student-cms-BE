import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSubjectsService } from './student-subjects.service';
import { StudentSubjectsController } from './student-subjects.controller';
import { StudentSubject } from '../users/entities/student-subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSubject])],
  controllers: [StudentSubjectsController],
  providers: [StudentSubjectsService],
  exports: [StudentSubjectsService],
})
export class StudentSubjectsModule {}
