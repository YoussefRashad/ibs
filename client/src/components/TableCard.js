import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: theme.spacing(2),
   },
   content: {
      padding: theme.spacing(2),
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
         width: "100%",
         flexWrap: "wrap",
      },
      "&:last-child": {
         paddingBottom: theme.spacing(2),
      },
   },
   stats: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
         flexBasis: "50%",
      },
   },
   actions: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
         flexBasis: "50%",
      },
   },
}));

function TableCard({ children }) {
   const classes = useStyles();

   return (
      <Card className={classes.root}>
         <CardContent className={classes.content}>{children}</CardContent>
      </Card>
   );
}

TableCard.propTypes = {
   children: PropTypes.node,
};

export default TableCard;
