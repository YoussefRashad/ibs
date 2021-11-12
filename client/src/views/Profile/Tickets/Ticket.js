import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { Button, Typography, colors } from "@material-ui/core";

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

const statusColors = {
   "In progress": colors.orange[600],
   Canceled: colors.grey[600],
   Completed: colors.green[600],
};

function Ticket({ ticket }) {
   const classes = useStyles();

   return (
      <TableCard>
         <div className={classes.stats}>
            <Typography variant="h6">{ticket.uid}</Typography>
            <Typography variant="body2">Ticket number</Typography>
         </div>
         <div className={classes.stats}>
            <Typography variant="h6">{ticket.department}</Typography>
            <Typography variant="body2">Department</Typography>
         </div>
         <div className={classes.stats}>
            <Typography variant="h6">
               {moment(ticket.createdAt).format("DD MMMM YYYY")}
            </Typography>
            <Typography variant="body2">Ticket started</Typography>
         </div>
         <div className={classes.stats}>
            <Typography variant="h6">
               {moment(ticket.closedAt).format("DD MMMM YYYY")}
            </Typography>
            <Typography variant="body2">Ticket closed</Typography>
         </div>
         <div className={classes.stats}>
            <Typography
               style={{ color: statusColors[ticket.status] }}
               variant="h6"
            >
               {ticket.statusFormatted}
            </Typography>
            <Typography variant="body2">Ticket status</Typography>
         </div>
         <div className={classes.actions}>
            {" "}
            <Button
               color="primary"
               size="small"
               variant="outlined"
               component={RouterLink}
               to={`/ticket/${ticket.id}`}
            >
               View
            </Button>
         </div>
      </TableCard>
   );
}

export default Ticket;
