import React, { useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, IconButton, Input, Paper, Tooltip } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2, 3),
   },
   paper: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.5, 2),
   },
   input: {
      width: "100%",
   },
   divider: {
      width: 1,
      height: 24,
   },
   fileInput: {
      display: "none",
   },
}));

function CommentForm({ value, onChange, onSend }) {
   const classes = useStyles();
   const fileInputRef = useRef(null);

   const handleAttach = () => {
      fileInputRef.current.click();
   };

   return (
      <form className={classes.root} onSubmit={onSend}>
         <Paper className={classes.paper} elevation={1}>
            <Input
               className={classes.input}
               disableUnderline
               onChange={onChange}
               value={value}
               placeholder="Leave a message"
            />
         </Paper>
         <Tooltip title="Send">
            <IconButton color={value.length > 0 ? "primary" : "default"}>
               <SendIcon />
            </IconButton>
         </Tooltip>
         <Divider className={classes.divider} />
         <Tooltip title="Attach image">
            <IconButton edge="end" onClick={handleAttach}>
               <AddPhotoIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Attach file">
            <IconButton edge="end" onClick={handleAttach}>
               <AttachFileIcon />
            </IconButton>
         </Tooltip>
         <input className={classes.fileInput} ref={fileInputRef} type="file" />
      </form>
   );
}

CommentForm.propTypes = {
   className: PropTypes.string,
};

export default CommentForm;
