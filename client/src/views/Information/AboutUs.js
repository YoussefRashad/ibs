import React, { useState } from "react";
import {
   Grid,
   TextField,
   Card,
   Divider,
   CardHeader,
   CardContent,
   CardActions,
   Button,
} from "@material-ui/core";

function AboutUs({ saveChanges, info }) {
   const [values, setValues] = useState({
      content: info.content,
      gallery: info.gallery,
   });

   const handleChange = (event) => {
      setValues({
         ...values,
         [event.target.name]: event.target.value,
      });
   };

   return (
      <>
         <Card>
            <CardHeader title="About Us"></CardHeader>
            <Divider />
            <CardContent>
               <Grid container spacing={4}>
                  <Grid item md={6} xs={12}>
                     Image
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        fullWidth
                        label="About Company"
                        name="content"
                        multiline={true}
                        onChange={handleChange}
                        value={values.content}
                        variant="outlined"
                     />
                  </Grid>
               </Grid>
            </CardContent>
            <Divider />
            <CardActions>
               <Button variant="contained" onClick={() => saveChanges(values)}>
                  Save changes
               </Button>
            </CardActions>
         </Card>
      </>
   );
}

export default AboutUs;
