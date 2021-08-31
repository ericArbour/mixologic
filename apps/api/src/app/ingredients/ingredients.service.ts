import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private repository: Repository<Ingredient>
  ) {}

  create(createIngredientDto: CreateIngredientDto) {
    const ingredient = this.repository.create(createIngredientDto);
    return this.repository.save(ingredient);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.findOne(id);
    if (!ingredient) throw new NotFoundException('Ingredient not found');

    return this.repository.save({ ...ingredient, ...updateIngredientDto });
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
