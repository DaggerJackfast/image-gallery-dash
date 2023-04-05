import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      Log in <span aria-hidden="true">&rarr;</span>
    </button>
  );
};

export default Login;
