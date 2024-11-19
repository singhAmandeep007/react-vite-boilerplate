export const isProduction = !window?.Cypress && import.meta.env.MODE === "production";
export const isDevelopment = !window?.Cypress && import.meta.env.MODE === "development";

export function merge<T extends object, U extends object[]>(target: T, ...sources: U): T & U[number] {
  const isObject = (item: unknown): item is object => item !== null && typeof item === "object" && !Array.isArray(item);

  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const targetValue = target[key as keyof T];
      const sourceValue = source[key as keyof typeof source];

      if (isObject(targetValue) && isObject(sourceValue)) {
        // Recursive merge for nested objects
        target[key as keyof T] = merge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        // Overwrite primitives and undefined values from target
        target[key as keyof T] = sourceValue;
      }
    }
  }

  return target as T & U[number];
}

const generateUUID = function () {
  let counter = 0;
  return function ({ simple = false } = {}) {
    counter += 1;
    if (simple) return counter.toString();

    return (
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }) + `-${counter.toString()}`
    );
  };
};

export const uuid = generateUUID();

export function generateUniqueRandomNumbers(length: number, min: number, max: number) {
  if (length > max - min + 1) {
    throw new Error("Cannot generate unique random numbers. Requested length is greater than the range of numbers.");
  }

  const numbers = new Set();
  while (numbers.size < length) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers) as number[];
}

type TTruncatePosition = "start" | "middle" | "end";

export function truncateText(
  text: string,
  options: { maxLength: number; position?: TTruncatePosition; ellipsis?: string }
): string {
  const { maxLength, position = "end", ellipsis = "..." } = options;

  if (text.length <= maxLength) {
    return text;
  }

  const ellipsisLength = ellipsis.length;
  const leftLength = Math.ceil((maxLength - ellipsisLength) / 2);
  const rightLength = Math.floor((maxLength - ellipsisLength) / 2);

  switch (position) {
    case "start":
      return ellipsis + text.slice(-(maxLength - ellipsisLength));

    case "middle":
      return text.slice(0, leftLength) + ellipsis + text.slice(-rightLength);

    case "end":
    default:
      return text.slice(0, maxLength - ellipsisLength) + ellipsis;
  }
}
