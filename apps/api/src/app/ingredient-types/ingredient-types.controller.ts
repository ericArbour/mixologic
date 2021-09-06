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

import { IngredientTypesService } from './ingredient-types.service';
import { CreateIngredientTypeDto } from './dto/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from './dto/update-ingredient-type.dto';
import { IngredientType } from './entities/ingredient-type.entity';

@Controller('ingredient-types')
export class IngredientTypesController {
  constructor(
    private readonly ingredientTypesService: IngredientTypesService
  ) {}

  @Post()
  create(@Body() createIngredientTypeDto: CreateIngredientTypeDto) {
    return this.ingredientTypesService.create(createIngredientTypeDto);
  }

  @Get()
  findAll() {
    return this.ingredientTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: IngredientType['id']) {
    return this.ingredientTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: IngredientType['id'],
    @Body() updateIngredientTypeDto: UpdateIngredientTypeDto
  ) {
    return this.ingredientTypesService.update(id, updateIngredientTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: IngredientType['id']) {
    return this.ingredientTypesService.remove(id);
  }
}
