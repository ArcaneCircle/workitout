export function seconds2label(seconds: number): string {
  if (seconds < 60) return `${seconds} sec`;
  if (seconds % 60 === 0) return `${seconds / 60} min`;
  const mins = Math.floor(seconds / 60);
  const remSec = seconds % 60;
  return `${mins} min & ${remSec} sec`;
}
