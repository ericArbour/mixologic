import { Entity, Column, OneToMany } from 'typeorm';

import { Base } from '../../base.entity';
import { Cocktail } from '../../cocktails/entities/cocktail.entity';

@Entity()
export class Glass extends Base {
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Cocktail, (cocktail) => cocktail.glass)
  cocktails?: Cocktail[];
}
