import { DefaultBodyType, delay, HttpResponse, HttpResponseResolver, PathParams } from "msw";

export function withDelay<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  durationMs: number,
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (...args) => {
    await delay(durationMs);
    return resolver(...args);
  };
}

export function withAuth<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  // @ts-expect-error - ignore as of now
  return async (args) => {
    const { request } = args;

    // get Authorization header
    const authHeader = request.headers.get("Authorization");

    // check if Authorization header exists
    if (!authHeader) {
      return new HttpResponse(null, { status: 401 });
    }

    // validate Bearer token format
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return new HttpResponse(
        JSON.stringify({
          error: "Invalid token format",
          message: "Authorization header must be in the format: Bearer <token>",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return resolver(args);
  };
}
