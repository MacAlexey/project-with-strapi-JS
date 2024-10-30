import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import { PostDataType } from "data/types";
import Link from "components/Link";

export interface PostMeta2Props {
  className?: string;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
  article?: PostDataType;
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
  article,
}) => {
  const { date, author, categories } = article || {};

  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
    >
      <Link
        href={author?.id ? `/author-1/${author.slug}` : "/"}
        className="flex items-center space-x-2"
      >
        {author && author.avatar != "" && (
          <Avatar
            radius={avatarRounded}
            sizeClass={
              size === "normal"
                ? "h-6 w-6 text-sm"
                : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
            }
            imgUrl={author.avatar}
            userName={author?.displayName}
          />
        )}
      </Link>
      <div className="ml-3">
        <div className="flex items-center">
          <Link
            href={author?.id ? `/author-1/${author.slug}` : "/"}
            className="block font-semibold"
          >
            {author?.displayName}
          </Link>

          {!hiddenCategories && categories && categories.length > 0 && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ml-0">
                <span className="text-xs">🏷 </span>
                {categories.map((cat, index) => (
                  <Link key={cat.id} href={cat.href} className="font-semibold">
                    {cat.name}
                    {index < categories.length - 1 && <span>, </span>}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">{date}</span>
          <span className="mx-2 font-semibold">·</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            {2} min read
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostMeta2;
