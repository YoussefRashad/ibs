import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: theme.spacing(1),
   },
}));

function Header({ className, children, mainTitle, subTitle }) {
   const classes = useStyles();

   return (
      <Grid className={clsx(classes.root, className)} container spacing={3}>
         <Grid item>
            <Typography
               component="h2"
               gutterBottom
               color="textPrimary"
               variant="overline"
            >
               {subTitle}
            </Typography>
            <Typography component="h1" variant="h3" color="textPrimary">
               {mainTitle}
            </Typography>
         </Grid>
         <Grid item>{children}</Grid>
      </Grid>
   );
}

Header.propTypes = {
   children: PropTypes.node,
   mainTitle: PropTypes.string,
   subTitle: PropTypes.string,
};

export default Header;
