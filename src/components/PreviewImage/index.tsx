import React from "react";

interface PreviewImageProps {
  id: string;
  url: string;
  onClick: () => void;
}
const PreviewImage = ({ url, onClick }: PreviewImageProps) => {
  return (
    <div className="flex w-1/3 flex-wrap" onClick={() => onClick()}>
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

export default PreviewImage;
