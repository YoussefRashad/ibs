import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Divider, colors, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// import { Redirect } from "react-router-dom";
import { useSnackbar } from "notistack";

import Header from "./Header";
import Page from "src/components/Page";
import HTTP from "src/utils/axios";
import useUser from "src/hooks/useUser";

import Profile from "./Profile";
import Payments from "./Payments";
import Tickets from "./Tickets";
import Security from "./Security";

import LoadingScreen from "src/components/LoadingScreen";

const useStyles = makeStyles((theme) => ({
   root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
   },
   content: {
      marginTop: theme.spacing(3),
   },
   divider: {
      backgroundColor: colors.grey[300],
   },
}));

const ProfileContainer = ({ match, history }) => {
   const classes = useStyles();
   const [tab, setTab] = useState("profile");
   const { id } = match.params;
   const { user: currentUser } = useUser();
   const [user, setUser] = useState();
   const [mine, setMine] = useState(false);
   const { enqueueSnackbar } = useSnackbar();

   const checkIfThisYourAccount = () => {
      if (id === currentUser._id || !id) {
         setMine(true);
      }
   };

   const tabs = [
      { value: "profile", label: "Profile" },
      { value: "tickets", label: "Tickets" },
      { value: "payments", label: "Payments" },
      mine ? { value: "security", label: "Security" } : {},
   ];

   useEffect(() => {
      const userId = id || currentUser._id;
      HTTP.get(`/users/${userId}`)
         .then((res) => {
            setUser(res.data);
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
      checkIfThisYourAccount();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleTabsChange = (event, value) => {
      setTab(value);
   };

   return !user ? (
      <LoadingScreen />
   ) : (
      <Page className={classes.root} title="Profile">
         <Header user={user} mine={mine} />
         <Container maxWidth="lg">
            <Box mt={5}>
               <Tabs
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  value={tab}
                  textColor="secondary"
                  variant="scrollable"
               >
                  {tabs.map((tab) => (
                     <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
               </Tabs>
               <Divider className={classes.divider} />
               <div className={classes.content}>
                  {tab === "profile" && <Profile user={user} />}
                  {tab === "tickets" && (
                     <Tickets userId={id || currentUser._id} />
                  )}
                  {tab === "payments" && (
                     <Payments userId={id || currentUser._id} />
                  )}
                  {tab === "security" && <Security />}
               </div>
            </Box>
         </Container>
      </Page>
   );
};

export default ProfileContainer;
