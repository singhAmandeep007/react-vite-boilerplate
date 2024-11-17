import ky, { Options } from "ky";

import { THttpServiceClient } from "../../modules";

import { i18n } from "../../modules/i18n";

export type TKyClientOptions = Options;

export class KyClient implements THttpServiceClient<Options> {
  public options: Options;
  private kyInstance: ReturnType<(typeof ky)["create"]>;

  constructor(options: Options = {}) {
    this.options = options;
    this.kyInstance = ky.create({
      hooks: {
        beforeError: [
          async (error) => {
            const { response } = error;

            // generic http error message based on status code
            const httpErrorMessage = i18n.t(["errors:http.status", "errors:http.unknown"], {
              context: response.status,
              status: response.status,
            });

            // expect response to have message field if errored
            const result = (await response.json()) as { message?: string } | null;

            // if response doesn't have message use default http error message
            error.message = (result && result?.message) || httpErrorMessage;

            return error;
          },
        ],
      },
      ...options,
    });
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