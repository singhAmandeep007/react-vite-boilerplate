/* eslint-disable @typescript-eslint/no-unused-vars */
import { assertType, describe, expectTypeOf, test } from "vitest";

describe("utility types", () => {
  test("Overwrite", () => {
    const person = { age: "31", name: "p1" };
    const employee = { age: 31, salary: 1000 };

    type OverwrittenPerson = Overwrite<typeof person, typeof employee>;

    const overwrittenPerson: OverwrittenPerson = {
      age: 31,
      name: "p1",
      salary: 1000,
    };

    assertType<{ age: number; name: string; salary: number }>(overwrittenPerson);

    expectTypeOf(overwrittenPerson).toEqualTypeOf<typeof overwrittenPerson>();

    expectTypeOf(overwrittenPerson).not.toMatchTypeOf<{ age: string }>();
  });

  test("RecursivePartial", () => {
    const person = {
      name: "p1",
      age: 1,
      address: {
        street: "s1",
        city: "c1",
      },
    };

    type PartialPerson = RecursivePartial<typeof person>;

    const partialPerson: PartialPerson = {
      name: "p1",
      address: {
        street: "s1",
      },
    };

    // @ts-expect-error - undefined is not assingable to string
    assertType<{ name: string }>(partialPerson);

    expectTypeOf(partialPerson).toEqualTypeOf<typeof partialPerson>();

    expectTypeOf(partialPerson).toMatchTypeOf<{ address?: { street?: string } }>();
  });

  test("ValueOf", () => {
    const THEME = { LIGHT: "light", DARK: "dark" } as const;

    type TTheme = ValueOf<typeof THEME>;

    const theme: TTheme = "light";

    assertType<"light" | "dark">(theme);

    expectTypeOf(theme).not.toEqualTypeOf<"dark">();

    expectTypeOf(theme).toEqualTypeOf<"light">();
  });
});
