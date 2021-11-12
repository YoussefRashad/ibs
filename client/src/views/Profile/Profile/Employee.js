import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import {
   Avatar,
   Box,
   Card,
   CardContent,
   CardHeader,
   Divider,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Typography,
   colors,
   makeStyles,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import AccessibleIcon from "@material-ui/icons/Accessible";
import TodayIcon from "@material-ui/icons/Today";
import PeopleIcon from "@material-ui/icons/People";
import { Hash, DollarSign, User } from "react-feather";

const useStyles = makeStyles((theme) => ({
   root: {},
   jobAvatar: {
      backgroundColor: theme.palette.secondary.main,
   },
   cityAvatar: {
      backgroundColor: colors.red[600],
   },
}));

function Employee({ className, user, ...rest }) {
   const classes = useStyles();

   const listItems = [
      {
         icon: <User size="22" />,
         label: "Role",
         value: user.role,
      },
      {
         icon: <Hash size="22" />,
         label: "Ibs number",
         value: user.ibsNumber,
      },
      {
         icon: <BusinessIcon size="22" />,
         label: "Company name",
         value: user.company.name["en"],
      },
      {
         icon: <DollarSign size="22" />,
         label: "Bank name",
         value: user.bank.name["en"],
      },
      {
         icon: <User size="22" />,
         label: "Bank account",
         value: user.bank.account,
      },
      {
         icon: <AccessibleIcon size="22" />,
         label: "Insurance number",
         value: user.insuranceNumber,
      },
      {
         icon: <TodayIcon size="22" />,
         label: "Hiring date",
         value: moment(user.hiringDate).format("DD MMM YYYY"),
      },
      {
         icon: <TodayIcon size="22" />,
         label: "Exit date",
         value: moment(user.exitDate).format("DD MMM YYYY"),
      },
      {
         icon: <PeopleIcon size="22" />,
         label: "Client employee number",
         value: user.clientEmpNumber,
      },
   ];

   return (
      <div className={clsx(classes.root, className)} {...rest}>
         <Box>
            <Card>
               <CardHeader title="Employee Information" />
               <Divider />
               <CardContent>
                  <List>
                     {listItems.map((item) => {
                        return (
                           <ListItem disableGutters divider key={item.label}>
                              <ListItemAvatar>
                                 <Avatar className={classes.jobAvatar}>
                                    {item.icon}
                                 </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                 disableTypography
                                 primary={
                                    <Typography
                                       variant="body2"
                                       color="textPrimary"
                                    >
                                       {item.label}
                                    </Typography>
                                 }
                                 secondary={
                                    <Typography
                                       variant="caption"
                                       color="textSecondary"
                                    >
                                       {item.value}
                                    </Typography>
                                 }
                              />
                           </ListItem>
                        );
                     })}
                  </List>
               </CardContent>
            </Card>
         </Box>
      </div>
   );
}

Employee.propTypes = {
   className: PropTypes.string,
   user: PropTypes.object.isRequired,
};

export default Employee;
