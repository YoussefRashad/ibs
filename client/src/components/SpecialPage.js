import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

import Page from "./Page";

const useStyles = makeStyles((theme) => ({
   root: {
      height: "calc(100vh - 64px)",
      display: "flex",
      overflow: "hidden",
      "@media (max-width: 863px)": {
         "& $smallColumn, & $bigColumn": {
            flexBasis: "100%",
            width: "100%",
            maxWidth: "none",
            flexShrink: "0",
            transform: "translateX(-100%)",
         },
      },
   },
   smallColumn: {
      ...(theme.name === "dark"
         ? {
              background: theme.palette.background.dark,
           }
         : {}),
      width: 300,
      flexBasis: 300,
      flexShrink: 0,
      "@media (min-width: 864px)": {
         borderRight: `1px solid ${theme.palette.divider}`,
      },
   },
   bigColumn: {
      ...(theme.name === "dark"
         ? {
              background: theme.palette.background.dark,
           }
         : {}),
      ...(theme.name === "light"
         ? {
              backgroundColor: theme.palette.common.white,
           }
         : {}),
      flexGrow: 1,
   },
}));

function SpecialPage({ smCol, lgCol, title, smBg, lgBg }) {
   const classes = useStyles();

   return (
      <Page className={classes.root} title={title}>
         <div className={classes.smallColumn} style={{ background: smBg }}>
            {smCol}
         </div>
         <div className={classes.bigColumn} style={{ background: lgBg }}>
            {lgCol}
         </div>
      </Page>
   );
}

SpecialPage.propTypes = {
   smCol: PropTypes.node,
   lgCol: PropTypes.node,
   title: PropTypes.string,
};

export default SpecialPage;
