import { Entity, Column, ManyToMany } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Drink } from '../../drinks/entities/drink.entity';

@Entity()
export class DrinkTag extends Base {
  @Column({ type: 'citext', unique: true })
  name!: string;

  @ManyToMany(() => Drink)
  drinks?: Drink[];
}
