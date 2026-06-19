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
import { CreateAreaDto } from './dto/create-area.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { Area } from './entities/area.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from 'src/core/modules/auth/guard/jwt-aut.guard';
import { RoleGuard } from 'src/core/modules/auth/guard/roles-gauards';
import { UserRole } from 'src/core/modules/auth/constant';
import { Roles } from 'src/core/modules/auth/decorators/roles.decorators';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Get('states')
  async findAllStates(
    @Query('search') search?: string,
  ): Promise<ApiResponse<State[]>> {
    const response = await this.locationsService.findAllStates();

    if (search) {
      return {
        ...response,
        message: 'States searched successfully',
        data: response.data.filter((state) =>
          state.name.toLowerCase().includes(search.toLowerCase()),
        ),
      };
    }

    return response;
  }

  @Get('states/:id')
  findOneState(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<State>> {
    return this.locationsService.findOneState(id);
  }

  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserRole.SUPER_ADMIN)
  @Post('states')
  createState(
    @Body() createStateDto: CreateStateDto,
  ): Promise<ApiResponse<State>> {
    return this.locationsService.createState(createStateDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Put('states/:id')
  updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStateDto: UpdateStateDto,
  ): Promise<ApiResponse<State>> {
    return this.locationsService.updateState(id, updateStateDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Delete('states/:id')
  removeState(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<null>> {
    return this.locationsService.removeState(id);
  }

  @Get('cities')
  async findAllCities(
    @Query('search') search?: string,
  ): Promise<ApiResponse<City[]>> {
    const response = await this.locationsService.findAllCities();

    if (search) {
      return {
        ...response,
        message: 'Cities searched successfully',
        data: response.data.filter((city) =>
          city.name.toLowerCase().includes(search.toLowerCase()),
        ),
      };
    }

    return response;
  }

  @Get('cities/:id')
  findOneCity(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<City>> {
    return this.locationsService.findOneCity(id);
  }

  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserRole.SUPER_ADMIN)
  @Post('cities')
  createCity(@Body() createCityDto: CreateCityDto): Promise<ApiResponse<City>> {
    return this.locationsService.createCity(createCityDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Put('cities/:id')
  updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<ApiResponse<City>> {
    return this.locationsService.updateCity(id, updateCityDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Delete('cities/:id')
  removeCity(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<null>> {
    return this.locationsService.removeCity(id);
  }

  @Get('areas')
  async findAllAreas(
    @Query('search') search?: string,
    @Query('cityId') cityId?: string,
  ): Promise<ApiResponse<Area[]>> {
    const response = await this.locationsService.findAllAreas({
      cityId: cityId ? parseInt(cityId) : undefined,
      search,
    });

    if (search) {
      return {
        ...response,
        message: 'Areas searched successfully',
        data: response.data.filter((area) =>
          area.name.toLowerCase().includes(search.toLowerCase()),
        ),
      };
    }

    return response;
  }

  @Get('areas/:id')
  findOneArea(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Area>> {
    return this.locationsService.findOneArea(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post('areas')
  createArea(@Body() createAreaDto: CreateAreaDto): Promise<ApiResponse<Area>> {
    return this.locationsService.createArea(createAreaDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Put('areas/:id')
  updateArea(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ): Promise<ApiResponse<Area>> {
    return this.locationsService.updateArea(id, updateAreaDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Delete('areas/:id')
  removeArea(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<null>> {
    return this.locationsService.removeArea(id);
  }
}
