import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStyles, makeStyles, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import { createTheme } from "src/theme";
import Routes from "src/Routes";

import useSettings from "src/hooks/useSettings";

import HTTP from "src/utils/axios";
import ScrollReset from "src/components/ScrollReset";
import { removeStorage } from "src/utils/storage";

import "src/mixins/validate";

export const history = createBrowserHistory();

const useStyles = makeStyles(() =>
   createStyles({
      "@global": {
         "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
         },
         html: {
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
            height: "100%",
            width: "100%",
         },
         body: {
            height: "100%",
            width: "100%",
         },
         "#root": {
            height: "100%",
            width: "100%",
         },
         a: {
            textDecoration: "none",
         },
      },
   })
);

function App() {
   useStyles();
   const { settings } = useSettings();

   useEffect(() => {
      HTTP.interceptors.response.use(
         (response) => {
            return response.data;
         },
         (error) => {
            const errorResponse = error.response;
            if (errorResponse) {
               const code = errorResponse.status;
               if (code) {
                  if (code === 401) {
                     removeStorage("user");
                  }
                  return Promise.reject(error.response.data.message);
               } else {
                  return Promise.reject("Something went wrong");
               }
            } else {
               return Promise.reject("Something went wrong");
            }
         }
      );
   }, []);

   return (
      <ThemeProvider theme={createTheme(settings)}>
         <SnackbarProvider maxSnack={3}>
            <Router history={history}>
               <ScrollReset />
               <Routes />
            </Router>
         </SnackbarProvider>
      </ThemeProvider>
   );
}

export default App;
