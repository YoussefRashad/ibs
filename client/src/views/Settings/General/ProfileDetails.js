import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
   Card,
   CardContent,
   CardActions,
   Avatar,
   Typography,
   Button
} from "@material-ui/core";

import getInitials from "src/utils/getInitials";

const useStyles = makeStyles(theme => ({
   root: {},
   content: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlgin: "center"
   },
   name: {
      marginTop: theme.spacing(1)
   },
   avatar: {
      height: 100,
      width: 100
   },
   removeBotton: {
      width: "100%"
   }
}));

function ProfileDetails({ profile }) {
   const classes = useStyles();

   return (
      <Card className={classes.root}>
         <CardContent className={classes.content}>
            <Avatar className={classes.avatar} src={profile.photo}>
               {getInitials(profile.name.en)}
            </Avatar>
            <Typography className={classes.name} gutterBottom variant="h3">
               {`${profile.firstName} ${profile.lastName}`}
            </Typography>
            <Typography color="textSecondary" variant="body1">
               {`${profile.job.en}, ${profile.company.name.en}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
               {profile.address.en}
            </Typography>
         </CardContent>
         <CardActions>
            <Button className={classes.removeBotton} variant="text">
               Remove picture
            </Button>
         </CardActions>
      </Card>
   );
}

ProfileDetails.propTypes = {
   className: PropTypes.string,
   profile: PropTypes.object.isRequired
};

export default ProfileDetails;
