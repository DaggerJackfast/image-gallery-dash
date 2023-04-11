import React, { useState } from "react";
import PreviewImage from "../PreviewImage";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import api, { getAuthHeader } from "../../lib/api";
import ImageModal from "../ImageModal";
import { IImage } from "../../lib/types";
import CreateImageModal from "../CreateImageModal";

const Gallery = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    isLoading,
    error,
    data: images,
    refetch,
  } = useQuery<IImage[]>("images", async () =>
    api.get("/images", {
      headers: getAuthHeader(await getAccessTokenSilently()),
    })
  );
  console.log("isLoading: ", isLoading);
  console.log("error: ", error);
  console.log("images: ", images);

  const [showImage, setShowImage] = useState<IImage | null>(null);
  const [showCreateImage, setShowCreateImage] = useState<boolean>(false);
  const onImageClose = () => setShowImage(null);
  const onCreateImageClose = () => setShowCreateImage(false);

  const onImageDelete = async (deleteImage: IImage) => {
    await api.delete(`/images/${deleteImage.id}`, {
      headers: getAuthHeader(await getAccessTokenSilently()),
    });
    onImageClose();
    await refetch();
  };

  return (
    <>
      <h1 className="text-center font-bold py-10 text-3xl dark:text-white">
        Image Gallery
      </h1>
      <div className="flex justify-end px-5 lg:px-32">
        <button
          className="bg-transparent border border-gray-500"
          onClick={() => setShowCreateImage(true)}
        >
          add image
        </button>
      </div>
      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {images &&
              images.map((image) => (
                <PreviewImage
                  id={image.id}
                  key={image.id}
                  url={image.thumbnail.url}
                  onClick={() => setShowImage(image)}
                />
              ))}
          </div>
        </div>
      </section>
      {!!showImage && (
        <ImageModal
          show={!!showImage}
          image={showImage}
          onDelete={() => onImageDelete(showImage)}
          onClose={() => onImageClose()}
        />
      )}
      <CreateImageModal
        show={showCreateImage}
        onClose={() => onCreateImageClose()}
      />
    </>
  );
};

export default Gallery;
