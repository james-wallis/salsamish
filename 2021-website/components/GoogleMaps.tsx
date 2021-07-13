import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const salsaMishLocation = {
  lat: 51.728751,
  lng: -0.354476,
};

const apikey = process.env.GOOGLE_MAPS_APIKEY as string;

const CustomGoogleMaps =() => (
  <LoadScript
    googleMapsApiKey={apikey}
  >
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%'
      }}
      center={salsaMishLocation}
      zoom={15}
    >
      <Marker position={salsaMishLocation} />
    </GoogleMap>
  </LoadScript>
)

export default React.memo(CustomGoogleMaps)