export type THttpServiceOptions = object;

export type THttpService<Options extends THttpServiceOptions> = {
  get<R = unknown>(url: string, options?: Options): Promise<R>;
  post<R = unknown, B = unknown>(url: string, body: B, options?: Options): Promise<R>;
  put<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R>;
  patch<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R>;
  delete<R = unknown, B = unknown>(url: string, body?: B, options?: Options): Promise<R>;
};
