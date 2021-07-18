import React from "react";
import ReactDOM from "react-dom";
import "@gouvfr/dsfr/dist/css/dsfr.min.css";
import "remixicon/fonts/remixicon.css";
import "@gouvfr/dsfr/dist/js/dsfr.module.min.js";
import "@gouvfr/dsfr/dist/js/dsfr.nomodule.min.js";
import "@github/markdown-toolbar-element";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { getMessagesActionThunk } from "./store/messageActions";

store.dispatch(getMessagesActionThunk);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
