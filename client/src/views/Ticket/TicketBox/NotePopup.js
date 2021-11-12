import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import {
   Box,
   Button,
   Dialog,
   TextField,
   Typography,
   makeStyles,
} from "@material-ui/core";
import HTTP from "src/utils/axios";

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3),
   },
   helperText: {
      textAlign: "right",
      marginRight: 0,
   },
}));

function NotePopup({ open, onClose, ticketId, onApply, ...rest }) {
   const [value, setValue] = useState("");
   const classes = useStyles();
   const { enqueueSnackbar } = useSnackbar();

   const handleChange = (event) => {
      event.persist();
      setValue(event.target.value);
   };

   const handleApply = () => {
      HTTP.post(`/tickets/${ticketId}/notes`)
         .then((res) => {
            enqueueSnackbar(res.message, {
               variant: "success",
            });
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   return (
      <Dialog maxWidth="lg" onClose={onClose} open={open}>
         <div className={classes.root} {...rest}>
            <Typography
               align="center"
               className={classes.title}
               gutterBottom
               variant="h3"
               color="textPrimary"
            >
               Add a note for reminder
            </Typography>
            <Typography
               align="center"
               variant="subtitle2"
               color="textSecondary"
            >
               Write down a short note to remind you later of what was going on.
            </Typography>
            <Box mt={3}>
               <TextField
                  autoFocus
                  FormHelperTextProps={{
                     classes: { root: classes.helperText },
                  }}
                  fullWidth
                  helperText={`${200 - value.length} characters left`}
                  label="Short Note"
                  multiline
                  onChange={handleChange}
                  placeholder="What excites you about this project?"
                  rows={5}
                  value={value}
                  variant="outlined"
               />
            </Box>
            <Box mt={3} p={3}>
               <Button
                  onClick={handleApply}
                  variant="contained"
                  fullWidth
                  color="primary"
               >
                  Apply for a role
               </Button>
            </Box>
         </div>
      </Dialog>
   );
}

NotePopup.propTypes = {
   className: PropTypes.string,
   onApply: PropTypes.func,
   onClose: PropTypes.func,
   open: PropTypes.bool.isRequired,
};

NotePopup.defaultProps = {
   onApply: () => {},
   onClose: () => {},
};

export default NotePopup;
