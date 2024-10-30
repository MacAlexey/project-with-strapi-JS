import { PostDataType } from "data/types";
import Image from "./Image";
import { FC } from "react";

interface ImageHelperCoverImageProps {
  posts?: PostDataType[];
  alt?: string;
  className?: string;
  sizes?: string;
}

const ImageHelper: FC<ImageHelperCoverImageProps> = ({
  posts,
  alt = "default sport image",
  className = "object-cover w-full h-full rounded-3xl md:rounded-[40px]",
  sizes = "(max-width: 1280px) 100vw, 1536px",
  ...args
}) => {
  const coverImgUrl =
    typeof posts?.[0]?.categories?.[0]?.cover_image === "string"
      ? posts?.[0]?.categories?.[0]?.cover_image
      : posts?.[0]?.categories?.[0]?.cover_image?.url;

  if (!coverImgUrl || coverImgUrl.trim() === "") {
    return null;
  }

  return (
    <Image
      alt={alt}
      fill
      src={`${process.env.REACT_APP_STRAPI_HOST_URL}${coverImgUrl}`}
      className={className}
      sizes={sizes}
      {...args}
    />
  );
};

export default ImageHelper;
