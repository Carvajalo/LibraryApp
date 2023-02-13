import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BooksContextProvider } from "@contexts/Books/BooksContext";
import { RequestContextProvider } from "@contexts/Requests/RequestsContext";
import { UsersContextProvider } from "@contexts/Users/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BooksContextProvider>
      <RequestContextProvider>
        <UsersContextProvider>
          <App />
        </UsersContextProvider>
      </RequestContextProvider>
    </BooksContextProvider>
  </React.StrictMode>
);
