import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrinkTag } from '../drink-tags/entities/drink-tag.entity';

import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { DrinkIngredient } from './entities/drink-ingredient.entity';
import { Drink } from './entities/drink.entity';

@Injectable()
export class DrinksService {
  constructor(
    @InjectRepository(Drink)
    private drinkRepository: Repository<Drink>,
    @InjectRepository(DrinkIngredient)
    private drinkIngredientRepository: Repository<DrinkIngredient>,
    @InjectRepository(DrinkTag)
    private drinkTagRepository: Repository<DrinkTag>
  ) {}

  async create(createDrinkDto: CreateDrinkDto) {
    const drink = this.drinkRepository.create(createDrinkDto);

    const drinkTagOps = createDrinkDto.drinkTags.map(async (drinkTagDto) => {
      const existingDrinkTag = await this.drinkTagRepository.findOne({
        name: drinkTagDto.name,
      });

      if (existingDrinkTag) return existingDrinkTag;

      const drinkTag = this.drinkTagRepository.create(drinkTagDto);
      return await this.drinkTagRepository.save(drinkTag);
    });

    const savedDrinkTags = await Promise.all(drinkTagOps);
    drink.drinkTags = savedDrinkTags;

    const savedDrink = await this.drinkRepository.save(drink);

    const drinkIngredientOps = createDrinkDto.drinkIngredients.map(
      (drinkIngredientDto) => {
        const drinkIngredient = this.drinkIngredientRepository.create({
          ...drinkIngredientDto,
          drinkId: savedDrink.id,
        });

        return this.drinkIngredientRepository.save(drinkIngredient);
      }
    );

    const savedDrinkIngredients = await Promise.all(drinkIngredientOps);
    savedDrink.drinkIngredients = savedDrinkIngredients;

    return savedDrink;
  }

  findAll() {
    return this.drinkRepository.find();
  }

  findOne(id: Drink['id']) {
    return this.drinkRepository.findOne(id);
  }

  async update(id: Drink['id'], updateDrinkDto: UpdateDrinkDto) {
    const drink = await this.findOne(id);
    if (!drink) throw new NotFoundException('Drink not found');

    return this.drinkRepository.save({ ...drink, ...updateDrinkDto });
  }

  remove(id: Drink['id']) {
    return this.drinkRepository.softDelete(id);
  }
}
