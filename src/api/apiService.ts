import ky, { HTTPError, Options } from "ky";

import { apiURL } from "../utils";

import { i18n } from "../modules/i18n";

import { THttpService } from "../types/httpService";

export type TApiServiceOptions = Options;

// expect Server to respond with a JSON object with a message property on bad request
// READ-MORE: https://github.com/sindresorhus/ky?tab=readme-ov-file#httperror
export type TApiServiceError<
  T = {
    message?: string;
  },
> = HTTPError<T>;

export class ApiService implements THttpService<Options> {
  public options: Options;
  private kyInstance: ReturnType<(typeof ky)["create"]>;

  constructor(options: Options = {}) {
    this.options = options;
    this.kyInstance = ky.create({
      hooks: {
        // READ-MORE: https://github.com/sindresorhus/ky?tab=readme-ov-file#hooksbeforerequest
        beforeRequest: [
          (request) => {
            request.headers.set("Accept-Language", i18n.currentLanguage);
          },
        ],
        // READ-MORE: https://github.com/sindresorhus/got/blob/main/documentation/9-hooks.md#beforeerror
        // READ-MORE: https://github.com/sindresorhus/ky/issues/412
        beforeError: [
          (error) => {
            const { response } = error as TApiServiceError;

            // generic http error message based on status code
            const httpErrorMessage = i18n.t(["errors:http.status", "errors:http.unknown"], {
              context: response.status,
              status: response.status,
            });

            // ERR_NON_2XX_3XX_RESPONSE
            // if server responded back with a bad request having body
            if (error instanceof HTTPError && response && response.body) {
              error.message = httpErrorMessage;
            }

            return error;
          },
        ],
      },
      prefixUrl: apiURL().toString(),
      retry: {
        limit: 0,
      },
      ...options,
    });
  }

  public extend(options: Options) {
    this.kyInstance = this.kyInstance.extend(options);
  }

  public async get<R = unknown>(url: string, options?: Options): Promise<R> {
    return this.kyInstance.get(url, options).json();
  }

  public async post<R = unknown, B = unknown>(url: string, body: B, options?: Options): Promise<R> {
    return this.kyInstance.post(url, { json: body, ...options }).json();
  }

  public async put<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R> {
    return this.kyInstance.put(url, { json: body, ...options }).json();
  }

  public async patch<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R> {
    return this.kyInstance.patch(url, { json: body, ...options }).json();
  }

  public async delete<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R> {
    return this.kyInstance.delete(url, { json: body, ...options }).json();
  }
}
