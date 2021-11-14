import { IngredientDto } from '@mixologic/common';
import { NestedValue } from 'react-hook-form';

// NestedValue needed due to https://github.com/react-hook-form/react-hook-form/issues/2922
export type IngredientFormValues = IngredientDto & {
  categories: NestedValue<IngredientDto['categories']>;
  satisfiesIngredients?: NestedValue<
    NonNullable<IngredientDto['satisfiesIngredients']>
  >;
};
