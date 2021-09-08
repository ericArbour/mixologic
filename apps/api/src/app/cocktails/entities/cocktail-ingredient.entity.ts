import { Entity, Column, ManyToOne, Unique } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Unit } from '../../units/entities/unit.entity';
import { Cocktail } from './cocktail.entity';

@Entity()
@Unique(['cocktailId', 'ingredientId'])
export class CocktailIngredient extends Base {
  @Column({ type: 'real' })
  amount!: number;

  @Column({ type: 'real', nullable: true })
  upperRangeAmount?: number;

  @Column()
  cocktailId!: Cocktail['id'];

  @Column()
  ingredientId!: Ingredient['id'];

  @Column()
  unitId!: Unit['id'];

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.cocktailIngredients)
  cocktail?: Cocktail;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.cocktailIngredients)
  ingredient?: Ingredient;

  @ManyToOne(() => Unit, { nullable: false })
  unit?: Unit;
}
