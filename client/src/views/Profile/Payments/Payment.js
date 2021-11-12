import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";

import TableCard from "src/components/TableCard";

const useStyles = makeStyles((theme) => ({
   stats: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
         flexBasis: "50%",
      },
   },
   actions: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
         flexBasis: "50%",
      },
   },
}));

function Payment({ payment }) {
   const classes = useStyles();

   return (
      <TableCard>
         <div className={classes.stats}>
            <Typography variant="h6">{payment.bank.name["en"]}</Typography>
            <Typography variant="body2">Bank</Typography>
         </div>
         <div className={classes.stats}>
            <Typography variant="h6">{payment.total}</Typography>
            <Typography variant="body2">Total salary</Typography>
         </div>
         <div className={classes.stats}>
            <Typography variant="h6">
               {moment(payment.createdAt).format("DD MMMM YYYY")}
            </Typography>
            <Typography variant="body2">Payment started</Typography>
         </div>
         <div className={classes.stats}>
            <Typography variant="h6">{payment.bank.account}</Typography>
            <Typography variant="body2">Bank account</Typography>
         </div>
         <div className={classes.stats}></div>
         <div className={classes.actions}>
            {" "}
            <Button
               color="primary"
               size="small"
               variant="outlined"
               component={RouterLink}
               to={`/payments/${payment._id}`}
            >
               View
            </Button>
         </div>
      </TableCard>
   );
}

export default Payment;
