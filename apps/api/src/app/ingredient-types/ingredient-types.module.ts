import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientTypesService } from './ingredient-types.service';
import { IngredientTypesController } from './ingredient-types.controller';
import { IngredientType } from './entities/ingredient-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientType])],
  controllers: [IngredientTypesController],
  providers: [IngredientTypesService],
})
export class IngredientTypesModule {}
