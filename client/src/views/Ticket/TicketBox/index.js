import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
   Divider,
   Toolbar,
   Button,
   TextField,
   colors,
   SvgIcon,
   Typography,
} from "@material-ui/core";
import { Send as SendIcon } from "react-feather";
import clsx from "clsx";
import { useSnackbar } from "notistack";

import useUser from "src/hooks/useUser";
import NotePopup from "./NotePopup";
import TicketComments from "./TicketComments";
import TicketForm from "./TicketForm";
import withSocketIo from "src/hoc/withSocketIo";
import HTTP from "src/utils/axios";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
   },
   customButton: {
      color: theme.palette.common.white,
      backgroundColor: colors.green[600],
      margin: theme.spacing(0, 1),
      "&:hover": {
         backgroundColor: colors.green[900],
      },
   },
   description: {
      padding: theme.spacing(3),
   },
}));

const TicketBox = ({ className, ticket, id, socket }) => {
   const classes = useStyles();
   const [value, setValue] = useState("");
   const [popupStatus, setPopupStatus] = useState(false);
   const { description, status } = ticket;
   const { enqueueSnackbar } = useSnackbar();
   const { user } = useUser();
   const [comments, setComments] = useState();
   const [subscribe, setSubscribe] = useState();

   useEffect(() => {
      const subscriber = ticket.subscribers.find((subscriber) => {
         return subscriber.id == user.id;
      });
      if (subscriber) {
         setSubscribe(true);
      } else {
         setSubscribe(false);
      }

      HTTP.get(`/tickets/${id}/comments`)
         .then((res) => {
            setComments(res.data);
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });

      socket.on("addTicketComment", (comment) => {
         // Merge Comments
         setComments((prev) => [...prev, comment]);
         new Audio("../sounds/messagereceived.ogg").play();
         setValue("");
      });

      return () => {
         socket.removeListener("addTicketComment");
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleChange = (event) => {
      setValue(event.target.value);
   };

   const handleSend = (event) => {
      event.preventDefault();
      const trimField = value.trim();

      if (trimField) {
         socket.emit("addTicketComment", { ticketId: id, comment: trimField });
      }
   };

   const handleSubscribe = (e) => {
      HTTP.patch(`/tickets/${id}/subscribe`, { subscribe: !subscribe })
         .then((res) => {
            setSubscribe(!subscribe);
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   const handleChangeStatus = (e) => {
      const status = e.target.value;
      socket.emit("updateTicketStatus", {
         ticketId: id,
         status,
      });
   };

   const openNotePopup = () => {
      setPopupStatus((prev) => !prev);
   };

   const closeNotePopup = () => {
      setPopupStatus(false);
   };

   return (
      <div className={clsx(className, classes.root)}>
         <Toolbar style={{ justifyContent: "flex-end" }}>
            <TextField
               label="Change Status"
               name="state"
               size="small"
               onChange={handleChangeStatus}
               select
               // eslint-disable-next-line react/jsx-sort-props
               SelectProps={{ native: true }}
               value={status}
               variant="outlined"
            >
               <option value={0} disabled>
                  New
               </option>
               <option value={1}>Open</option>
               <option value={2}>Pending</option>
               <option value={3}>Closed</option>
            </TextField>
            <Button
               variant="contained"
               className={classes.customButton}
               onClick={handleSubscribe}
            >
               {subscribe ? "Unsubscribe" : "Subscribe"}
            </Button>
            <Button variant="contained" color="primary" onClick={openNotePopup}>
               <SvgIcon fontSize="small" className={classes.actionIcon}>
                  <SendIcon />
               </SvgIcon>{" "}
               add a note
            </Button>
         </Toolbar>
         <Divider />
         <NotePopup open={popupStatus} onClose={closeNotePopup} ticketId={id} />
         <div className={classes.description}>
            <Typography display="block" variant="body1" color="textPrimary">
               {description}
            </Typography>
         </div>
         <Divider />
         <TicketComments ticketId={id} socket={socket} comments={comments} />
         <Divider />
         {ticket.status === 3 ? null : (
            <TicketForm
               value={value}
               ticket={ticket}
               onChange={handleChange}
               onSend={handleSend}
            />
         )}
      </div>
   );
};

export default withSocketIo(TicketBox);
