import { DrinkDto } from '@mixologic/common';

import { ColorPreview } from './color-preview';

/**
 * Averages 2 hex colors by the provided amount.
 *
 * https://stackoverflow.com/questions/6367010/average-2-hex-colors-together-in-javascript
 */
function blendColors(colorA: string, colorB: string, amount: number) {
  const [rA, gA, bA] = colorA.match(/\w\w/g)?.map((c) => parseInt(c, 16)) ?? [];
  const [rB, gB, bB] = colorB.match(/\w\w/g)?.map((c) => parseInt(c, 16)) ?? [];
  const r = Math.round(rA + (rB - rA) * amount)
    .toString(16)
    .padStart(2, '0');
  const g = Math.round(gA + (gB - gA) * amount)
    .toString(16)
    .padStart(2, '0');
  const b = Math.round(bA + (bB - bA) * amount)
    .toString(16)
    .padStart(2, '0');
  return r + g + b;
}

function isNotEmpty(x?: string | null): x is string {
  return !!x;
}

export function mixIngredientColors(
  drinkIngredients: DrinkDto['drinkIngredients']
) {
  const nonGarnishColors = drinkIngredients.map((drinkIngredient) => {
    if (drinkIngredient.unit?.name !== 'fl oz') return null;

    return drinkIngredient.ingredient.color;
  });
  const colors = nonGarnishColors.filter(isNotEmpty);
  const mixed = colors.reduce((mix, color) => blendColors(mix, color, 0.5));

  return mixed;
}

interface DrinkColorProps {
  drinkIngredients: DrinkDto['drinkIngredients'];
}

/**
 * A rough approximation for the color of a drink based on
 * the color of its ingredients. This is a minimal approach
 * for now but could be improved to account for the amount
 * of each ingredient in the drink.
 */
export function DrinkColor({ drinkIngredients }: DrinkColorProps) {
  const mixedColor = mixIngredientColors(drinkIngredients);
  return <ColorPreview color={mixedColor} className="h-6 w-12" />;
}
