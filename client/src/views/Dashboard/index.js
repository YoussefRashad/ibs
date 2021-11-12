import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Grid } from "@material-ui/core";

import Page from "src/components/Page";
import Header from "src/components/Header";
import Overview from "./Overview";

const useStyles = makeStyles((theme) => ({
   root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      backgroundColor: theme.palette.background.dark,
   },
}));

function DashboardAnalytics() {
   const classes = useStyles();

   return (
      <Page className={classes.root} title="Dashboard">
         <Container maxWidth={false}>
            <Header subTitle="Statistics" mainTitle="Statistics Overview" />
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <Overview />
               </Grid>
               <Grid item lg={12} xs={12}></Grid>
            </Grid>
         </Container>
      </Page>
   );
}

export default DashboardAnalytics;
