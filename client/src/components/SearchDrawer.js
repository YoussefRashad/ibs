import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Drawer, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const useStyles = makeStyles((theme) => ({
   root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
   },
   drawer: {
      width: 420,
      maxWidth: "100%",
   },
   header: {
      padding: theme.spacing(2, 1),
      flexShrink: 0,
      display: "flex",
      justifyContent: "space-between",
   },
   buttonIcon: {
      marginRight: theme.spacing(1),
   },
   actions: {
      padding: theme.spacing(3),
      "& > * + *": {
         marginTop: theme.spacing(2),
      },
   },
   content: {
      padding: theme.spacing(0, 3),
      flexGrow: 1,
   },
}));

function SearchDrawer({ open, onClose, onSubmit, onClear, children }) {
   const classes = useStyles();

   return (
      <Drawer
         anchor="right"
         classes={{ paper: classes.drawer }}
         onClose={onClose}
         open={open}
         variant="temporary"
      >
         <form className={classes.root} onSubmit={onSubmit}>
            <div className={classes.header}>
               <Button onClick={onClose} size="small">
                  <CloseIcon className={classes.buttonIcon} />
                  Close
               </Button>
            </div>

            <div className={classes.content}>{children}</div>

            <div className={classes.actions}>
               <Button fullWidth onClick={onClear} variant="contained">
                  <DeleteIcon className={classes.buttonIcon} />
                  Clear
               </Button>
               <Button
                  color="primary"
                  fullWidth
                  type="submit"
                  variant="contained"
                  onClick={onClose}
               >
                  Apply filters
               </Button>
            </div>
         </form>
      </Drawer>
   );
}

SearchDrawer.propTypes = {
   open: PropTypes.bool,
   onClear: PropTypes.func,
   onSubmit: PropTypes.func,
   onClose: PropTypes.func,
   children: PropTypes.node,
};

export default SearchDrawer;
