module.exports = {
  "**/*.{js,jsx,ts,tsx,css,scss,html,md,json}": () => ["npm run format", "npm run lint", "npm run tsc:check"],
};
