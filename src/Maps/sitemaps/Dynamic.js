import React, { useRef } from 'react'

// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const MapMarkersComponent = dynamic(() => import('./MapMarkerComponent'), {
  ssr: false // Disable server-side rendering for this component
})

// const L = dynamic(() => import('leaflet'))

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(module => module.MapContainer), {
  ssr: false
})

const TileLayer = dynamic(() => import('react-leaflet').then(module => module.TileLayer), {
  ssr: false
})

const Marker = dynamic(() => import('react-leaflet').then(module => module.Marker), {
  ssr: false
})

const Popup = dynamic(() => import('react-leaflet').then(module => module.Popup), {
  ssr: false
})

export default function Dynamic({ cities, selectedCity, flag }) {
  const LatLngBounds = L.latLngBounds(cities?.map(city => [city?.lat, city?.lon]))
  const mapRef = useRef()

  const calculateCenter = () => {
    if (cities && cities.length > 0) {
      let totalLat = 0
      let totalLng = 0
      cities.forEach(city => {
        totalLat += city.lat
        totalLng += city.lon
      })
      const averageLat = totalLat / cities.length
      const averageLng = totalLng / cities.length

      return [averageLat, averageLng]
    } else {
      return [24.774265, 46.738586]
    }
  }

  return (
    <MapContainer
      key={Math.random()}
      center={flag ? [selectedCity?.lat, selectedCity?.lon] : calculateCenter()}
      bounds={LatLngBounds}
      style={{ width: '100%', height: '70vh' }}
      zoom={flag ? 6 : 12} // Set the desired zoom level
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {flag && <MapMarkersComponent selectedCity={selectedCity} />}

      {cities?.map(city => {
        const customIcon = new L.Icon({
          iconUrl: `data:image/png;base64,${city?.route?.markerIcon || ''}`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        })

        return (
          <Marker key={city.id} position={[city.lat, city.lon]} icon={customIcon}>
            <Popup>
              {city.name} <br /> Coordinates: {city.lat}, {city.lon}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
