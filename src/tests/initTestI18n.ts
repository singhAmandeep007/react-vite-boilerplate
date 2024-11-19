import { I18n, LANGS_MAP, NAMESPACES } from "../modules/i18n";

class TestI18n extends I18n {
  loadTranslationsForLanguage = async (language: string, namespaces: typeof NAMESPACES) => {
    try {
      const translations = await Promise.all(
        namespaces.map(async (ns) => {
          const translation = (await import(`../modules/i18n/locales/${language}/${ns}.json`)) as { default: unknown };
          return { ns, translation: translation.default };
        })
      );

      return translations.reduce(
        (acc, { ns, translation }) => ({
          ...acc,
          [ns]: translation,
        }),
        {}
      );
    } catch (error) {
      console.error("Error loading translations:", error);
      throw error;
    }
  };

  async init(language: string) {
    const translations = await this.loadTranslationsForLanguage(language, NAMESPACES);

    await this.configure({
      initOptions: {
        resources: {
          [language]: translations,
        },
      },
      config: {
        withBackend: false,
        withLanguageDetector: false,
      },
    });
  }
}

export const initTestI18n = async () => {
  const testI18n = new TestI18n();

  await testI18n.init(LANGS_MAP.enUS.value);
};
