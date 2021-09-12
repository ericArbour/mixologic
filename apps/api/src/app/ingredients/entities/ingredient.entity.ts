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

  @ManyToMany(() => Ingredient)
  @JoinTable({
    name: 'ingredient_satisfies_ingredient',
    joinColumn: {
      name: 'ingredient_1',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ingredient_2',
      referencedColumnName: 'id',
    },
  })
  satisfiesIngredients?: Ingredient[];

  @ManyToMany(() => Ingredient)
  @JoinTable({
    name: 'ingredient_satisfies_ingredient',
    joinColumn: {
      name: 'ingredient_2',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ingredient_1',
      referencedColumnName: 'id',
    },
  })
  satisfiedByIngredients?: Ingredient[];

  @OneToMany(
    () => DrinkIngredient,
    (drinkIngredient) => drinkIngredient.ingredient
  )
  drinkIngredients?: DrinkIngredient[];
}
