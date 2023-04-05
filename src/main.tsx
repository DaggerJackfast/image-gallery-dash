import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string;
const redirectUri = (process.env.REACT_APP_REDIRECT_URI ||
  window.location.origin) as string;

console.log("domain: ", domain);
console.log("clientId: ", clientId);
console.log("audience: ", audience);
console.log("redirectUri: ", redirectUri);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience,
        redirect_uri: redirectUri,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
