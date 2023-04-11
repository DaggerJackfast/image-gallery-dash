import React, { ChangeEventHandler } from "react";
import _ from "lodash";
import UploadIcon from "../../assets/icons/upload-ison.svg";

interface FileProps {
  value: File | null;
  onChange: (value: File) => void;
}
const ImageInput = ({ onChange, value }: FileProps) => {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = _.first(e.target.files) as File;
    onChange(value);
  };

  return (
    <div className="extraOutline py-4 bg-white w-full bg-whtie m-auto rounded-lg">
      <div className="relative border-4 border-dotted border-gray-300 rounded-lg">
        <label className="z-[100] relative p-5 block">
          <div className="flex flex-col w-max mx-auto text-center">
            <div>
              <UploadIcon />
            </div>
            <div className="text bg-slate-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-400">
              {value ? <span>Change</span> : <span>Select</span>}
            </div>
            <div className="pt-3 text-xl text-slate-500 overflow-hidden">
              {value ? (
                <span className="text-ellipsis">{value.name}</span>
              ) : (
                <span className="uppercase">or drop file here</span>
              )}
            </div>
          </div>
          <input
            className="absolute top-0 left-0 right-0 bottom-0 text-sm cursor-pointer hidden"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={onInputChange}
            required
          />
        </label>
      </div>
    </div>
  );
};

export default ImageInput;
