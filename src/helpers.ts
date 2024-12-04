import { AUTH_TOKEN } from "./constants";

export const getToken = (): string | null => localStorage.getItem(AUTH_TOKEN);

export const setToken = (token: string): void => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};
