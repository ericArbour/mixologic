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

import { DrinkDto, CreateDrinkDto, UpdateDrinkDto } from '@mixologic/common';

import { DrinksService } from './drinks.service';
import { Drink } from './entities/drink.entity';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('drinks')
@Serialize(DrinkDto)
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  create(@Body() createDrinkDto: CreateDrinkDto) {
    return this.drinksService.create(createDrinkDto);
  }

  @Get()
  findAll() {
    return this.drinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Drink['id']) {
    return this.drinksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: Drink['id'],
    @Body() updateDrinkDto: UpdateDrinkDto
  ) {
    return this.drinksService.update(id, updateDrinkDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: Drink['id']) {
    return this.drinksService.remove(id);
  }
}
