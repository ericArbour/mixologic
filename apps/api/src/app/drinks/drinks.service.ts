import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { DrinkIngredient } from './entities/drink-ingredient.entity';
import { Drink } from './entities/drink.entity';

@Injectable()
export class DrinksService {
  constructor(
    @InjectRepository(Drink)
    private drinkRepository: Repository<Drink>,
    private connection: Connection
  ) {}

  async create(createDrinkDto: CreateDrinkDto) {
    return await this.connection.transaction(async (manager) => {
      const drink = manager.create(Drink, createDrinkDto);
      const savedDrink = await manager.save(drink);

      const drinkIngredientOps = createDrinkDto.drinkIngredients.map(
        (drinkIngredientDto) => {
          const drinkIngredient = manager.create(DrinkIngredient, {
            ...drinkIngredientDto,
            drinkId: savedDrink.id,
          });

          return manager.save(drinkIngredient);
        }
      );

      const savedDrinkIngredients = await Promise.all(drinkIngredientOps);
      savedDrink.drinkIngredients = savedDrinkIngredients;

      return savedDrink;
    });
  }

  findAll() {
    return this.drinkRepository.find();
  }

  findOne(id: Drink['id']) {
    return this.drinkRepository.findOne(id);
  }

  async update(id: Drink['id'], updateDrinkDto: UpdateDrinkDto) {
    return await this.connection.transaction(async (manager) => {
      const drink = await manager.findOne(Drink, id);

      if (!drink) throw new NotFoundException('Drink not found');

      const newDrink = { ...drink, ...updateDrinkDto };

      return manager.save(Drink, newDrink);
    });
  }

  remove(id: Drink['id']) {
    return this.drinkRepository.softDelete(id);
  }
}
