import { InitOptions } from "i18next";

export const LANGS_MAP = {
  enUS: {
    label: "English",
    value: "en-US",
  },
  jaJP: {
    label: "日本語",
    value: "ja-JP",
  },
} as const;

export type TLangsValues = (typeof LANGS_MAP)[keyof typeof LANGS_MAP]["value"];

export const LANGS_VALUES = Object.values(LANGS_MAP).map((value) => value.value);

export const LANGS_VALUES_MAP = LANGS_VALUES.reduce(
  (acc, value) => {
    return {
      ...acc,
      [value]: value,
    };
  },
  {} as Record<TLangsValues, TLangsValues>
);

export type TLangsKeys = keyof typeof LANGS_MAP;

export const NAMESPACES = ["common", "errors", "homePage"] as const;

export type TNamespaces = (typeof NAMESPACES)[number];

export const DEFAULT_INIT_OPTION: InitOptions = {
  // overrides language detection
  fallbackLng: LANGS_MAP["enUS"].value,
  // allowed languages
  supportedLngs: LANGS_VALUES,
  // logging
  debug: false,
  ns: NAMESPACES,
  defaultNS: NAMESPACES[0],
  fallbackNS: NAMESPACES[0],
  load: "currentOnly",

  interpolation: {
    escapeValue: false,
    // defaults
    prefix: "{{",
    suffix: "}}",

    format: (value, format, _) => {
      if (value instanceof String) {
        if (format === "uppercase") return value.toUpperCase();
        if (format === "lowercase") return value.toLowerCase();
      }
      return value;
    },
  },

  react: {
    useSuspense: false,
  },

  // defaults
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
};
