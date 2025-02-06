import { Route } from "routers/types";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  cover_image?: { url: string };
}

////mine addition to categories type
export type TaxonomyTypeFlexible = TaxonomyType & {
  slug?: Route | string;
  cover_image?: { url: string };
  href?: Route | string;
};

//author type
export interface PostAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route;
  description?: string;
  slug?: Route | string;
}

//mine
export type PostAuthorFlexible = PostAuthorType & {
  avatar?: string | { url: string };
  slug?: Route | string;
  description?: string;
};

//article type
export interface PostDataType {
  id: string | number;
  author: PostAuthorFlexible; //изменил PostAuthorType на PostAuthorFlexible
  date: string;
  href: Route;
  description?: string; //mine
  slug?: Route | string; //mine
  categories: TaxonomyTypeFlexible[]; //здесь будет менятся
  title: string;
  featuredImage: string; //убрал | { url: string } потому что ранее мы расширяли тип (снизу)
  desc?: string;
  content?: string;
  like: {
    count: number;
    isLiked: boolean;
  };
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string | string[];
  galleryImgs?: string[];
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";
