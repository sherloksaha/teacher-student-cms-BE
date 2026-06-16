import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';
import { JwtAuthGuard } from 'src/core/modules/auth/guard/jwt-aut.guard';
import { RoleGuard } from 'src/core/modules/auth/guard/roles-gauards';
import { UserRole } from 'src/core/modules/auth/constant';
import { Roles } from 'src/core/modules/auth/decorators/roles.decorators';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async findAll(
    @Query('search') search?: string,
  ): Promise<ApiResponse<Class[]>> {
    const response = await this.classesService.findAll();

    if (search) {
      return {
        ...response,
        message: 'Classes searched successfully',
        data: response.data.filter((classData) =>
          classData.name.toLowerCase().includes(search.toLowerCase()),
        ),
      };
    }

    return response;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Class>> {
    return this.classesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post('create')
  create(@Body() createClassDto: CreateClassDto): Promise<ApiResponse<Class>> {
    return this.classesService.create(createClassDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<ApiResponse<Class>> {
    return this.classesService.update(id, updateClassDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post('seed')
  async seed() {
    await this.classesService.seedClasses();
    return { message: 'Database seeding completed!' };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    return this.classesService.remove(id);
  }
}
