import React from "react";
import Modal from "../Modal";
import CloseIcon from "../../assets/icons/close-icon.svg";
import { IImage } from "../../lib/types";
interface ImageProps {
  show: boolean;
  onClose: () => void;
  image: IImage | null;
}
const ImageModal = ({ show, image, onClose }: ImageProps) => {
  return (
    <Modal show={show} onOverlayClick={onClose}>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 overflow-x-hidden overflow-y-auto">
        <div className="relative h-full w-[280px] sm:w-full md:max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <CloseIcon className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              {/*<WarningIcon className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" />*/}
              <h3 className="mb-5 text-xs lg:text-lg font-normal text-gray-500 dark:text-gray-400">
                Close
              </h3>
              <div>
                <img src={image?.url} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ImageModal;
