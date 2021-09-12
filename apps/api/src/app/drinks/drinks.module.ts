import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { Drink } from './entities/drink.entity';
import { DrinkIngredient } from './entities/drink-ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drink, DrinkIngredient])],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
