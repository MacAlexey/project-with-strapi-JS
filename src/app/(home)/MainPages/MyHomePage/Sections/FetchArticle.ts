import { avatarImgs } from "contains/fakeData";
import { LOCALHOST } from "../../../../../constants";
import { PostDataType } from "data/types";
import qs from "qs";
import { fetchPostsByCategorySlug } from "utils/api";

export const fetchArticle = async (): Promise<PostDataType[]> => {
  try {
    const query = qs.stringify(
      {
        populate: {
          featuredImage: { fields: ["url"] },
          categories: { fields: ["slug", "name"] },
          author: {
            fields: ["firstName", "lastName", "displayName", "slug"],
            populate: {
              avatar: {
                fields: ["url"],
              },
            },
          },
        },
        sort: ["date:desc"],
      },
      { encodeValuesOnly: true }
    );

    const response = await fetchPostsByCategorySlug("/articles?", query);

    const articleUpdate = response.data.map((article: any) => {
      const updatedCategory = article.categories.map((cat: any) => ({
        ...cat,
        href: `/category/${cat.slug}`,
        thumbnail: `${LOCALHOST}${cat.cover_image?.url}`,
      }));

      const updatedAuthor = article.author
        ? {
            firstName: article.author.firstName,
            lastName: article.author.lastName,
            displayName: article.author.displayName,
            avatar: article.author.avatar
              ? `${LOCALHOST}${article.author.avatar.url}`
              : undefined,
            href: `/author-1/${article.author.slug}`,
          }
        : null;

      return {
        ...article,
        author: updatedAuthor,
        categories: updatedCategory,
        href: `/article-1/${article.slug}`,
        featuredImage: `${LOCALHOST}${article.featuredImage?.url}`,
      };
    });

    return articleUpdate.slice(0, 8);
  } catch (error) {
    console.error("Error when loading categories:", error);
    return [];
  }
};
