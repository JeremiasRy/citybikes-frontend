import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback } from 'react'

export function MapComponent({center, containerStyle}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [center])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        defaultZoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker 
          position={center}>
        </Marker>
      </GoogleMap>
  ) : <></>
}