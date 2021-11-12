/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
   AppBar,
   Badge,
   Button,
   IconButton,
   Toolbar,
   Hidden,
   Tooltip,
   colors,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { useSnackbar } from "notistack";

import NotificationsPopover from "src/components/NotificationsPopover";

import useSettings from "src/hooks/useSettings";
import { removeStorage } from "src/utils/storage";
import HTTP from "src/utils/axios";
import withSocketIo from "src/hoc/withSocketIo";

const useStyles = makeStyles((theme) => ({
   root: {
      zIndex: theme.zIndex.drawer + 100,
      ...(theme.name === "light"
         ? {
              boxShadow: "none",
              backgroundColor: theme.palette.primary.main,
           }
         : {}),

      ...(theme.name === "dark"
         ? {
              backgroundColor: theme.palette.background.default,
           }
         : {}),
   },
   flexGrow: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(1),
   },
   notificationsButton: {
      marginLeft: theme.spacing(1),
   },
   notificationsBadge: {
      backgroundColor: colors.orange[600],
   },
   ml: {
      marginLeft: theme.spacing(1),
   },
   logoutIcon: {
      marginRight: theme.spacing(1),
   },
}));

function TopBar({ onOpenNavBarMobile, className, socket, ...rest }) {
   const classes = useStyles();
   const history = useHistory();
   const { settings, saveSettings } = useSettings();
   const notificationsRef = useRef(null);
   const [notifications, setNotifications] = useState([]);
   const [openNotifications, setOpenNotifications] = useState(false);
   const { enqueueSnackbar } = useSnackbar();

   const handleLogout = () => {
      history.push("/auth/login");
      HTTP.post("/logout")
         .then(() => {
            removeStorage("user");
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   useEffect(() => {
      socket.on("notifications", (notifications) => {
         setNotifications(notifications);
         // const audio = new Audio("../sounds/newticket.ogg");
         // audio.play();
      });

      return () => {
         socket.removeListener("notifications");
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleNotificationsOpen = () => {
      setOpenNotifications(true);
   };

   const handleNotificationsClose = () => {
      setOpenNotifications(false);
   };

   const handleToggleTheme = () => {
      const t = {
         ...settings,
         theme: settings.theme === "light" ? "dark" : "light",
      };
      saveSettings(t);
   };

   return (
      <AppBar {...rest} className={classes.root}>
         <Toolbar>
            <Hidden lgUp>
               <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  onClick={onOpenNavBarMobile}
               >
                  <MenuIcon />
               </IconButton>
            </Hidden>

            <Hidden mdDown>
               <RouterLink to="/">
                  <img
                     style={{ height: "50px" }}
                     alt="Logo"
                     src="/images/red-logo.jpg"
                     // src="http://www.ibsns.com/wp-content/uploads/2014/08/Ibs-Logo.png"
                  />
               </RouterLink>
            </Hidden>

            <div className={classes.flexGrow} />

            <Tooltip title="Notifications">
               <IconButton
                  className={classes.notificationsButton}
                  color="inherit"
                  onClick={handleNotificationsOpen}
                  ref={notificationsRef}
               >
                  <Badge
                     badgeContent={notifications.length}
                     classes={{ badge: classes.notificationsBadge }}
                     variant="dot"
                  >
                     <NotificationsIcon />
                  </Badge>
               </IconButton>
            </Tooltip>
            <Tooltip title="Change Theme">
               <Button color="inherit" onClick={handleToggleTheme}>
                  <Brightness2Icon />
               </Button>
            </Tooltip>

            <Tooltip title="Sign Out">
               <Button color="inherit" onClick={handleLogout}>
                  <InputIcon className={classes.logoutIcon} />
                  Sign out
               </Button>
            </Tooltip>
         </Toolbar>

         <NotificationsPopover
            anchorEl={notificationsRef.current}
            notifications={notifications}
            onClose={handleNotificationsClose}
            open={openNotifications}
         />
      </AppBar>
   );
}

TopBar.propTypes = {
   className: PropTypes.string,
   onOpenNavBarMobile: PropTypes.func,
};

export default withSocketIo(TopBar);
