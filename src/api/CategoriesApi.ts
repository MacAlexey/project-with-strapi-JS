import { TaxonomyType } from "data/types";
import qs from "qs";
import { LOCALHOST } from "../constants";
import { fetchApi } from "../api/MainApiFetch";

export const fetchCategories = async (): Promise<TaxonomyType[]> => {
  try {
    const query = qs.stringify(
      {
        populate: {
          cover_image: { fields: ["url"] },
          articles: "*",
        },
      },
      { encodeValuesOnly: true }
    );

    const response = await fetchApi("/categories?", query);

    const updatedCategories = response.data
      .map((cat: any) => ({
        ...cat,
        href: `/category/${cat.slug}`,
        thumbnail: `${LOCALHOST}${cat.cover_image?.url}`,
        count: cat.articles?.length || 0,
      }))
      .sort(
        (a: TaxonomyType, b: TaxonomyType) => (b.count ?? 0) - (a.count ?? 0)
      );

    // maximum 8 categories showing
    return updatedCategories.slice(0, 8);
  } catch (error) {
    console.error("Error when loading categories:", error);
    return [];
  }
};
