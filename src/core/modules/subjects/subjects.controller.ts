import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { RoleGuard } from '../auth/guard/roles-gauards';
import { UserRole } from '../auth/constant';
import { Roles } from '../auth/decorators/roles.decorators';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.STUDENT, UserRole.TEACHER, UserRole.SUPER_ADMIN)
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.STUDENT, UserRole.TEACHER, UserRole.SUPER_ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.STUDENT, UserRole.TEACHER, UserRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }
}
