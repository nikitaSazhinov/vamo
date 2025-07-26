'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix for default marker icons in Leaflet
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface MapViewProps {
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isLoading?: boolean;
}

// Component to handle map center updates
function SetViewOnCoordinates({ coords }: { coords: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(coords, 14)
  }, [coords, map])
  return null
}

const MapView = ({ coordinates, isLoading }: MapViewProps) => {
  const position: [number, number] = coordinates 
    ? [coordinates.latitude, coordinates.longitude]
    : [51.505, -0.09] // Default to London

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-[999]">
          <p>Loading location...</p>
        </div>
      )}

      <MapContainer
        center={position}
        zoom={14}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {coordinates && (
          <>
            <SetViewOnCoordinates coords={position} />
            
            <Marker 
              position={position}
              properties={{ icon }}
            />

            <Circle
              center={position}
              radius={1000}
              pathOptions={{
                color: '#4264fb',
                fillColor: '#4264fb',
                fillOpacity: 0.2
              }}
            />
          </>
        )}
      </MapContainer>
    </div>
  )
}

export default MapView
