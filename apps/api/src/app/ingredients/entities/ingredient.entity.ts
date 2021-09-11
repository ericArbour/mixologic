import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { DrinkIngredient } from '../../drinks/entities/drink-ingredient.entity';
import { IngredientType } from '../../ingredient-types/entities/ingredient-type.entity';

@Entity()
export class Ingredient extends Base {
  @Column({ type: 'citext', unique: true })
  name!: string;

  @Column()
  ingredientTypeId!: IngredientType['id'];

  @ManyToOne(
    () => IngredientType,
    (ingredientType) => ingredientType.ingredients,
    { nullable: false }
  )
  ingredientType?: IngredientType;

  @OneToMany(
    () => DrinkIngredient,
    (drinkIngredient) => drinkIngredient.ingredient
  )
  drinkIngredients?: DrinkIngredient[];
}
