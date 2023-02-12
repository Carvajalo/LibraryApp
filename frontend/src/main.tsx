import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BooksContextProvider } from "./context/Books/BooksContext";
import { RequestContextProvider } from "./context/Requests/RequestsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BooksContextProvider>
      <RequestContextProvider>
        <App />
      </RequestContextProvider>
    </BooksContextProvider>
  </React.StrictMode>
);
