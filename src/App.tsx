import React from "react";
import "./App.css";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          <Gallery />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
