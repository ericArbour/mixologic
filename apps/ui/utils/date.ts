export function convertUTCDateToLocalDate(dateStr: string): string {
  const date = new Date(dateStr);
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate.toLocaleString();
}
