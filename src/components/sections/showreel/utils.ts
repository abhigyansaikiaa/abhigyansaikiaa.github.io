export function formatStat(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/** Zero-pad index+1 to 2 digits, e.g. 0 → "01" */
export function padIndex(n: number) {
  return String(n + 1).padStart(2, "0");
}
