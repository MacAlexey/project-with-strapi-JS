import { avatarColors } from "contains/contants";
import { _getAvatarRd } from "contains/fakeData";
import React, { FC, useEffect, useState } from "react";
import Image from "../Image/Image";

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string;
  userName?: string;
}

const _setBgColor = (name: string) => {
  const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length);
  return avatarColors[backgroundIndex];
};

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl,
  userName,
}) => {
  const name = userName || "John Doe";
  const defaultAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68D1zB62HiAWZAkQpessCgGpmfvJQUX8Rhg&s";
  const avatarUrl = imgUrl || defaultAvatar;

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: avatarUrl ? undefined : _setBgColor(name) }}
    >
      {avatarUrl ? (
        <Image
          fill
          sizes="100px"
          className="absolute inset-0 w-full h-full object-cover"
          src={avatarUrl}
          alt={name}
        />
      ) : (
        <span className="wil-avatar__name">{name[0]}</span>
      )}
    </div>
  );
};

export default Avatar;
