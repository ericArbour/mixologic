import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { DrinkIngredient } from '../../drinks/entities/drink-ingredient.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Ingredient extends Base {
  @Column({ type: 'citext', unique: true })
  name!: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories?: Category[];

  @OneToMany(
    () => DrinkIngredient,
    (drinkIngredient) => drinkIngredient.ingredient
  )
  drinkIngredients?: DrinkIngredient[];
}
