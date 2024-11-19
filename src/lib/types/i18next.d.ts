// import the original type declarations
import "i18next";

declare module "i18next" {
  // Extend CustomTypeOptions
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    // defaultNS: "common";
    // custom resources type
    // import all namespaces with absolute path (for the default language, only)
    resources: {
      common: typeof import("../../modules/i18n/locales/en-US/common.json");
      errors: typeof import("../../modules/i18n/locales/en-US/errors.json");
      homePage: typeof import("../../modules/i18n/locales/en-US/homePage.json");
    };
  }
}

// READ-MORE: https://www.i18next.com/overview/typescript
