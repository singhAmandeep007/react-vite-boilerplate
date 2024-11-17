module.exports = {
  "src/**/*.{js,jsx,ts,tsx,css,scss,html,md,json}": () => ["npm run tsc:check", "npm run lint", "npm run test"],
};
