import { Entity, Column } from 'typeorm';

import { Base } from '../../base.entity';

@Entity()
export class Unit extends Base {
  @Column({ unique: true })
  name!: string;
}
