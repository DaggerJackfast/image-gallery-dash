import { User, useAuth0 } from "@auth0/auth0-react";
import React from "react";
import CheckBadgeIcon from "../../assets/icons/check-badge-icon.svg";
import LoadingIcon from "../../assets/icons/loading-icon.svg";
import { useQuery } from "react-query";
import api, { getAuthHeader } from "../../lib/api";

interface ProfileProps {
  user: User;
}
interface IImagesCount {
  count: number;
}
const Profile = ({ user }: ProfileProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const { isLoading, data } = useQuery<IImagesCount>("images count", async () =>
    api.get("/images-count", {
      headers: getAuthHeader(await getAccessTokenSilently()),
    })
  );
  return (
    <div className="w-full">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt={user.nickname}
                  src={user.picture}
                  className="shadow-xl rounded-full h-auto align-middle border-none max-w-150-px"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
              <span>{user.nickname}</span>
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              <span className="relative">
                {user.email}
                {user.email_verified && (
                  <CheckBadgeIcon className="inline-block absolute -right-6 -top-2" />
                )}
              </span>
            </div>
          </div>
          <div className="w-full px-4 text-center mt-12">
            <div className="w-full border-b" />
            <div className="flex justify-center py-4 lg:pt-4 pt-8">
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  {isLoading ? (
                    <LoadingIcon className="h-6 w-7 fill-black m-auto" />
                  ) : (
                    <>{data?.count ?? 0}</>
                  )}
                </span>
                <span className="text-sm text-blueGray-400">Images</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
