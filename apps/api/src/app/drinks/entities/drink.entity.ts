import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Glass } from '../../glasses/entities/glass.entity';
import { DrinkIngredient } from './drink-ingredient.entity';

@Entity()
export class Drink extends Base {
  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  url!: string;

  @Column()
  glassId!: Glass['id'];

  @ManyToOne(() => Glass, (glass) => glass.drinks, { nullable: false })
  glass?: Glass;

  @OneToMany(() => DrinkIngredient, (drinkIngredient) => drinkIngredient.drink)
  drinkIngredients?: DrinkIngredient[];
}
