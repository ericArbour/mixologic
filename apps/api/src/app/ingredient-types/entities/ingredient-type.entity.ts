import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class IngredientType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.ingredientType)
  ingredients!: Ingredient[];

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedDate?: Date;
}
