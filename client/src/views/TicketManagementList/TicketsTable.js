import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
   Button,
   Card,
   CardHeader,
   Avatar,
   Box,
   Divider,
   Typography,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   colors,
} from "@material-ui/core";

import Label from "src/components/Label";

import getInitials from "src/utils/getInitials";
import getFirstAndLast from "src/utils/getFirstAndLast";
import limitString from "src/utils/limitString";
import withPlaceholder from "src/hoc/withPlaceholder";

const useStyles = makeStyles((theme) => ({
   root: {},
   filterButton: {
      marginRight: theme.spacing(2),
   },
   inner: {
      minWidth: 900,
   },
   actions: {
      padding: theme.spacing(0, 1),
      justifyContent: "flex-end",
   },
   avatar: {
      marginRight: "10px",
   },
   capitalize: {
      textTransform: "capitalize",
   },
}));

const labelColors = {
   new: colors.green[600],
   open: colors.orange[600],
   pending: colors.red[600],
};

function TicketsTable({ tickets, className, ...rest }) {
   const classes = useStyles();

   return (
      <div {...rest} className={clsx(classes.root, className)}>
         <Card>
            <CardHeader title="Tickets" />
            <Divider />
            <PerfectScrollbar>
               <div className={classes.inner}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>#</TableCell>
                           <TableCell>Name</TableCell>
                           <TableCell>Department</TableCell>
                           <TableCell>Issue</TableCell>
                           <TableCell>Description</TableCell>
                           <TableCell>Created At</TableCell>
                           <TableCell>Status</TableCell>
                           <TableCell>Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {tickets.map((ticket) => (
                           <TableRow key={ticket._id}>
                              <TableCell>{ticket.uid}</TableCell>
                              <TableCell>
                                 <Box display="flex" alignItems="center">
                                    <Avatar
                                       className={classes.avatar}
                                       component={RouterLink}
                                       to={"/profile/" + ticket.owner._id}
                                       target="blank"
                                       src={
                                          ticket.owner.photo
                                             ? "/uploads/users/" +
                                               ticket.owner.photo
                                             : ""
                                       }
                                    ></Avatar>
                                    <Typography
                                       variant="body2"
                                       component={RouterLink}
                                       color="textPrimary"
                                       to={"/profile/" + ticket.owner._id}
                                       target="blank"
                                    >
                                       {getFirstAndLast(
                                          ticket.owner.name["en"]
                                       )}
                                    </Typography>
                                 </Box>
                              </TableCell>
                              <TableCell className={classes.capitalize}>
                                 {ticket.department}
                              </TableCell>
                              <TableCell>
                                 {limitString(ticket.issue, 25)}
                              </TableCell>
                              <TableCell>
                                 {limitString(ticket.description, 25)}
                              </TableCell>
                              <TableCell>
                                 <Typography variant="body2">
                                    {moment(ticket.createdAt).format(
                                       "DD MMM YYYY | hh:mm"
                                    )}
                                 </Typography>
                              </TableCell>
                              <TableCell>
                                 <Label
                                    color={labelColors[ticket.statusFormatted]}
                                    variant="outlined"
                                 >
                                    {ticket.statusFormatted}
                                 </Label>
                              </TableCell>
                              <TableCell>
                                 <Button
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    component={RouterLink}
                                    to={"/ticket/" + ticket._id}
                                 >
                                    View
                                 </Button>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </div>
            </PerfectScrollbar>
         </Card>
      </div>
   );
}

export default withPlaceholder(TicketsTable);
