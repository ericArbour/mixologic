import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class User extends Base {
  @Column()
  name!: string;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients?: Ingredient[];
}
