export function toDate(date: string) {
  const normalizedDate = new Date(date);
  return normalizedDate.toLocaleDateString("pt-BR");
}
