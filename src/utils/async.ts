export type TAsyncTuple<ErrorType = unknown, DataType = unknown> =
  | {
      error: ErrorType;
      data: null;
    }
  | { error: null; data: DataType };

/**
 * Gracefully handles a given Promise factory.
 * @example
 * const { error, data } = await handleAsync(() => asyncAction())
 */
export const handleAsync = async <ErrorType = unknown, DataType = unknown>(
  promise: () => Promise<DataType>
): Promise<TAsyncTuple<ErrorType, DataType>> => {
  try {
    const data = await promise().catch((error: ErrorType) => {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw error;
    });
    return { error: null, data };
  } catch (error) {
    console.error(error);
    return { error: error as ErrorType, data: null };
  }
};
