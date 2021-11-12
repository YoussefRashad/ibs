/* eslint-disable react/no-multi-comp */
import React, { useEffect } from "react";
import { useLocation, matchPath } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
   Drawer,
   Divider,
   Avatar,
   List,
   Box,
   ListSubheader,
   Hidden,
   Typography,
   Link,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";

import NavItem from "src/components/NavItem";
import navConfig from "./navConfig";

import useUser from "src/hooks/useUser";
import getFirstAndLast from "src/utils/getFirstAndLast";

function renderNavItems({ items, ...rest }) {
   return (
      <List disablePadding>
         {items.reduce(
            (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
            []
         )}
      </List>
   );
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
   const key = item.title + depth;

   if (item.items) {
      const open = matchPath(pathname, {
         path: item.href,
         exact: false,
      });

      acc.push(
         <NavItem
            depth={depth}
            icon={item.icon}
            key={key}
            info={item.info}
            open={Boolean(open)}
            title={item.title}
         >
            {renderNavItems({
               depth: depth + 1,
               pathname,
               items: item.items,
            })}
         </NavItem>
      );
   } else {
      acc.push(
         <NavItem
            depth={depth}
            href={item.href}
            icon={item.icon}
            key={key}
            info={item.info}
            title={item.title}
         />
      );
   }

   return acc;
}

const useStyles = makeStyles(() => ({
   mobileDrawer: {
      width: 256,
   },
   desktopDrawer: {
      width: 256,
      top: 64,
      height: "calc(100% - 64px)",
   },
   avatar: {
      cursor: "pointer",
      width: 64,
      height: 64,
   },
}));

function NavBar({ openMobile, onMobileClose }) {
   const classes = useStyles();
   const location = useLocation();
   const { user } = useUser();

   useEffect(() => {
      if (openMobile && onMobileClose) {
         onMobileClose();
      }
      // eslint-disable-next-line
   }, [location.pathname]);

   const content = (
      <Box height="100%" display="flex" flexDirection="column">
         <PerfectScrollbar options={{ suppressScrollX: true }}>
            <Box p={2}>
               <Box display="flex" justifyContent="center">
                  <RouterLink to="/profile">
                     <Avatar
                        alt="User"
                        className={classes.avatar}
                        src={user.photo ? "/uploads/users/" + user.photo : ""}
                     />
                  </RouterLink>
               </Box>
               <Box mt={2} textAlign="center">
                  <Link
                     component={RouterLink}
                     to="/profile/"
                     variant="h5"
                     color="textPrimary"
                     underline="none"
                  >
                     {getFirstAndLast(user.name.en)}
                  </Link>
                  <Typography variant="body2" color="textSecondary">
                     {user.job.en}
                  </Typography>
               </Box>
            </Box>
            <Divider />
            <Box p={2}>
               {navConfig.map((config) => (
                  <List
                     key={config.subheader}
                     subheader={
                        <ListSubheader disableGutters disableSticky>
                           {config.subheader}
                        </ListSubheader>
                     }
                  >
                     {renderNavItems({
                        items: config.items,
                        pathname: location.pathname,
                     })}
                  </List>
               ))}
            </Box>
            <Divider />
         </PerfectScrollbar>
      </Box>
   );

   return (
      <>
         <Hidden lgUp>
            <Drawer
               anchor="left"
               classes={{ paper: classes.mobileDrawer }}
               onClose={onMobileClose}
               open={openMobile}
               variant="temporary"
            >
               {content}
            </Drawer>
         </Hidden>
         <Hidden mdDown>
            <Drawer
               anchor="left"
               classes={{ paper: classes.desktopDrawer }}
               open
               variant="persistent"
            >
               {content}
            </Drawer>
         </Hidden>
      </>
   );
}

NavBar.propTypes = {
   onMobileClose: PropTypes.func,
   openMobile: PropTypes.bool,
};

export default NavBar;
