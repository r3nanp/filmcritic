const ONE_HOUR_IN_MINUTES = 60;

export function toMovieDuration(minutes: number) {
  const hours = Math.floor(minutes / ONE_HOUR_IN_MINUTES);
  const min = minutes % ONE_HOUR_IN_MINUTES;

  return min === 0 ? `${hours}h` : `${hours}h ${min}min`;
}
