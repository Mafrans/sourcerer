export type PageRange = [number, number | undefined];

export function parsePageRange(value: string): PageRange {
  if (value.contains("-")) {
    const [start, end] = value.split("-").map((v) => parseInt(v));
    return [start, end];
  }
  return [parseInt(value), undefined];
}

export function formatPageRange([start, end]: PageRange): string {
  if (end == null) {
    return start.toString();
  }
  return `${start}-${end}`;
}
