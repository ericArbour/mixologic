import { Entity, Column } from 'typeorm';

import { Base } from '../../utils/base.entity';

@Entity()
export class Unit extends Base {
  @Column({ unique: true })
  name!: string;
}
