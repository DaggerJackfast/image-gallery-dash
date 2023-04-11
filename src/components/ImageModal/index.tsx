import React, { useState } from "react";
import Modal from "../Modal";
import CloseIcon from "../../assets/icons/xmark-solid-icon.svg";
import DeleteIcon from "../../assets/icons/trash-solid-icon.svg";
import InfoIcon from "../../assets/icons/info-solid-icon.svg";
import { IImage } from "../../lib/types";
import cx from "classnames";
interface ImageProps {
  show: boolean;
  onClose: () => void;
  image: IImage;
  onDelete: () => void;
}
const ImageModal = ({ show, image, onClose, onDelete }: ImageProps) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const onDeleteClick = () => {
    onDelete();
  };

  return (
    <Modal show={show} onOverlayClick={onClose}>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 overflow-x-hidden overflow-y-auto">
        <div className="relative h-full w-[280px] sm:w-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="absolute top-3 right-2.5">
              <button
                type="button"
                className={cx("rounded-full bg-red-400 p-3 mr-2", {
                  ["bg-red-700"]: showDelete,
                })}
                onClick={() => setShowDelete(!showDelete)}
              >
                <DeleteIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className={cx("rounded-full bg-indigo-400 p-3 mr-2", {
                  ["bg-indigo-600"]: showDescription,
                })}
                onClick={() => setShowDescription(!showDescription)}
              >
                <InfoIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                type="button"
                className="rounded-full bg-slate-400 p-3"
              >
                <CloseIcon className="w-5 h-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div
              className={cx("absolute top-12 p-6 flex flex-col", {
                ["hidden"]: !showDescription,
              })}
            >
              <div className="self-end mr-10 w-0 h-0 border-l-[25px] border-l-transparent border-b-[30px] border-b-gray-700/80 border-r-[25px] border-r-transparent" />
              <div className="bg-gray-700/80 text-white p-5">
                {image.description}
              </div>
            </div>
            <div
              className={cx(
                "absolute top-1/2 left-0 right-0 -translate-y-1/2 p-4",
                { ["hidden"]: !showDelete }
              )}
            >
              <div className="bg-slate-500/70 text-white p-5">
                <span className="text-lg text-center block">
                  Are you sure delete the image?
                </span>
                <div className="text-center mt-4">
                  <button
                    onClick={() => onDeleteClick()}
                    type="button"
                    className="px-5 py-2 bg-red-600 mr-4"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDelete(false)}
                    type="button"
                    className="px-5 py-2 bg-slate-600 "
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            <div className="p-0">
              <div>
                <img src={image.url.url} alt={image.filename} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ImageModal;
