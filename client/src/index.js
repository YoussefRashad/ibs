import "react-perfect-scrollbar/dist/css/styles.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "src/utils/firebase";
import * as serviceWorker from "./serviceWorker";

import { SettingsProvider } from "src/context/SettingsContext";
import { UserProvider } from "src/context/UserContext";

import { restoreStorage } from "src/utils/storage";

const settings = restoreStorage("settings");
const user = restoreStorage("user");

ReactDOM.render(
   <SettingsProvider settings={settings}>
      <UserProvider user={user}>
         <App />
      </UserProvider>
   </SettingsProvider>,
   document.getElementById("root")
);

serviceWorker.unregister();
