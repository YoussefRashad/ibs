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
import {
   Phone as PhoneIcon,
   Home as HomeIcon,
   Mail as MailIcon,
   Briefcase as BriefcaseIcon,
   CreditCard as CreditCardIcon,
   Gift,
} from "react-feather";
import WcIcon from "@material-ui/icons/Wc";

const useStyles = makeStyles((theme) => ({
   root: {},
   jobAvatar: {
      backgroundColor: theme.palette.secondary.main,
   },
   cityAvatar: {
      backgroundColor: colors.red[600],
   },
}));

function About({ className, user, ...rest }) {
   const classes = useStyles();

   const listItems = [
      {
         icon: <CreditCardIcon size="22" />,
         label: "Identity number",
         value: user.identityNumber,
      },
      {
         icon: <BriefcaseIcon size="22" />,
         label: "Job",
         value: user.job["en"],
      },
      {
         icon: <PhoneIcon size="22" />,
         label: "Phone number",
         value: user.phone,
      },
      {
         icon: <HomeIcon size="22" />,
         label: "Address",
         value: user.address["en"],
      },
      {
         icon: <MailIcon size="22" />,
         label: "Email address",
         value: user.email,
      },
      {
         icon: <Gift size="22" />,
         label: "Birth date",
         value: moment(user.birthDate).format("DD MMM YYYY"),
      },
      {
         icon: <WcIcon size="22" />,
         label: "Gender",
         value: user.gender["en"],
      },
   ];

   return (
      <div className={clsx(classes.root, className)} {...rest}>
         <Box>
            <Card>
               <CardHeader title="About" />
               <Divider />
               <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                     "Everyone thinks of changing the world, but no one thinks
                     of changing himself."
                  </Typography>
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

About.propTypes = {
   className: PropTypes.string,
   user: PropTypes.object.isRequired,
};

export default About;
