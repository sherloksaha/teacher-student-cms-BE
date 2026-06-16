import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StudentSubjectsService } from './student-subjects.service';
import { CreateStudentSubjectDto } from './dto/create-student-subject.dto';
import { UpdateStudentSubjectDto } from './dto/update-student-subject.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { RoleGuard } from '../auth/guard/roles-gauards';
import { UserRole } from '../auth/constant';
import { Roles } from '../auth/decorators/roles.decorators';

@Controller('student-subjects')
export class StudentSubjectsController {
  constructor(private readonly studentSubjectsService: StudentSubjectsService) { }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  create(@Body() createDto: CreateStudentSubjectDto) {
    return this.studentSubjectsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.studentSubjectsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get(':studentId/:subjectId')
  findOne(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number
  ) {
    return this.studentSubjectsService.findOne(studentId, subjectId);
  }


  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Put(':studentId/:subjectId')
  update(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Body() updateDto: UpdateStudentSubjectDto
  ) {
    return this.studentSubjectsService.update(studentId, subjectId, updateDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':studentId/:subjectId')
  remove(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number
  ) {
    return this.studentSubjectsService.remove(studentId, subjectId);
  }
}
