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

import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@mixologic/common';

import { Serialize } from '../interceptors/serialize.interceptor';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Controller('categories')
@Serialize(CategoryDto)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Category['id']) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: Category['id'],
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: Category['id']) {
    return this.categoriesService.remove(id);
  }
}
