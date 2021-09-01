import { Entity, Column, ManyToOne, Unique } from 'typeorm';

import { Base } from '../../base.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Cocktail } from './cocktail.entity';
import { Unit } from './unit.entity';

@Entity()
@Unique(['cocktailId', 'ingredientId'])
export class CocktailIngredient extends Base {
  @Column({ type: 'real' })
  amount!: number;

  @Column()
  cocktailId!: number;

  @Column()
  ingredientId!: number;

  @Column()
  unitId!: number;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.cocktailIngredients)
  cocktail?: Cocktail;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.cocktailIngredients)
  ingredient?: Ingredient;

  @ManyToOne(() => Unit, { nullable: false })
  unit?: Unit;
}
