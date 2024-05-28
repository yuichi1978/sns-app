import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SessionProvider } from "./SessionProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionProvider>
      {/* Appコンポネントがprops.childrenに入る */}
      <App />
    </SessionProvider>
  </React.StrictMode>
);
