import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Divider, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
import { useSnackbar } from "notistack";

import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import VisitUs from "./VisitUs";
import Header from "src/components/Header";
import Page from "src/components/Page";
import HTTP from "src/utils/axios";

import withLoading from "src/hoc/withLoading";

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

const Information = withLoading(({ match, history, information }) => {
   const classes = useStyles();
   const { enqueueSnackbar } = useSnackbar();

   const { tab: currentTab } = match.params;
   const tabs = [
      { value: "contactUs", label: "Contact Us" },
      { value: "aboutUs", label: "About Us" },
      { value: "visitUs", label: "Visit Us" },
   ];

   if (!currentTab) {
      return <Redirect to="/information/contactUs" />;
   }

   if (!tabs.find((tab) => tab.value === currentTab)) {
      return <Redirect to="/errors/error-404" />;
   }

   const handleTabsChange = (event, value) => {
      history.push(value);
   };

   const saveChanges = (data) => {
      HTTP.patch("/info", data)
         .then(() => {
            enqueueSnackbar("Successfully saved changes", {
               variant: "success",
            });
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   return (
      <Page className={classes.root} title="App Information">
         <Container maxWidth="lg">
            <Header subTitle="Information" mainTitle="Change app information" />
            <Tabs
               onChange={handleTabsChange}
               scrollButtons="auto"
               value={currentTab}
               textColor="secondary"
               variant="scrollable"
            >
               {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
               ))}
            </Tabs>
            <Divider className={classes.divider} />
            {information && (
               <div className={classes.content}>
                  {currentTab === "contactUs" && (
                     <ContactUs
                        infoContacts={information.contacts}
                        saveChanges={saveChanges}
                     />
                  )}
                  {currentTab === "aboutUs" && (
                     <AboutUs info={information} saveChanges={saveChanges} />
                  )}
                  {currentTab === "visitUs" && (
                     <VisitUs
                        location={{
                           lng: information.longitude,
                           lat: information.latitude,
                        }}
                        saveChanges={saveChanges}
                     />
                  )}
               </div>
            )}
         </Container>
      </Page>
   );
});

const InformationWithLoading = (props) => {
   const [isLoading, setLoading] = useState(true);
   const [information, setInformation] = useState();

   useEffect(() => {
      HTTP.get("/info").then((res) => {
         setInformation(res.data);
         setLoading(false);
      });
   }, []);

   return (
      <Information isLoading={isLoading} information={information} {...props} />
   );
};

export default InformationWithLoading;
