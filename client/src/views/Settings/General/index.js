import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
// import { useSnackbar } from "notistack";

import ProfileDetails from "./ProfileDetails";
import GeneralSettings from "./GeneralSettings";
import HTTP from "src/utils/axios";

const useStyles = makeStyles(() => ({
   root: {},
}));

function General() {
   const classes = useStyles();
   const [profile, setProfile] = useState(null);

   useEffect(() => {
      HTTP.get("/users/me").then((res) => {
         setProfile(res.data);
      });
   }, []);

   if (!profile) {
      return null;
   }

   return (
      <Grid className={classes.root} container spacing={3}>
         <Grid item lg={4} md={6} xl={3} xs={12}>
            <ProfileDetails profile={profile} />
         </Grid>
         <Grid item lg={8} md={6} xl={9} xs={12}>
            <GeneralSettings profile={profile} />
         </Grid>
      </Grid>
   );
}

General.propTypes = {
   className: PropTypes.string,
};

export default General;
