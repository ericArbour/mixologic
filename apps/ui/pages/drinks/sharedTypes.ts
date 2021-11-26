import { DrinkDto } from '@mixologic/common';
import { NestedValue } from 'react-hook-form';

// NestedValue needed due to https://github.com/react-hook-form/react-hook-form/issues/2922
export type DrinkFormValues = DrinkDto & {
  glass: NestedValue<DrinkDto['glass']>;
  drinkIngredients: DrinkIngredientFormValues[];
};

type DrinkIngredientFormValues = {
  ingredient: NestedValue<
    DrinkDto['drinkIngredients'][number]['ingredient']
  > | null;
  amount: DrinkDto['drinkIngredients'][number]['amount'] | null;
  upperRangeAmount:
    | DrinkDto['drinkIngredients'][number]['upperRangeAmount']
    | null;
  unit: NestedValue<DrinkDto['drinkIngredients'][number]['unit']> | null;
};
