import * as i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { merge } from "../utils";

import { DEFAULT_INIT_OPTION, TLangsValues, TNamespaces } from "./consts";

export class I18n {
  protected i18n: i18next.i18n;

  constructor() {
    this.i18n = i18next.createInstance();

    this.i18n.on("languageChanged", (lng) => {
      document.documentElement.lang = lng;
    });
  }

  async configure({
    initOptions,
    config,
  }: {
    initOptions?: i18next.InitOptions;
    config?: {
      withLanguageDetector?: boolean;
      withBackend?: boolean;
    };
  } = {}) {
    initOptions = merge(DEFAULT_INIT_OPTION, initOptions || {});
    config = {
      withBackend: config?.withBackend ?? true,
      withLanguageDetector: config?.withLanguageDetector ?? true,
    };

    const i18nInstance = this.i18n.use(initReactI18next);

    if (config.withLanguageDetector) {
      i18nInstance.use(LanguageDetector);
    }

    if (config.withBackend) {
      i18nInstance.use({
        type: "backend",
        read: async function (language: TLangsValues, namespace: TNamespaces, callback: i18next.ReadCallback) {
          try {
            const modules = import.meta.glob("./locales/*/*.json", {
              import: "default",
            });

            const data = (await modules[`./locales/${language}/${namespace}.json`]()) as Record<string, string>;

            callback(null, (data && data.default) || data);
          } catch (error) {
            console.log(`Error loading translation for ${language}:${namespace}`, error);
            callback(error as i18next.CallbackError, null);
          }
        },
      });
    }

    return await i18nInstance.init(
      {
        ...(config.withLanguageDetector
          ? {
              detection: {
                // language detector options
                order: ["navigator", "localStorage", "htmlTag"],
                lookupQuerystring: "lng",
                lookupLocalStorage: "i18nextLng",
                caches: ["localStorage"],
                convertDetectedLanguage: (detectedLng: string) => {
                  const matchedSupportedLng = (initOptions?.supportedLngs as TLangsValues[]).find((supportedLng) =>
                    supportedLng.startsWith(detectedLng)
                  );

                  return matchedSupportedLng || detectedLng;
                },
              },
            }
          : {}),
        ...initOptions,
      },
      (error) => {
        if (error) {
          return console.error("Something went wrong loading internationalization", error);
        }
      }
    );
  }

  t(key: string | string[], options?: i18next.TOptions) {
    return this.i18n.t(key, options);
  }

  select(ns: string) {
    return (key: string, options?: i18next.TOptions) => {
      return this.t(`${ns}${ns.includes(":") ? "." : ":"}${key}`, options);
    };
  }

  get currentLanguage() {
    return this.i18n.resolvedLanguage || this.i18n.language;
  }
}

export const i18n = new I18n();
