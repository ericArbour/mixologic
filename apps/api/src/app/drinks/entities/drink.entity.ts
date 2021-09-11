import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Glass } from '../../glasses/entities/glass.entity';
import { DrinkIngredient } from './drink-ingredient.entity';
import { DrinkTag } from '../../drink-tags/entities/drink-tag.entity';

@Entity()
export class Drink extends Base {
  @Column({ type: 'citext', unique: true })
  name!: string;

  @Column({ type: 'citext', unique: true })
  url!: string;

  @Column()
  glassId!: Glass['id'];

  @ManyToOne(() => Glass, (glass) => glass.drinks, { nullable: false })
  glass?: Glass;

  @OneToMany(() => DrinkIngredient, (drinkIngredient) => drinkIngredient.drink)
  drinkIngredients?: DrinkIngredient[];

  @ManyToMany(() => DrinkTag, { cascade: true })
  @JoinTable()
  drinkTags?: DrinkTag[];
}
