export function enumValues<T>(type: T): string[] {
  return Object.keys(type).map((k) => type[k as string]);
}
