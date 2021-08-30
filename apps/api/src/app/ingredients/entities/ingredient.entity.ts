import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CocktailIngredient } from '../../cocktails/entities/cocktail-ingredient.entity';
import { IngredientType } from '../../ingredient-types/entities/ingredient-type.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToOne(
    () => IngredientType,
    (ingredientType) => ingredientType.ingredients,
    { nullable: false },
  )
  type!: IngredientType;

  @OneToMany(
    () => CocktailIngredient,
    (cocktailIngredient) => cocktailIngredient.ingredient,
  )
  cocktailIngredients!: CocktailIngredient[];

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedDate?: Date;
}
