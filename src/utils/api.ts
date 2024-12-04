//hide later
// export const getData = async (url: string) => {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Error HTTP: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error while requesting data", error);
//     throw error;
//   }
// };

import { API } from "../constants";

const API_BASE_URL = `${API}`;

export const fetchPostsByCategorySlug = async (
  nameSlug: string,
  query: string
) => {
  const response = await fetch(`${API_BASE_URL}${nameSlug}${query}`);

  const data = await response.json();
  return data;
};
