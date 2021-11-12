import React, { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Link, Typography } from "@material-ui/core";

import getInitials from "src/utils/getInitials";

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3),
      height: "100%",
      overflow: "auto",
   },
   noComments: {
      background: "url(/images/undraw_empty_xct9.svg)",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100%",
   },
   comment: {
      display: "flex",
      marginBottom: theme.spacing(2),
   },
   bubble: {
      flexGrow: 1,
      padding: theme.spacing(1),
      marginLeft: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      ...(theme.name === "light"
         ? {
              backgroundColor: theme.palette.background.dark,
           }
         : {
              backgroundColor: theme.palette.background.default,
           }),
   },
   header: {
      display: "flex",
      alignItems: "center",
   },
   time: {
      marginLeft: "auto",
   },
   message: {
      marginTop: theme.spacing(1),
   },
}));

function Comments({ ticketId, socket, comments }) {
   const classes = useStyles();
   const commentsRef = useRef(null);

   useEffect(() => {
      scrollBottom();
   }, [comments]);

   const scrollBottom = () => {
      const element = commentsRef.current;
      element.scrollTo(0, element.scrollHeight);
   };

   return (
      <div className={classes.root} ref={commentsRef}>
         {comments && comments.length === 0 && (
            <div className={classes.noComments}></div>
         )}
         {comments &&
            comments.map((comment, index) => (
               <div className={classes.comment} key={"comment" + index}>
                  <Avatar
                     alt="Person"
                     component={RouterLink}
                     src={
                        comment.owner.photo
                           ? "/uploads/users/" + comment.owner.photo
                           : ""
                     }
                     to={"/profile/" + comment.owner._id}
                     target="blank"
                  >
                     {getInitials(comment.owner.name.en)}
                  </Avatar>
                  <div className={classes.bubble}>
                     <div className={classes.header}>
                        <Link
                           color="textPrimary"
                           component={RouterLink}
                           to={"/profile/" + comment.owner._id}
                           target="blank"
                           variant="h6"
                        >
                           {comment.owner.name.en}
                        </Link>
                        <Typography
                           className={classes.time}
                           variant="body2"
                           color="textSecondary"
                        >
                           {moment(comment.createdAt).fromNow()}
                        </Typography>
                     </div>
                     <Typography
                        className={classes.message}
                        variant="body1"
                        color="textSecondary"
                     >
                        {comment.comment}
                     </Typography>
                  </div>
               </div>
            ))}
      </div>
   );
}

export default Comments;
