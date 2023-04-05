import React, { MouseEventHandler } from "react";

interface ImageProps {
  id: string;
  description: string;
  url: string;
  onClick: (id: string) => void;
}
const Image = ({ description, id, url, onClick }: ImageProps) => {
  return (
    <div className="flex w-1/3 flex-wrap" onClick={() => onClick(id)}>
      <div className="w-full p-1 md:p-2">
        <img
          alt="gallery"
          className="block h-full w-full rounded-lg object-cover object-center"
          src={url}
        />
      </div>
    </div>
  );
};

export default Image;
