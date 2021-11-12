import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Grid } from "@material-ui/core";

import About from "./About";
import Employee from "./Employee";

const useStyles = makeStyles((theme) => ({
   root: {
      //   paddingTop: theme.spacing(3),
      //   paddingBottom: theme.spacing(3),
   },
}));

function UserTickets({ user }) {
   const classes = useStyles();

   return (
      <Container maxWidth={false}>
         <div className={classes.root}>
            <Grid container spacing={3}>
               <Grid item xs={12} md={6} lg={4}>
                  <About user={user} />
               </Grid>
               <Grid item xs={12} md={6} lg={8}>
                  <Employee user={user} />
               </Grid>
            </Grid>
         </div>
      </Container>
   );
}

export default UserTickets;
