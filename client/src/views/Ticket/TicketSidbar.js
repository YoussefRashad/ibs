import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import {
   Avatar,
   Card,
   Divider,
   Toolbar,
   CardContent,
   CardHeader,
   List,
   ListItem,
   Typography,
   colors,
} from "@material-ui/core";
import getInitials from "src/utils/getInitials";
import Label from "src/components/Label";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
   },
   header: {
      paddingBottom: 0,
   },
   content: {
      paddingTop: 0,
   },
   listItem: {
      padding: theme.spacing(2, 0),
      justifyContent: "space-between",
      "&:last-child": {
         borderBottom: 0,
         paddingBottom: 0,
      },
   },
   list: {
      paddingBottom: 0,
   },
   content: {
      padding: theme.spacing(3),
      overflow: "auto",
   },
   toolbar: {
      ...(theme.name === "light"
         ? {
              backgroundColor: "white",
           }
         : {}),
   },
}));

const labelColors = {
   new: colors.green[600],
   open: colors.orange[600],
   pending: colors.red[600],
};

export default ({ ticket }) => {
   const classes = useStyles();
   const { uid } = ticket;

   return (
      <div className={classes.root}>
         <Toolbar className={classes.toolbar}>
            <Typography variant="h4" color="textPrimary">
               TICKET #{uid}
            </Typography>
         </Toolbar>
         <Divider />
         <div className={classes.content}>
            <Card className={classes.root}>
               <CardHeader
                  avatar={
                     <Avatar
                        alt="Author"
                        className={classes.avatar}
                        component={RouterLink}
                        src={ticket.owner.photo}
                        to={"/profile/" + ticket.owner._id}
                     >
                        {getInitials(ticket.owner.name.en)}
                     </Avatar>
                  }
                  className={classes.header}
                  disableTypography
                  title={
                     <Typography
                        component={RouterLink}
                        to={"/profile/" + ticket.owner._id}
                        variant="overline"
                     >
                        {ticket.owner.name.en}
                     </Typography>
                  }
               />
               <CardContent className={classes.content}>
                  <List className={classes.list}>
                     <ListItem
                        className={classes.listItem}
                        disableGutters
                        divider
                     >
                        <Typography variant="overline">Created At</Typography>
                        <Typography variant="overline">
                           {moment(ticket.createdAt).format("DD MMM YYYY")}
                        </Typography>
                     </ListItem>
                     <ListItem
                        className={classes.listItem}
                        disableGutters
                        divider
                     >
                        <Typography variant="overline">Department</Typography>
                        <Typography variant="overline">
                           {ticket.department}
                        </Typography>
                     </ListItem>
                     <ListItem
                        className={classes.listItem}
                        disableGutters
                        divider
                     >
                        <Typography variant="overline">Status</Typography>
                        <Label color={labelColors[ticket.statusFormatted]}>
                           {ticket.statusFormatted}
                        </Label>
                     </ListItem>
                     <ListItem
                        className={classes.listItem}
                        disableGutters
                        divider
                     >
                        <Typography variant="overline">Last Update</Typography>
                        <Typography variant="h6"></Typography>
                     </ListItem>
                  </List>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};
