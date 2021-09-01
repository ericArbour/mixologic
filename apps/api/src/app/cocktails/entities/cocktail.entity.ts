import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { Base } from '../../base.entity';
import { Glass } from '../../glasses/entities/glass.entity';
import { CocktailIngredient } from './cocktail-ingredient.entity';

@Entity()
export class Cocktail extends Base {
  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  url!: string;

  @ManyToOne(() => Glass, (glass) => glass.cocktails, { nullable: false })
  glass!: Glass;

  @OneToMany(
    () => CocktailIngredient,
    (cocktailIngredient) => cocktailIngredient.cocktail
  )
  cocktailIngredients!: CocktailIngredient[];
}
