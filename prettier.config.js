const prettierConfig = {
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cva", "cn"],
  useTabs: false,
  printWidth: 120,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "es5",
  singleAttributePerLine: true,
  semi: true,
  bracketSpacing: true,
  bracketSameLine: false,
};

export default prettierConfig;
