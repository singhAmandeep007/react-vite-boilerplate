/**
 * Retrieves the value type from an object or union type.
 *
 * @template T - The object or union type.
 * @returns The value type of the object or union type.
 *
 * @example
 * const THEME = { LIGHT: "light", DARK: "dark" } as const;
 * type TTheme = ValueOf<typeof THEME>; // "light" | "dark"
 */
type ValueOf<T> = T[keyof T];

/**
 * Overwrites the properties of type T with the properties of type R.
 * @template T - The original type.
 * @template R - The type containing the properties to overwrite.
 * @example
 * // Overwrite the properties of type Person with the properties of type Employee.
 * type Person = { age: string; name: string; };
 * type Employee = { age: number; salary: number };
 * type OverwrittenPerson = Overwrite<Person, Employee>;
 * // OverwrittenPerson is { name: string; age: number; salary: number }
 */
type Overwrite<T, R> = Omit<T, keyof R> & R;

/**
 * Represents a type that recursively makes all properties of an object optional.
 * @template T - The type to make partially optional.
 * @example
 * // Define a type with required and optional properties
 * type Person {
 *   name: string;
 *   age?: number;
 *   address: {
 *     street: string;
 *     city: string;
 *   };
 * }
 *
 * // Create a partially optional type using RecursivePartial
 * type PartialPerson = RecursivePartial<Person>;
 *
 * // PartialPerson is equivalent to:
 * // {
 * //   name?: string;
 * //   age?: number;
 * //   address?: {
 * //     street?: string;
 * //     city?: string;
 * //   };
 * // }
 */
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

/**
 * Replaces the first occurrence of a substring in a string with another substring.
 *
 * @template TString - The input string.
 * @template TToReplace - The substring to be replaced.
 * @template TReplacement - The substring to replace the first occurrence of `TToReplace`.
 * @returns The resulting string after replacing the first occurrence of `TToReplace` with `TReplacement`.
 *
 * @example
 * type Replaced = ReplaceFirst<"/app/dashboard", "/app", "">; // "/dashboard"
 */
type ReplaceFirst<
  TString extends string,
  TToReplace extends string,
  TReplacement extends string,
> = TString extends `${infer TPrefix}${TToReplace}${infer TSuffix}` ? `${TPrefix}${TReplacement}${TSuffix}` : TString;
