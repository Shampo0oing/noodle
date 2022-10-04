export function dateToEventDate(date, hours) {
  return date.toISOString().split("T")[0];
}
