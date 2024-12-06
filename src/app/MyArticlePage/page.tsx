import React, { useEffect, useState } from "react";
import NcImage from "components/NcImage/NcImage";
import SingleHeader from "app/(singles)/SingleHeaders/MySingleHeader";
import Layout from "../(singles)/layouts/myLayout";
import { useLocation } from "react-router-dom";
import { fetchPostsByCategorySlug } from "utils/api";
import { PostDataType } from "data/types";
import qs from "qs";
import { API, LOCALHOST } from "../../constants";

const ArticlePage = () => {
  const [article, setArticle] = useState<PostDataType | undefined>();

  let location = useLocation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const lastSegment = location.pathname.split("/").filter(Boolean).pop();

        if (lastSegment === undefined) {
          return "lastSegment is undefined";
        }

        const query = qs.stringify({
          filters: {
            slug: { $eq: lastSegment },
          },
          populate: {
            featuredImage: { fields: ["url"] },
            categories: "*",
            author: {
              populate: {
                avatar: { fields: ["url"] },
              },
            },
          },
        });

        const response = await fetchPostsByCategorySlug("/articles?", query);

        const article = response?.data?.[0];

        /*article update: set proper image url: for author, for article. and set proper href for categories*/
        if (article) {
          const articleUpdate = {
            ...article,
            author: {
              ...article?.author,
              avatar: article?.author?.avatar?.url
                ? LOCALHOST + article.author.avatar.url
                : "",
            },
            featuredImage: article?.featuredImage?.url
              ? LOCALHOST + article.featuredImage.url
              : "",
            categories: article?.categories?.map((cat: any) => ({
              ...cat,
              href: `/category/${cat.slug}`,
            })),
          };

          setArticle(articleUpdate);
          console.log(articleUpdate);
        }
      } catch (error) {
        console.error("Error when load authors:", error);
      }
    };
    fetchArticles();
  }, [location.pathname]);

  return (
    <Layout article={article}>
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <header className="container rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <SingleHeader article={article} />
          </div>
        </header>

        {/* FEATURED IMAGE */}
        {article && article?.featuredImage !== "" && (
          <NcImage
            alt="single"
            containerClassName="container my-10 sm:my-12"
            className="w-full rounded-xl"
            src={article?.featuredImage}
            width={1260}
            height={750}
            sizes="(max-width: 1024px) 100vw, 1280px"
          />
        )}
      </div>
    </Layout>
  );
};

export default ArticlePage;
