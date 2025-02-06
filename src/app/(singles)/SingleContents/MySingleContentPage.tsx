import { PostDataType } from "data/types";
import { FC } from "react";
import DOMPurify from "dompurify";

export interface MySingleContentPageInterface {
  content?: string;
}

const MySingleContentPage: FC<MySingleContentPageInterface> = ({ content }) => {
  console.log(content);
  const createMarkup = (html?: string) => {
    return { __html: html ? DOMPurify.sanitize(html) : "" };
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={createMarkup(content)} />
    </div>
  );
};

export default MySingleContentPage;
