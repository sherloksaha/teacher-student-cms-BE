import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { buildResponseCreate, buildResponseDelete, buildResponseFind, buildResponseUpdate } from 'src/common/utils/response.util';
import { Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { Area } from './entities/area.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';


@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async findAllStates(): Promise<ApiResponse<State[]>> {
    const states = await this.stateRepository.find({
      relations: {
        cities: true,
      },
    });

    return buildResponseFind({
      entity: 'States',
      data: states,
    });
  }

  async findOneState(id: number): Promise<ApiResponse<State>> {
    const state = await this.stateRepository.findOne({
      where: { id },
      relations: {
        cities: true,
      },
    });

    if (!state) {
      throw new NotFoundException('State not found');
    }

    return buildResponseFind({
      entity: 'State',
      data: state,
    });
  }

  async createState(
    createStateDto: CreateStateDto,
  ): Promise<ApiResponse<State>> {
    await this.checkStateNameExists(createStateDto.name);

    const state = this.stateRepository.create({
      name: createStateDto.name,
    });
    const savedState = await this.stateRepository.save(state);

    return buildResponseCreate({
      entity: 'State',
      data: savedState,
      statusCode: HttpStatus.CREATED,
    });
  }

  async updateState(
    id: number,
    updateStateDto: UpdateStateDto,
  ): Promise<ApiResponse<State>> {
    const { data: state } = await this.findOneState(id);

    if (updateStateDto.name && updateStateDto.name !== state.name) {
      await this.checkStateNameExists(updateStateDto.name);
      state.name = updateStateDto.name;
    }

    const updatedState = await this.stateRepository.save(state);

    return buildResponseUpdate({
      entity: 'State',
      data: updatedState,
    });
  }

  async removeState(id: number): Promise<ApiResponse<null>> {
    const { data: state } = await this.findOneState(id);
    await this.stateRepository.remove(state);

    return buildResponseDelete({
      entity: 'State',
      data: null,
    });
  }

  async findAllCities(): Promise<ApiResponse<City[]>> {
    const cities = await this.cityRepository.find({
      relations: {
        state: true,
        areas: true,
      },
    });

    return buildResponseFind({
      entity: 'Cities',
      data: cities,
    });
  }

  async findOneCity(id: number): Promise<ApiResponse<City>> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: {
        state: true,
        areas: true,
      },
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return buildResponseFind({
      entity: 'City',
      data: city,
    });
  }

  async createCity(createCityDto: CreateCityDto): Promise<ApiResponse<City>> {
    const { data: state } = await this.findOneState(createCityDto.stateId);
    await this.checkCityNameExists(createCityDto.name, state.id);

    const city = this.cityRepository.create({
      name: createCityDto.name,
      state,
    });
    const savedCity = await this.cityRepository.save(city);

    return buildResponseCreate({
      entity: 'City',
      data: savedCity,
      statusCode: HttpStatus.CREATED,
    });
  }

  async updateCity(
    id: number,
    updateCityDto: UpdateCityDto,
  ): Promise<ApiResponse<City>> {
    const { data: city } = await this.findOneCity(id);
    const state =
      updateCityDto.stateId !== undefined
        ? (await this.findOneState(updateCityDto.stateId)).data
        : city.state;
    const name = updateCityDto.name ?? city.name;

    if (name !== city.name || state.id !== city.state.id) {
      await this.checkCityNameExists(name, state.id, city.id);
    }

    city.name = name;
    city.state = state;

    const updatedCity = await this.cityRepository.save(city);

    return buildResponseUpdate({
      entity: 'City',
      data: updatedCity,
    });
  }

  async removeCity(id: number): Promise<ApiResponse<null>> {
    const { data: city } = await this.findOneCity(id);
    await this.cityRepository.remove(city);

    return buildResponseDelete({
      entity: 'City',
      data: null,
    });
  }

  async findAllAreas(): Promise<ApiResponse<Area[]>> {
    const areas = await this.areaRepository.find({
      relations: {
        city: {
          state: true,
        },
      },
    });

    return buildResponseFind({
      entity: 'Areas',
      data: areas,
    });
  }

  async findOneArea(id: number): Promise<ApiResponse<Area>> {
    const area = await this.areaRepository.findOne({
      where: { id },
      relations: {
        city: {
          state: true,
        },
      },
    });

    if (!area) {
      throw new NotFoundException('Area not found');
    }

    return buildResponseFind({
      entity: 'Area',
      data: area,
    });
  }

  async createArea(createAreaDto: CreateAreaDto): Promise<ApiResponse<Area>> {
    const { data: city } = await this.findOneCity(createAreaDto.cityId);
    await this.checkAreaNameExists(createAreaDto.name, city.id);

    const area = this.areaRepository.create({
      name: createAreaDto.name,
      city,
    });
    const savedArea = await this.areaRepository.save(area);

    return buildResponseCreate({
      entity: 'Area',
      data: savedArea,
      statusCode: HttpStatus.CREATED,
    });
  }

  async updateArea(
    id: number,
    updateAreaDto: UpdateAreaDto,
  ): Promise<ApiResponse<Area>> {
    const { data: area } = await this.findOneArea(id);
    const city =
      updateAreaDto.cityId !== undefined
        ? (await this.findOneCity(updateAreaDto.cityId)).data
        : area.city;
    const name = updateAreaDto.name ?? area.name;

    if (name !== area.name || city.id !== area.city.id) {
      await this.checkAreaNameExists(name, city.id, area.id);
    }

    area.name = name;
    area.city = city;

    const updatedArea = await this.areaRepository.save(area);

    return buildResponseUpdate({
      entity: 'Area',
      data: updatedArea,
    });
  }

  async removeArea(id: number): Promise<ApiResponse<null>> {
    const { data: area } = await this.findOneArea(id);
    await this.areaRepository.remove(area);

    return buildResponseDelete({
      entity: 'Area',
      data: null,
    });
  }

  private async checkStateNameExists(
    name: string,
    currentStateId?: number,
  ): Promise<void> {
    const existingState = await this.stateRepository.findOne({
      where: { name },
    });

    if (existingState && existingState.id !== currentStateId) {
      throw new ConflictException('State name already exists');
    }
  }

  private async checkCityNameExists(
    name: string,
    stateId: number,
    currentCityId?: number,
  ): Promise<void> {
    const existingCity = await this.cityRepository.findOne({
      where: {
        name,
        state: { id: stateId },
      },
      relations: {
        state: true,
      },
    });

    if (existingCity && existingCity.id !== currentCityId) {
      throw new ConflictException('City name already exists in this state');
    }
  }

  private async checkAreaNameExists(
    name: string,
    cityId: number,
    currentAreaId?: number,
  ): Promise<void> {
    const existingArea = await this.areaRepository.findOne({
      where: {
        name,
        city: { id: cityId },
      },
      relations: {
        city: true,
      },
    });

    if (existingArea && existingArea.id !== currentAreaId) {
      throw new ConflictException('Area name already exists in this city');
    }
  }
}
