import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { IndexContextProvider } from "./context";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <IndexContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </IndexContextProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
