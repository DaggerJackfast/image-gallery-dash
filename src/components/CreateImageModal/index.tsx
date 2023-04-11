import React, { FormEventHandler, useState } from "react";
import Modal from "../Modal";
import CloseIcon from "../../assets/icons/close-icon.svg";
import ImageInput from "../ImageInput";
import api, { getAuthHeader } from "../../lib/api";
import { useAuth0 } from "@auth0/auth0-react";

interface CreateImageProps {
  show: boolean;
  onClose: () => void;
}

interface IUploadResult {
  uploadUrl: string;
  filename: string;
  url: string;
  expires: string;
}

interface ICreateImageFormData {
  description: string;
  image: File | null;
}

const CreateImageModal = ({ show, onClose }: CreateImageProps) => {
  const initialFormData: ICreateImageFormData = {
    description: "",
    image: null,
  };
  const [formData, setFormData] =
    useState<ICreateImageFormData>(initialFormData);
  const { getAccessTokenSilently } = useAuth0();

  const uploadImage = async (file: File, token: string): Promise<string> => {
    const filename = file.name;
    const contentType = file.type;
    const imageData = {
      contentType,
      filename,
    };
    const response = await api.post("/images-upload-url", {
      body: JSON.stringify(imageData),
      headers: getAuthHeader(token),
    });
    const { uploadUrl, filename: uploadFilename } = response as IUploadResult;
    console.log("response: ", response);
    let putUploadUrl = uploadUrl;
    if (
      process.env.REACT_APP_NODE_ENV !== "production" &&
      process.env.REACT_APP_S3_PROXY
    ) {
      const s3Url = new URL(uploadUrl);
      const upUrl = new URL(
        `s3-upload${s3Url.pathname}`,
        process.env.REACT_APP_SERVER_URI
      );
      upUrl.search = s3Url.search;
      putUploadUrl = upUrl.toString();
    }
    await fetch(putUploadUrl, {
      body: file,
      method: "PUT",
    });
    return uploadFilename;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    const { image, description } = formData;
    if (!image) return;
    const token = await getAccessTokenSilently();
    const uploadFileName = await uploadImage(image, token);
    const createImageParams = {
      description,
      filename: uploadFileName,
    };
    const createResponse = await api.post("/images", {
      body: JSON.stringify(createImageParams),
      headers: getAuthHeader(token),
    });
    const createJson = await createResponse.json();
    console.log("createJson: ", createJson);
    onCloseClick();
  };
  const updateState = (name: string, value: any): void => {
    setFormData({ ...formData, [name]: value });
  };

  const onCloseClick = () => {
    setFormData(initialFormData);
    onClose();
  };

  console.log("formData: ", formData);

  return (
    <Modal show={show} onOverlayClick={onCloseClick}>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 overflow-x-hidden overflow-y-auto">
        <div className="relative">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={onCloseClick}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <CloseIcon className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="flex flex-col p-8 md:w-[700px]">
              <div>
                <form onSubmit={onSubmit}>
                  <div className="w-full">
                    <ImageInput
                      value={formData.image}
                      onChange={(value) => updateState("image", value)}
                    />
                  </div>
                  <div className="w-full">
                    <textarea
                      required
                      onChange={(e) =>
                        updateState("description", e.target.value)
                      }
                      id="image-description"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      rows={5}
                      placeholder="Set image description"
                    />
                  </div>
                  <div className="pt-5 flex justify-end">
                    <button
                      className="px-7 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md"
                      type="submit"
                    >
                      <span>add</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateImageModal;
