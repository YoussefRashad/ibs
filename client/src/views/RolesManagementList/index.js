import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Button } from "@material-ui/core";

import Page from "src/components/Page";
import Header from "src/components/Header";

const useStyles = makeStyles((theme) => ({
   root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
   },
}));

function RolesList() {
   const classes = useStyles();

   useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
   });

   return (
      <Page className={classes.root} title="Roles Management List">
         <Container maxWidth={false}>
            <Header subTitle="management" mainTitle="Roles">
               <Button
                  color="primary"
                  variant="contained"
                  style={{ margin: "0 10px" }}
               >
                  Add New Role
               </Button>
            </Header>
         </Container>
      </Page>
   );
}

export default RolesList;
