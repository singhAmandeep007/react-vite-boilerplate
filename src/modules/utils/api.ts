export const apiURL = (path: string = "") => {
  return new URL(path, import.meta.env.VITE_API_URL);
};
