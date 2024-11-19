export const apiURL = (path = "") => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return new URL(path, window?.Cypress ? window?.Cypress?.env("VITE_API_URL") : import.meta.env.VITE_API_URL);
};
