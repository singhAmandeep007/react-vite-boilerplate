export const apiURL = (path: string = "") => {
  return new URL(path, window?.Cypress ? window?.Cypress?.env("VITE_API_URL") : import.meta.env.VITE_API_URL);
};
