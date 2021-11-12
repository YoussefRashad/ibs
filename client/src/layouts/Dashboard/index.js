import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import NavBar from "./NavBar";
import TopBar from "./TopBar";
import useUser from "src/hooks/useUser";

import firebaseMessaging from "src/utils/firebase";

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.dark,
      display: "flex",
      height: "100%",
      overflow: "hidden",
      width: "100%",
   },
   wrapper: {
      display: "flex",
      flex: "1 1 auto",
      overflow: "hidden",
      paddingTop: 64,
      [theme.breakpoints.up("lg")]: {
         paddingLeft: 256,
      },
   },
   contentContainer: {
      display: "flex",
      flex: "1 1 auto",
      overflow: "hidden",
   },
   content: {
      flex: "1 1 auto",
      height: "100%",
      overflow: "auto",
   },
}));

function DashboardLayout({ children, socket }) {
   const classes = useStyles();
   const [isMobileNavOpen, setMobileNavOpen] = useState(false);
   const { user } = useUser();

   useEffect(() => {
      if (user) {
         firebaseMessaging();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={classes.root}>
         {user ? (
            <>
               <TopBar onOpenNavBarMobile={() => setMobileNavOpen(true)} />
               <NavBar
                  onMobileClose={() => setMobileNavOpen(false)}
                  openMobile={isMobileNavOpen}
               />
               <div className={classes.wrapper}>
                  <div className={classes.contentContainer}>
                     <div className={classes.content}>{children}</div>
                  </div>
               </div>
            </>
         ) : null}
      </div>
   );
}

DashboardLayout.propTypes = {
   children: PropTypes.any,
};

export default DashboardLayout;
