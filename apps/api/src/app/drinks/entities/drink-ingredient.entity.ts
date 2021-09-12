import { Entity, Column, ManyToOne, Unique } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Unit } from '../../units/entities/unit.entity';
import { Drink } from './drink.entity';

@Entity()
@Unique(['drinkId', 'ingredientId', 'unitId'])
export class DrinkIngredient extends Base {
  @Column({ type: 'real' })
  amount!: number;

  @Column({ type: 'real', nullable: true })
  upperRangeAmount?: number;

  @Column()
  drinkId!: Drink['id'];

  @Column()
  ingredientId!: Ingredient['id'];

  @Column()
  unitId!: Unit['id'];

  @ManyToOne(() => Drink, (drink) => drink.drinkIngredients)
  drink?: Drink;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.drinkIngredients)
  ingredient?: Ingredient;

  @ManyToOne(() => Unit, { nullable: false })
  unit?: Unit;
}
