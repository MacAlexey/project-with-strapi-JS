import React, { ReactNode } from "react";
import SingleContent from "../SingleContents/MySingleContent";
import SingleRelatedPosts from "../SingleRelatedPosts";
import { PostDataType } from "data/types";

const Layout = ({
  children,
  article,
}: {
  children: ReactNode;
  article?: PostDataType;
}) => {
  return (
    <div>
      {children}

      {/* SINGLE MAIN CONTENT */}
      <div className="container mt-10">
        <SingleContent article={article} />
      </div>

      {/* RELATED POSTS */}
      <SingleRelatedPosts />
    </div>
  );
};

export default Layout;
