import { HttpService } from "./httpService";

import { KyClient } from "./kyClient";

export const httpService = new HttpService(new KyClient());

export type { TKyClientOptions as THttpServiceOptions } from "./kyClient";
