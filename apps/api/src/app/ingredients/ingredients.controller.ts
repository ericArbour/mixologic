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

import { IngredientsService } from './ingredients.service';
import {
  CreateIngredientDto,
  IngredientDto,
  UpdateIngredientDto,
} from '@mixologic/common';
import { Ingredient } from './entities/ingredient.entity';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('ingredients')
@Serialize(IngredientDto)
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Ingredient['id']) {
    return this.ingredientsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: Ingredient['id'],
    @Body() updateIngredientDto: UpdateIngredientDto
  ) {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: Ingredient['id']) {
    return this.ingredientsService.remove(id);
  }
}
