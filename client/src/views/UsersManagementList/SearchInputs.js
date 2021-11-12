import React from "react";
import {
   FormControlLabel,
   Radio,
   RadioGroup,
   TextField,
   Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default ({ onChange, values }) => {
   const classes = makeStyles((theme) => ({
      fieldGroup: {
         display: "flex",
         alignItems: "center",
      },
   }));

   return (
      <div>
         <div>
            <Typography component="p" gutterBottom variant="overline">
               Roles
            </Typography>
            <RadioGroup
               className={classes.radioGroup}
               name="role"
               onChange={(event) => onChange(event, "role", event.target.value)}
               value={values.role}
            >
               <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Admin"
                  value="admin"
               />
               <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Support"
                  value="support"
               />
               <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Staff"
                  value="staff"
               />
               <FormControlLabel
                  control={<Radio color="primary" />}
                  label="User"
                  value="user"
               />
            </RadioGroup>
         </div>
         <TextField
            fullWidth
            label="Ibs number"
            margin="dense"
            name="ibsNumber"
            onChange={(event) =>
               onChange(event, "ibsNumber", event.target.value)
            }
            value={values.ibsNumber}
            variant="outlined"
         />
         <TextField
            fullWidth
            label="Email address"
            margin="dense"
            name="email"
            onChange={(event) => onChange(event, "email", event.target.value)}
            value={values.email}
            variant="outlined"
         />
         <TextField
            fullWidth
            label="Phone number"
            margin="dense"
            name="phone"
            onChange={(event) => onChange(event, "phone", event.target.value)}
            value={values.phone}
            variant="outlined"
         />
         <div>
            <TextField
               className={classes.field}
               fullWidth
               label="Identity number"
               margin="dense"
               name="identityNumber"
               onChange={(event) =>
                  onChange(event, "identityNumber", event.target.value)
               }
               value={values.identityNumber}
               variant="outlined"
            />
         </div>
      </div>
   );
};
