import { Entity, Column, ManyToMany } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class Category extends Base {
  @Column({ type: 'citext', unique: true })
  name!: string;

  @ManyToMany(() => Ingredient)
  ingredients?: Ingredient[];
}
