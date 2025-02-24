export const productsUrl = import.meta.env.VITE_APP_PRODUCTS_URL;
export const apiKey = import.meta.env.VITE_APP_API_KEY;
export const accountUrl = import.meta.env.VITE_APP_ACCOUNT_URL;

export const headers = {
  apiKey,
  Authorization: `Bearer ${apiKey}`,
};
