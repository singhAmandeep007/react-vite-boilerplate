import { beforeAll, describe, expect, it } from "vitest";
import { TAsyncTuple, handleAsync } from "./async";

describe("handleAsync", () => {
  describe("given a callback function that returns a value", () => {
    let result: TAsyncTuple;

    beforeAll(async () => {
      result = await handleAsync(() => Promise.resolve("value"));
    });

    it("should return explicit null as the error", () => {
      expect(result.error).toBe(null);
    });

    it("should return data", () => {
      expect(result.data).toEqual("value");
    });
  });

  describe("given a callback function that throws an exception", () => {
    const customError = new Error("Error message");

    const run = () => {
      return handleAsync(() => {
        throw customError;
      });
    };

    it("should not throw when called", () => {
      expect(run).not.toThrow();
    });

    it("should return caught error as error", async () => {
      const { error } = await run();
      expect(error).toEqual(customError);
    });

    it("should return explicit null as data", async () => {
      const { data } = await run();
      expect(data).toBe(null);
    });
  });

  describe("given a Promise that rejects", () => {
    let result: TAsyncTuple;

    beforeAll(async () => {
      result = await handleAsync(() => Promise.reject(new Error("Error message")));
    });

    it("should return the rejected error", () => {
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error).toHaveProperty("message", "Error message");
    });

    it("should return explicit null as data", () => {
      expect(result.data).toBeNull();
    });
  });
});
