export type Name = [string, string];

export function emptyName(): Name {
  return ["", ""];
}

export function nameToString(name: Name): string {
  return name.join(" ");
}

export function formatName(person: Name): string {
  return `${person[1]}, ${person[0]}`;
}

export function formatShortName(name: Name): string {
  return `${name[0][0]}. ${name[1]}`;
}

export function formatAbbrName(name: Name): string {
  return `${name[0][0]}.${name[1][0]}.`;
}

export function parseName(name: string): Name {
  const names = name.split(" ");
  return [names.slice(0, -1).join(" "), names.slice(-1).join(" ")];
}
