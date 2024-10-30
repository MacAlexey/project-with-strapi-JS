import { PostDataType } from "data/types";
import { FC } from "react";

export interface MySingleContentPageInterface {
  content?: String;
}
const MySingleContentPage: FC<MySingleContentPageInterface> = ({ content }) => {
  return (
    <>
      <p>{content}</p>
    </>
  );
};

export default MySingleContentPage;
