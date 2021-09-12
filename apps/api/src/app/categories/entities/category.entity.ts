import { Entity, Column, OneToMany } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class Categories extends Base {
  @Column({ type: 'citext', unique: true })
  name!: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.categories)
  ingredients?: Ingredient[];
}
