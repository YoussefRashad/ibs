import React, { useState } from "react";
import {
   Card,
   Grid,
   Divider,
   CardHeader,
   CardContent,
   CardActions,
   TextField,
   Button,
} from "@material-ui/core";

import MapContainer from "src/components/MapContainer";

function VisitUs({ location, saveChanges }) {
   const [values, setValues] = useState({
      lat: Number(location.lat),
      lng: Number(location.lng),
   });

   const handleChange = (event) => {
      setValues({
         ...values,
         [event.target.name]: event.target.value,
      });
   };

   const handleMapClick = (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setValues({ ...values, lat, lng });
   };

   return (
      <Card>
         <CardHeader title="Visit Us"></CardHeader>
         <Divider />
         <CardContent
            style={{ padding: 0, height: "400px", position: "relative" }}
         >
            <MapContainer
               isMarkerShown
               googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbrIU1FHu8zFqeYCoQWyaPb6HU1YdmjQM"
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `400px` }} />}
               mapElement={<div style={{ height: `100%` }} />}
               {...values}
               onClick={handleMapClick}
            />
         </CardContent>
         <CardContent>
            <Grid container spacing={2}>
               <Grid item sm={6} xs={12}>
                  <TextField
                     label="Latitude"
                     fullWidth
                     name="lat"
                     disabled
                     onChange={(event) => handleChange(event)}
                     value={values.lat}
                     variant="outlined"
                     margin="dense"
                  />
               </Grid>
               <Grid item sm={6} xs={12}>
                  <TextField
                     label="Longitude"
                     fullWidth
                     name="lng"
                     disabled
                     onChange={(event) => handleChange(event)}
                     value={values.lng}
                     variant="outlined"
                     margin="dense"
                  />
               </Grid>
            </Grid>
         </CardContent>
         <Divider />
         <CardActions>
            <Button
               variant="contained"
               onClick={() =>
                  saveChanges({ latitude: values.lat, longitude: values.lng })
               }
            >
               Save changes
            </Button>
         </CardActions>
      </Card>
   );
}

export default VisitUs;
