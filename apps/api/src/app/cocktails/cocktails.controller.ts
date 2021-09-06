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

import { CocktailsService } from './cocktails.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { Cocktail } from './entities/cocktail.entity';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  create(@Body() createCocktailDto: CreateCocktailDto) {
    return this.cocktailsService.create(createCocktailDto);
  }

  @Get()
  findAll() {
    return this.cocktailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Cocktail['id']) {
    return this.cocktailsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: Cocktail['id'],
    @Body() updateCocktailDto: UpdateCocktailDto
  ) {
    return this.cocktailsService.update(id, updateCocktailDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: Cocktail['id']) {
    return this.cocktailsService.remove(id);
  }
}
