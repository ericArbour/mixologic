import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { Drink } from './entities/drink.entity';
import { DrinkIngredient } from './entities/drink-ingredient.entity';
import { DrinkTag } from '../drink-tags/entities/drink-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drink, DrinkIngredient, DrinkTag])],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
