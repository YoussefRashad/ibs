import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.dark,
   },
   container: {
      minHeight: "100vh",
      display: "flex",
      "@media all and (-ms-high-contrast:none)": {
         height: 0, // IE11 fix
      },
   },
   content: {
      flexGrow: 1,
      maxWidth: "100%",
      overflowX: "hidden",
      paddingTop: 64,
      [theme.breakpoints.down("xs")]: {
         paddingTop: 56,
      },
   },
}));

function Auth({ children }) {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <div className={classes.container}>
            <div className={classes.content}>{children}</div>
         </div>
      </div>
   );
}

Auth.propTypes = {
   route: PropTypes.object,
};

export default Auth;
