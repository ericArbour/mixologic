import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Glass } from '../../glasses/entities/glass.entity';
import { CocktailIngredient } from './cocktail-ingredient.entity';

@Entity()
export class Cocktail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  url!: string;

  @ManyToOne(() => Glass, (glass) => glass.cocktails, { nullable: false })
  glass!: Glass;

  @OneToMany(
    () => CocktailIngredient,
    (cocktailIngredient) => cocktailIngredient.cocktail,
  )
  cocktailIngredients!: CocktailIngredient[];

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedDate?: Date;
}
