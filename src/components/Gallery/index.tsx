import React, { useState } from "react";
import PreviewImage from "../PreviewImage";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useQueryClient } from "react-query";
import api, { getAuthHeader } from "../../lib/api";
import ImageModal from "../ImageModal";
import { IImage } from "../../lib/types";
import CreateImageModal from "../CreateImageModal";
import LoadingIcon from "../../assets/icons/loading-icon.svg";

const IMAGES_KEY = "images";

const Gallery = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    status,
    data: images,
  } = useQuery<IImage[]>(IMAGES_KEY, async () =>
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

  const clearQuery = () => {
    queryClient.invalidateQueries(IMAGES_KEY);
  };

  const onImageDelete = async (deleteImage: IImage) => {
    await api.delete(`/images/${deleteImage.id}`, {
      headers: getAuthHeader(await getAccessTokenSilently()),
    });
    onImageClose();
    clearQuery();
  };

  const afterCreateImage = () => {
    clearQuery();
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
          {isLoading ? (
            <div className="flex justify-center pt-10">
              <LoadingIcon className="fill-indigo-500 w-20 h-20" />
            </div>
          ) : (
            <>
              {images?.length ? (
                <div className="-m-1 flex flex-wrap md:-m-2">
                  {images.map((image) => (
                    <PreviewImage
                      id={image.id}
                      key={image.id}
                      url={image.thumbnail.url}
                      onClick={() => setShowImage(image)}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-10 text-center">
                  <span>No images</span>
                </div>
              )}
            </>
          )}
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
        afterCreate={afterCreateImage}
        show={showCreateImage}
        onClose={() => onCreateImageClose()}
      />
    </>
  );
};

export default Gallery;
