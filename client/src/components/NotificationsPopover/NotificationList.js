import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
   Avatar,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PaymentIcon from "@material-ui/icons/Payment";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import CodeIcon from "@material-ui/icons/Code";
import StoreIcon from "@material-ui/icons/Store";
import gradients from "src/utils/gradients";

import withSocketIo from "src/hoc/withSocketIo";

const useStyles = makeStyles((theme) => ({
   root: {},
   listItem: {
      "&:hover": {
         backgroundColor: theme.palette.background.default,
      },
   },
   unread: {
      position: "absolute",
      top: "5px",
      background: "#3a4dab",
      width: "7px",
      right: "8px",
      height: "7px",
      borderRadius: "50%",
   },

   avatarBlue: {
      backgroundImage: gradients.blue,
   },
   avatarGreen: {
      backgroundImage: gradients.green,
   },
   avatarOrange: {
      backgroundImage: gradients.orange,
   },
   avatarIndigo: {
      backgroundImage: gradients.indigo,
   },
   arrowForwardIcon: {
      color: theme.palette.icon,
   },
}));

function NotificationList({ notifications, className, socket, ...rest }) {
   const classes = useStyles();

   const avatars = {
      order: (
         <Avatar className={classes.avatarBlue}>
            <PaymentIcon />
         </Avatar>
      ),
      comment: (
         <Avatar className={classes.avatarOrange}>
            <PeopleIcon />
         </Avatar>
      ),
      ticket: (
         <Avatar className={classes.avatarGreen}>
            <StoreIcon />
         </Avatar>
      ),
      feature: (
         <Avatar className={classes.avatarIndigo}>
            <CodeIcon />
         </Avatar>
      ),
   };

   const markNotificationRead = (id) => {
      socket.emit("markNotificationRead", id);
   };

   return (
      <List {...rest} className={clsx(classes.root, className)} disablePadding>
         {notifications.map((notification, i) => (
            <ListItem
               className={clsx(classes.listItem)}
               component={RouterLink}
               divider={i < notifications.length - 1}
               key={notification._id}
               to={
                  notification.type === "ticket" ||
                  notification.type === "comment"
                     ? `/ticket/${notification.data.ticketId}`
                     : "#"
               }
               onClick={() => markNotificationRead(notification._id)}
            >
               <ListItemAvatar>{avatars[notification.type]}</ListItemAvatar>
               <ListItemText
                  primary={notification.title}
                  primaryTypographyProps={{ variant: "body1" }}
                  secondary={moment(notification.createdAt).fromNow()}
               />
               <ArrowForwardIcon className={classes.arrowForwardIcon} />
               {notification.unread ? (
                  <span className={classes.unread}></span>
               ) : null}
            </ListItem>
         ))}
      </List>
   );
}

NotificationList.propTypes = {
   className: PropTypes.string,
   notifications: PropTypes.array.isRequired,
};

export default withSocketIo(NotificationList);
