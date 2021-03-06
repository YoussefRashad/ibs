import React from "react";
// import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
   Card,
   CardContent,
   CardMedia,
   Typography,
   // Divider,
   // Link,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

import Page from "src/components/Page";
import gradients from "src/utils/gradients";
import ForgetPassForm from "./ForgetPassForm";

const useStyles = makeStyles((theme) => ({
   root: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(6, 2),
   },
   card: {
      width: theme.breakpoints.values.md,
      maxWidth: "100%",
      overflow: "visible",
      display: "flex",
      position: "relative",
      "& > *": {
         flexGrow: 1,
         flexBasis: "50%",
         width: "50%",
      },
   },
   content: {
      padding: theme.spacing(8, 4, 3, 4),
   },
   media: {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      padding: theme.spacing(3),
      color: theme.palette.common.white,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      [theme.breakpoints.down("md")]: {
         display: "none",
      },
   },
   icon: {
      backgroundImage: gradients.green,
      color: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      position: "absolute",
      top: -32,
      left: theme.spacing(3),
      height: 64,
      width: 64,
      fontSize: 32,
   },
   loginForm: {
      marginTop: theme.spacing(3),
   },
   person: {
      marginTop: theme.spacing(2),
      display: "flex",
   },
   avatar: {
      marginRight: theme.spacing(2),
   },
}));

function ForgetPassword() {
   const classes = useStyles();

   return (
      <Page className={classes.root} title="Forget Password">
         <Card className={classes.card}>
            <CardContent className={classes.content}>
               <LockIcon className={classes.icon} />
               <Typography gutterBottom variant="h3">
                  Reset your password
               </Typography>
               <Typography variant="subtitle2">
                  Enter your phone number below. We'll look for your account and
                  send you a password reset code.
               </Typography>
               <ForgetPassForm className={classes.loginForm} />
            </CardContent>
            <CardMedia
               className={classes.media}
               image="/images/auth.png"
               title="Cover"
            />
         </Card>
      </Page>
   );
}

export default ForgetPassword;
