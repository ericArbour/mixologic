import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIngredientTypeDto } from './dto/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from './dto/update-ingredient-type.dto';
import { IngredientType } from './entities/ingredient-type.entity';

@Injectable()
export class IngredientTypesService {
  constructor(
    @InjectRepository(IngredientType)
    private repository: Repository<IngredientType>
  ) {}

  create(createIngredientTypeDto: CreateIngredientTypeDto) {
    const ingredientType = this.repository.create(createIngredientTypeDto);
    return this.repository.save(ingredientType);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateIngredientTypeDto: UpdateIngredientTypeDto) {
    const ingredientType = await this.findOne(id);
    if (!ingredientType)
      throw new NotFoundException('Ingredient Type not found');

    return this.repository.save({
      ...ingredientType,
      ...updateIngredientTypeDto,
    });
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
