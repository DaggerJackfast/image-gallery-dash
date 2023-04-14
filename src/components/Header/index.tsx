import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import cx from "classnames";
import CloseSideIcon from "../../assets/icons/close-side-icon.svg";
import Profile from "../Profile";

const Header = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  const [show, setShow] = useState<boolean>(false);
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 disabled:bg-slate-200"
            onClick={() => setShow(true)}
            disabled={show}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={cx(
          "fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white",
          "px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 flex flex-col",
          "ease-in-out duration-300",
          { ["translate-x-0"]: show, ["translate-x-full"]: !show }
        )}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setShow(false)}
          >
            <span className="sr-only">Close menu</span>
            <CloseSideIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 flow-root">
          {user && <Profile user={user} />}
        </div>
        <div className="mt-6 flex-0">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6" />
            <div className="py-6 flex justify-center">
              {isAuthenticated && (
                <button
                  onClick={() => logout()}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log Out <span aria-hidden="true">&rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
