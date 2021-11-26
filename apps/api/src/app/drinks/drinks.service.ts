import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CreateDrinkDto, UpdateDrinkDto } from '@mixologic/common';
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
    return this.drinkRepository.find({
      relations: [
        'drinkIngredients',
        'drinkIngredients.ingredient',
        'drinkIngredients.unit',
        'glass',
      ],
    });
  }

  findOne(id: Drink['id']) {
    return this.drinkRepository.findOne(id, {
      relations: [
        'drinkIngredients',
        'drinkIngredients.ingredient',
        'drinkIngredients.unit',
        'glass',
      ],
    });
  }

  async update(id: Drink['id'], updateDrinkDto: UpdateDrinkDto) {
    return await this.connection.transaction(async (manager) => {
      const drink = await manager.findOne(Drink, id, {
        relations: [
          'drinkIngredients',
          'drinkIngredients.ingredient',
          'drinkIngredients.unit',
          'glass',
        ],
      });

      if (!drink) throw new NotFoundException('Drink not found');

      const {
        drinkIngredients: updateDrinkIngredients,
        ...restUpdateDrinkDto
      } = updateDrinkDto;
      const { drinkIngredients, ...restDrink } = drink;
      const newDrink = {
        ...restDrink,
        ...restUpdateDrinkDto,
      };

      const savedDrink = await manager.save(Drink, newDrink);

      if (updateDrinkIngredients) {
        drinkIngredients?.forEach((drinkIngredient) => {
          manager.delete(DrinkIngredient, drinkIngredient.id);
        });
      }

      const drinkIngredientOps = updateDrinkIngredients?.map(
        (drinkIngredientDto) => {
          const drinkIngredient = manager.create(DrinkIngredient, {
            ...drinkIngredientDto,
            drinkId: drink.id,
          });

          return manager.save(drinkIngredient);
        }
      );

      const savedDrinkIngredients =
        drinkIngredientOps && (await Promise.all(drinkIngredientOps));

      savedDrink.drinkIngredients = savedDrinkIngredients ?? drinkIngredients;

      return savedDrink;
    });
  }

  remove(id: Drink['id']) {
    return this.drinkRepository.softDelete(id);
  }
}
