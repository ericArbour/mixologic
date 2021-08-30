import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Cocktail } from './cocktail.entity';
import { Unit } from './unit.entity';

@Entity()
@Unique(['cocktailId', 'ingredientId'])
export class CocktailIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cocktailId!: number;

  @Column()
  ingredientId!: number;

  @Column({ type: 'real' })
  amount!: number;

  @ManyToOne(() => Unit, { nullable: false })
  unit!: Unit;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.cocktailIngredients)
  cocktail!: Cocktail;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.cocktailIngredients)
  ingredient!: Ingredient;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedDate?: Date;
}
