import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UnitDto, CreateUnitDto, UpdateUnitDto } from '@mixologic/common';

import { Serialize } from '../interceptors/serialize.interceptor';
import { UnitsService } from './units.service';
import { Unit } from './entities/unit.entity';

@Controller('units')
@Serialize(UnitDto)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  findAll() {
    return this.unitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Unit['id']) {
    return this.unitsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: Unit['id'],
    @Body() updateUnitDto: UpdateUnitDto
  ) {
    return this.unitsService.update(id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: Unit['id']) {
    return this.unitsService.remove(id);
  }
}
