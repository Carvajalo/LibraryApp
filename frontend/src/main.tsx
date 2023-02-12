import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BooksContextProvider } from "./context/Books/BooksContext";
import { RequestContextProvider } from "./context/Requests/RequestsContext";
import { UsersContextProvider } from "./context/Users/UserContext";

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
