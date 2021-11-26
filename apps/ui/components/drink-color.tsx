import { DrinkDto } from '@mixologic/common';

import { ColorPreview } from './color-preview';

interface DrinkColorProps {
  drinkIngredients: DrinkDto['drinkIngredients'];
}

export function DrinkColor({ drinkIngredients }: DrinkColorProps) {
  return (
    <div className="isolate relative h-6 w-12">
      {drinkIngredients.map((drinkIngredient) => (
        <ColorPreview
          key={drinkIngredient.ingredient.id}
          color={drinkIngredient.ingredient.color}
          className="absolute mix-blend-hard-light h-full w-full"
        />
      ))}
    </div>
  );
}
