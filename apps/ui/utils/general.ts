/** A function for parsing a form text value to a number */
export function convertToNumber(x: string | null) {
  if (!x) return null;

  const number = parseFloat(x);
  if (isNaN(number)) return x;

  return number;
}
