import React from "react";
import "./App.css";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthenticated ? (
        <>
          <Header />
          <Gallery />
        </>
      ) : (
        <Login />
      )}
    </QueryClientProvider>
  );
};

export default App;
