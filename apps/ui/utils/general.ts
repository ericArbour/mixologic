import { ChangeEvent } from 'react';

function convertToNumber(x: string | null) {
  if (!x) return null;

  const number = parseFloat(x);
  if (isNaN(number)) return x;

  return number;
}

/** A function for transforming a form text event value to a number */
export function convertEventToNumber(e: ChangeEvent<HTMLInputElement>) {
  return {
    ...e,
    target: {
      ...e.target,
      value: convertToNumber(e.target.value),
    },
  };
}

// Convert nulls to undefineds for input defaultValue props
export function nullToUndefined<T>(x: T): Exclude<T, null> | undefined {
  return x === null ? undefined : (x as Exclude<T, null>);
}
