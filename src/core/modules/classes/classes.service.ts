import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  buildResponseCreate,
  buildResponseDelete,
  buildResponseFind,
  buildResponseUpdate,
} from 'src/common/utils/response.util';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';

const entity = 'Class';
@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async findAll(): Promise<ApiResponse<Class[]>> {
    const classes = await this.classRepository.find({
      relations: {
        students: true,
        subjects: true,
      },
    });

    return buildResponseFind({
      entity,
      data: classes,
    });
  }

  async findOne(id: number): Promise<ApiResponse<Class>> {
    const classData = await this.classRepository.findOne({
      where: { id },
      relations: {
        students: true,
        subjects: true,
      },
    });

    if (!classData) {
      throw new NotFoundException('Class not found');
    }

    return buildResponseFind({
      entity,
      data: classData,
    });
  }

  async create(createClassDto: CreateClassDto): Promise<ApiResponse<Class>> {
    await this.checkNameExists(createClassDto.name);

    const newClass = this.classRepository.create({
      name: createClassDto.name,
    });

    const savedClass = await this.classRepository.save(newClass);

    return buildResponseCreate({
      entity,
      data: savedClass,
      statusCode: HttpStatus.CREATED,
    });
  }

  async update(
    id: number,
    updateClassDto: UpdateClassDto,
  ): Promise<ApiResponse<Class>> {
    const { data: classData } = await this.findOne(id);

    if (updateClassDto.name && updateClassDto.name !== classData.name) {
      await this.checkNameExists(updateClassDto.name);
      classData.name = updateClassDto.name;
    }

    const updatedClass = await this.classRepository.save(classData);

    return buildResponseUpdate({
      entity,
      data: updatedClass,
    });
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    const { data: classData } = await this.findOne(id);
    await this.classRepository.remove(classData);

    return buildResponseDelete({
      entity,
      data: null,
    });
  }

  private async checkNameExists(name: string): Promise<void> {
    const existingClass = await this.classRepository.findOne({
      where: { name },
    });

    if (existingClass) {
      throw new ConflictException('Class name already exists');
    }
  }

  async seedClasses() {
    try {
      const classes = ['KG', '1', '2', '3', '4', '4', '6', '7', '8', '9', '10'];

      // 1. Remove duplicates array side
      const uniqueClasses = [...new Set(classes)];

      // 2. Map strings into objects
      const classEntities = uniqueClasses.map((className) => ({
        name: className,
      }));

      // this.logger.log('Starting execution of class seed data insertion...');

      // 3. Execute batch database insert
      const result = await this.classRepository.upsert(classEntities, {
        conflictPaths: ['name'],
        skipUpdateIfNoValuesChanged: true,
      });

      // this.logger.log('Classes seeded and synchronized successfully!');
      return result;
    } catch (error) {
      // 4. Gracefully catch and log the specific database error
      // this.logger.error(
      //   `Failed to seed classes into the database. Reason: ${error.message}`,
      //   error.stack,
      // );

      // Optional: Rethrow the error if you want NestJS startup to explicitly fail
      // throw error;
    }
  }
}
