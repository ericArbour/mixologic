import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { DrinkIngredient } from '../../drinks/entities/drink-ingredient.entity';
import { Categories } from '../../categories/entities/category.entity';

@Entity()
export class Ingredient extends Base {
  @Column({ type: 'citext', unique: true })
  name!: string;

  @ManyToMany(() => Categories)
  @JoinTable()
  categories?: Categories[];

  @OneToMany(
    () => DrinkIngredient,
    (drinkIngredient) => drinkIngredient.ingredient
  )
  drinkIngredients?: DrinkIngredient[];
}
