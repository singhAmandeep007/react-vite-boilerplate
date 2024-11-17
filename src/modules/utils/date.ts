export function formatLocaleDate(date: Date, locale?: Intl.LocalesArgument) {
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
