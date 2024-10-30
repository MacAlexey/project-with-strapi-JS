import Avatar from "components/Avatar/Avatar";
import { PostAuthorFlexible, PostAuthorType } from "data/types";
import Link from "components/Link";
import React, { FC } from "react";

export interface SingleAuthorProps {
  author?: PostAuthorFlexible;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ author }) => {
  return (
    <div className="nc-SingleAuthor flex">
      {author && author.avatar !== "" && (
        <Link href={author.id ? `/author-1/${author.slug}` : "/"}>
          <Avatar
            imgUrl={author.avatar}
            userName={author.displayName}
            sizeClass="h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24"
          />
        </Link>
      )}
      <div className="flex flex-col ml-3 max-w-lg sm:ml-5">
        <span className="text-xs text-neutral-400 uppercase tracking-wider">
          WRITTEN BY
        </span>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          <Link href={author?.id ? `/author-1/${author.slug}` : "/"}>
            {author?.displayName}
          </Link>
        </h2>
        <span className="block mt-1 text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
          {author?.desc}
          <Link
            className="text-primary-6000 font-medium ml-1"
            href={author?.id ? `/author-1/${author.slug}` : "/"}
          >
            Read more
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SingleAuthor;
