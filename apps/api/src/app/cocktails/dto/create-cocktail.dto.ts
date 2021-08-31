export class CreateCocktailDto {
  name!: string;
  url!: string;
  glassId!: number;
  cocktailIngredients!: CreateCocktailIngredientDto[];
}

export class CreateCocktailIngredientDto {
  ingredientId!: number;
  amount!: number;
  unitId!: number;
}
