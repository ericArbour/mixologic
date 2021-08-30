import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CocktailsModule } from './cocktails/cocktails.module';
import { GlassesModule } from './glasses/glasses.module';
import { IngredientTypesModule } from './ingredient-types/ingredient-types.module';
import { IngredientsModule } from './ingredients/ingredients.module';

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
    CocktailsModule,
    GlassesModule,
    IngredientsModule,
    IngredientTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
