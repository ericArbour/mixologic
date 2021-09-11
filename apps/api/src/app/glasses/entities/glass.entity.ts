import { Entity, Column, OneToMany } from 'typeorm';

import { Base } from '../../utils/base.entity';
import { Drink } from '../../drinks/entities/drink.entity';

@Entity()
export class Glass extends Base {
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Drink, (drink) => drink.glass)
  drinks?: Drink[];
}
