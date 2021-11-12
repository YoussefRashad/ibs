import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
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
} from "@material-ui/core";

// import getInitials from "src/utils/getInitials";
import limitString from "src/utils/limitString";
import getFirstAndLast from "src/utils/getFirstAndLast";

import withPlaceholder from "src/hoc/withPlaceholder";

const useStyles = makeStyles((theme) => ({
   root: {},
   inner: {
      minWidth: 900,
   },
   avatar: {
      marginRight: "10px",
   },
   capitalize: {
      textTransform: "capitalize",
   },
}));

function UsersTable({ className, users, ...rest }) {
   const classes = useStyles();

   return (
      <div {...rest} className={clsx(classes.root, className)}>
         <Card>
            <CardHeader title="Users" />
            <Divider />
            <PerfectScrollbar>
               <div className={classes.inner}>
                  {users && (
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Ibs Number</TableCell>
                              <TableCell>Role</TableCell>
                              <TableCell>Job</TableCell>
                              <TableCell>Phone Number</TableCell>
                              <TableCell>Created At</TableCell>
                              <TableCell>Actions</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {users.map((user) => (
                              <TableRow key={user._id}>
                                 <TableCell>
                                    <Box display="flex" alignItems="center">
                                       <Avatar
                                          className={classes.avatar}
                                          src={
                                             user.photo
                                                ? "/uploads/users/" + user.photo
                                                : ""
                                          }
                                          component={RouterLink}
                                          to={"/profile/" + user._id}
                                          target="blank"
                                       />
                                       <Typography
                                          variant="body2"
                                          component={RouterLink}
                                          color="textPrimary"
                                          to={"/profile/" + user._id}
                                          target="blank"
                                       >
                                          {getFirstAndLast(user.name["en"], 15)}
                                       </Typography>
                                    </Box>
                                 </TableCell>
                                 <TableCell>{user.ibsNumber}</TableCell>
                                 <TableCell className={classes.capitalize}>
                                    {user.role}
                                 </TableCell>
                                 <TableCell className={classes.capitalize}>
                                    {limitString(user.job["en"], 20) + " ..."}
                                 </TableCell>
                                 <TableCell>{user.phone}</TableCell>
                                 <TableCell>
                                    <Typography variant="body2">
                                       {moment(user.createdAt).format(
                                          "DD MMM YYYY | hh:mm"
                                       )}
                                    </Typography>
                                 </TableCell>
                                 <TableCell>
                                    <Button
                                       color="primary"
                                       component={RouterLink}
                                       size="small"
                                       to={"/profile/" + user._id}
                                       variant="outlined"
                                    >
                                       View
                                    </Button>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  )}
               </div>
            </PerfectScrollbar>
         </Card>
      </div>
   );
}

UsersTable.propTypes = {
   className: PropTypes.string,
};

export default withPlaceholder(UsersTable);
