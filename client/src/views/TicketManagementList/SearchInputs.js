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
               Status
            </Typography>
            <RadioGroup
               className={classes.radioGroup}
               name="status"
               onChange={(event) =>
                  onChange(event, "status", event.target.value)
               }
               value={values.status}
            >
               <FormControlLabel
                  control={<Radio color="primary" />}
                  label="New"
                  value={0}
               />
               <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Open"
                  value={1}
               />
               <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Pending"
                  value={2}
               />
               <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Closed"
                  value={3}
               />
            </RadioGroup>
         </div>
         <TextField
            fullWidth
            label="Ticket Number"
            type="number"
            margin="dense"
            name="uid"
            onChange={(event) => onChange(event, "uid", event.target.value)}
            value={values.uid}
            variant="outlined"
         />
      </div>
   );
};
