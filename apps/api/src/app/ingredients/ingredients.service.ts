import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIngredientDto, UpdateIngredientDto } from '@mixologic/common';
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
    return this.repository.find({
      relations: ['categories'],
    });
  }

  findOne(id: Ingredient['id']) {
    return this.repository.findOne(id, {
      relations: ['categories', 'satisfiesIngredients'],
    });
  }

  async update(id: Ingredient['id'], updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.findOne(id);
    if (!ingredient) throw new NotFoundException('Ingredient not found');

    return this.repository.save({ ...ingredient, ...updateIngredientDto });
  }

  remove(id: Ingredient['id']) {
    return this.repository.softDelete(id);
  }
}
