import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import { useSnackbar } from "notistack";

import HTTP from "src/utils/axios";
import Payment from "./Payment";
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

function UserPayments({ userId }) {
   const classes = useStyles();
   const [payments, setPayments] = useState();
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      HTTP.get(`users/${userId}/payments`)
         .then((res) => {
            setPayments(res.data);
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
            {payments ? (
               payments.map((payment) => (
                  <Payment key={payment._id} payment={payment} />
               ))
            ) : (
               <TablePlaceholder />
            )}
         </div>
      </Container>
   );
}

export default UserPayments;
