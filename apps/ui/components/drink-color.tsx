import { DrinkDto } from '@mixologic/common';

import { ColorPreview } from './color-preview';

interface DrinkColorProps {
  drinkIngredients: DrinkDto['drinkIngredients'];
}

/**
 * If there are more than 2 colors that are not white,
 * mix-blend-hard-light is a nice effect for mixing
 * those colors together. However, if there is only
 * one color that is not white, mix-blend-hard-light
 * will just create white. In that event, we use
 * mix-blend-multiply, which will preserve the single
 * color that isn't white, and then we use this opacity
 * calculation to give the appearance of that color
 * being diluted.
 */
function roundToTenValue(total: number) {
  return Math.round((1 / total) * 10) * 10;
}

/**
 * A rough approximation for the color of a drink based on
 * the color of its ingredients. This is a minimal approach
 * for now but could be improved to account for the amount
 * of each ingredient in the drink.
 */
export function DrinkColor({ drinkIngredients }: DrinkColorProps) {
  const maybeColors = drinkIngredients.map(
    (drinkIngredient) => drinkIngredient.ingredient.color
  );
  const colors = maybeColors.filter((x) => x);

  const mixBlendMode =
    colors.length > 1
      ? 'mix-blend-hard-light'
      : `mix-blend-multiply opacity-${roundToTenValue(maybeColors.length)}`;

  return (
    <div className="isolate relative h-6 w-12">
      {maybeColors.map((maybeColor, index) => (
        <ColorPreview
          key={index}
          color={maybeColor}
          className={`absolute h-full w-full ${mixBlendMode}`}
        />
      ))}
    </div>
  );
}
