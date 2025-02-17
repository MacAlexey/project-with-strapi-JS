import React, { ReactNode } from "react";
import SingleContent from "../SingleContents/SingleContent";
import SingleRelatedPosts from "../SingleRelatedPosts";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}

      {/* SINGLE MAIN CONTENT */}
      <div className="container mt-10">
        <SingleContent />
      </div>

      {/* RELATED POSTS */}
      <SingleRelatedPosts />
    </div>
  );
};

export default Layout;
