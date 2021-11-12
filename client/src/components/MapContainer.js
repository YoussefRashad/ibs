import React from "react";
import PropTypes from "prop-types";
import {
   withScriptjs,
   withGoogleMap,
   GoogleMap,
   Marker,
} from "react-google-maps";

const MapContainer = ({ lat, lng, onClick }) => {
   return (
      <GoogleMap
         defaultZoom={17}
         onClick={(e) => onClick(e)}
         defaultClickable={true}
         defaultCenter={{ lat, lng }}
      >
         <Marker position={{ lat, lng }} />
      </GoogleMap>
   );
};

MapContainer.propTypes = {
   lat: PropTypes.number.isRequired,
   lng: PropTypes.number.isRequired,
   onClick: PropTypes.func,
};

export default withScriptjs(
   withGoogleMap((props) => <MapContainer {...props} />)
);
