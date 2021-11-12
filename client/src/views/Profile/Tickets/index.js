import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import { useSnackbar } from "notistack";

import HTTP from "src/utils/axios";
import Ticket from "./Ticket";
import TablePlaceholder from "src/components/LoadingPlaceholder/TablePlaceholder";

const useStyles = makeStyles((theme) => ({
   root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
   },
   results: {
      marginTop: theme.spacing(3),
   },
}));

function UserTickets({ userId }) {
   const classes = useStyles();
   const [tickets, setTickets] = useState();
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      HTTP.get(`users/${userId}/tickets`)
         .then((res) => {
            setTickets(res.data);
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Container maxWidth={false}>
         <div className={classes.results}>
            {tickets ? (
               tickets.map((ticket) => (
                  <Ticket key={ticket.id} ticket={ticket} />
               ))
            ) : (
               <TablePlaceholder />
            )}
         </div>
      </Container>
   );
}

export default UserTickets;
