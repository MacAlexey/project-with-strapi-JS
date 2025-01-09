import { API } from "../constants";

const API_BASE_URL = `${API}`;

export const fetchApi = async (nameSlug: string, query: string) => {
  const response = await fetch(`${API_BASE_URL}${nameSlug}${query}`);

  const data = await response.json();
  return data;
};
