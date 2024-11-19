import { assign } from "radash";

export type THttpServiceOptions = object;

export type THttpService<Options extends THttpServiceOptions> = {
  get<R = unknown>(url: string, options?: Options): Promise<R>;
  post<R = unknown, B = unknown>(url: string, body: B, options?: Options): Promise<R>;
  put<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R>;
  patch<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R>;
  delete<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R>;
};

export type THttpServiceClient<Options extends THttpServiceOptions> = {
  options: Options;
} & THttpService<Options>;

export class HttpService<Options extends THttpServiceOptions> implements THttpService<Options> {
  private client: THttpServiceClient<Options>;

  constructor(client: THttpServiceClient<Options>) {
    this.client = client;
  }

  public get<R = unknown>(url: string, options?: Options): Promise<R> {
    return this.client.get(url, this.configure(options));
  }

  public post<R = unknown, B = unknown>(url: string, body: B, options?: Options): Promise<R> {
    return this.client.post(url, body, this.configure(options));
  }

  public put<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R> {
    return this.client.put(url, body, this.configure(options));
  }

  public patch<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R> {
    return this.client.patch(url, body, this.configure(options));
  }

  public delete<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R> {
    return this.client.delete(url, body, this.configure(options));
  }

  private configure(customOptions?: Options): Options {
    return assign(this.client.options, customOptions ?? {}) as Options;
  }
}
