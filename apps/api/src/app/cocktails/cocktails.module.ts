import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CocktailsService } from './cocktails.service';
import { CocktailsController } from './cocktails.controller';
import { Cocktail } from './entities/cocktail.entity';
import { CocktailIngredient } from './entities/cocktail-ingredient.entity';
import { Unit } from './entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cocktail, CocktailIngredient, Unit])],
  controllers: [CocktailsController],
  providers: [CocktailsService],
})
export class CocktailsModule {}
