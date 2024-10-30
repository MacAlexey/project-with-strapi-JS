import React, { FC } from "react";
import { TaxonomyTypeFlexible } from "data/types";
import Badge from "components/Badge/Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: TaxonomyTypeFlexible[];
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {categories.map((item, index) => (
        <Badge
          className={itemClass}
          key={index}
          name={item.name}
          href={
            item.href || ""
          } /*href={item.slug === "category" ? `/${item.slug}` : item.slug}s */
          color={item.color as any}
        />
      ))}
    </div>
  );
};

export default CategoryBadgeList;
