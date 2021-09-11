import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrinksModule } from './drinks/drinks.module';
import { GlassesModule } from './glasses/glasses.module';
import { IngredientTypesModule } from './ingredient-types/ingredient-types.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { UnitsModule } from './units/units.module';
import { DrinkTagsModule } from './drink-tags/drink-tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev',
      password: 'dev',
      database: 'dev',
      synchronize: true,
      autoLoadEntities: true,
    }),
    DrinksModule,
    DrinkTagsModule,
    GlassesModule,
    IngredientsModule,
    IngredientTypesModule,
    UnitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
