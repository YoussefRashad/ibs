import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
   Avatar,
   Box,
   Button,
   Container,
   Hidden,
   Typography,
   colors,
   TextField,
   makeStyles,
} from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import { useSnackbar } from "notistack";

import getInitials from "src/utils/getInitials";
import HTTP from "src/utils/axios";

const useStyles = makeStyles((theme) => ({
   root: {},
   cover: {
      position: "relative",
      height: 250,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      "&:before": {
         position: "absolute",
         content: '" "',
         top: 0,
         left: 0,
         height: "100%",
         width: "100%",
         backgroundImage:
            "linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)",
      },
      "&:hover": {
         "& $changeButton": {
            visibility: "visible",
         },
      },
   },
   changeButton: {
      visibility: "hidden",
      position: "absolute",
      bottom: theme.spacing(3),
      right: theme.spacing(3),
      backgroundColor: colors.blueGrey[900],
      color: theme.palette.common.white,
      [theme.breakpoints.down("md")]: {
         top: theme.spacing(3),
         bottom: "auto",
      },
      "&:hover": {
         backgroundColor: colors.blueGrey[900],
      },
   },
   addPhotoIcon: {
      marginRight: theme.spacing(1),
   },
   avatar: {
      border: `2px solid ${theme.palette.common.white}`,
      height: 120,
      width: 120,
      top: -60,
      left: theme.spacing(3),
      position: "absolute",
   },
}));

function Header({ className, user, mine, ...rest }) {
   const classes = useStyles();
   const { enqueueSnackbar } = useSnackbar();
   const [currentUser, setCurrentUser] = useState(user);

   const handleBlockUser = (status) => {
      HTTP.patch(`users/block-user/${user._id}`, { isBlocked: status })
         .then((res) => {
            setCurrentUser((prev) => ({
               ...prev,
               isBlocked: status,
            }));
            enqueueSnackbar(res.message, { variant: "success" });
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   const handleChangeRole = (e) => {
      const role = e.target.value;

      HTTP.patch(`users/change-role/${user._id}`, { role })
         .then((res) => {
            setCurrentUser((prev) => ({
               ...prev,
               role,
            }));
            enqueueSnackbar(res.message, { variant: "success" });
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   return (
      <div className={clsx(classes.root, className)} {...rest}>
         <div className={classes.cover}>
            <Button className={classes.changeButton} variant="contained">
               <AddPhotoIcon className={classes.addPhotoIcon} />
               Change Cover
            </Button>
         </div>
         <Container maxWidth="lg">
            <Box position="relative" mt={1} display="flex" alignItems="center">
               <Avatar
                  alt="Person"
                  className={classes.avatar}
                  src={user.photo ? "/uploads/users/" + user.photo : ""}
               >
                  {getInitials(user.name.en)}
               </Avatar>
               <Box marginLeft="160px">
                  <Typography variant="overline" color="textSecondary">
                     {user.job.en}
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                     {user.name.en}
                  </Typography>
               </Box>
               <Box flexGrow={1} />

               {mine ? null : (
                  <Hidden smDown>
                     <TextField
                        label="Change Role"
                        name="role"
                        size="small"
                        onChange={handleChangeRole}
                        select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        value={currentUser.role}
                        variant="outlined"
                     >
                        <option value="user">User</option>
                        <option value="staff">Staff</option>
                        <option value="support">Support</option>
                        <option value="admin">Admin</option>
                     </TextField>
                     {currentUser.isBlocked ? (
                        <Button
                           style={{ margin: "0 10px" }}
                           onClick={() => handleBlockUser(false)}
                           color="secondary"
                           // size="small"
                           variant="outlined"
                           className={classes.action}
                        >
                           Unblock User
                        </Button>
                     ) : (
                        <Button
                           style={{ margin: "0 10px" }}
                           onClick={() => handleBlockUser(true)}
                           color="secondary"
                           // size="small"
                           variant="outlined"
                           className={classes.action}
                        >
                           Block User
                        </Button>
                     )}

                     <Button
                        color="secondary"
                        component={RouterLink}
                        // size="small"
                        to="/chat"
                        variant="contained"
                        className={classes.action}
                     >
                        Send message
                     </Button>
                  </Hidden>
               )}
            </Box>
         </Container>
      </div>
   );
}

Header.propTypes = {
   className: PropTypes.string,
   user: PropTypes.object.isRequired,
};

export default Header;
