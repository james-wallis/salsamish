import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import IGoogleMapCoords from '../interfaces/IGoogleMapCoords';

const defaultCenter: IGoogleMapCoords = {
  text: '',
  lat: 51.7323811,
  lng: -0.3544901,
}

export const building: IGoogleMapCoords = {
  text: 'Salsa Mish',
  lat: 51.728751,
  lng: -0.354476,
  href: 'https://goo.gl/maps/53MCoy8ebUqQVYc2A',
};

const carpark: IGoogleMapCoords = {
  text: 'Main carpark',
  lat: 51.727000,
  lng: -0.355521,
}

const overflow: IGoogleMapCoords = {
  text: 'Overflow carpark',
  lat: 51.734064, 
  lng: -0.355564,
}

const apikey = process.env.GOOGLE_MAPS_APIKEY as string;


const CustomGoogleMaps = ({ zoom, center }: { zoom?: number, center?: IGoogleMapCoords }) => {
  const searchGoogle = ({ lat, lng, href }: IGoogleMapCoords) => {
    const url = `https://www.google.com/maps/search/${lat},${lng}`;
    window.open(href || url, '_blank')?.focus();
  }

  return (
    <LoadScript
      googleMapsApiKey={apikey}
    >
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        center={defaultCenter}
        zoom={zoom || 14.5}
      >
        {
          [building, carpark].map((coords) => (
            <Marker
              key={coords.text}
              position={coords}
              label={{
                text: coords.text,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              }}
              onClick={() => searchGoogle(coords)}
            />
          ))
        }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(CustomGoogleMaps)