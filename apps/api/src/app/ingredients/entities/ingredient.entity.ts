import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { Base } from '../../base.entity';
import { CocktailIngredient } from '../../cocktails/entities/cocktail-ingredient.entity';
import { IngredientType } from '../../ingredient-types/entities/ingredient-type.entity';

@Entity()
export class Ingredient extends Base {
  @Column({ unique: true })
  name!: string;

  @Column()
  ingredientTypeId!: number;

  @ManyToOne(
    () => IngredientType,
    (ingredientType) => ingredientType.ingredients,
    { nullable: false }
  )
  ingredientType?: IngredientType;

  @OneToMany(
    () => CocktailIngredient,
    (cocktailIngredient) => cocktailIngredient.ingredient
  )
  cocktailIngredients?: CocktailIngredient[];
}
