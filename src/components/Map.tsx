'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'

// Custom marker icon
const icon = L.icon({
  iconUrl: '/globe.svg', // Using the globe icon from your public folder
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

interface MapViewProps {
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isLoading?: boolean;
}

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
    : [51.505, -0.09]

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
        {/* Cartographic style from Stadia Maps - more modern look */}
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />

        {coordinates && (
          <>
            <SetViewOnCoordinates coords={position} />
            
            <Marker 
              position={position}
              icon={icon}
            />

            <Circle
              center={position}
              radius={1000}
              pathOptions={{
                color: '#6366f1',
                fillColor: '#6366f1',
                fillOpacity: 0.15,
                weight: 2
              }}
            />
          </>
        )}
      </MapContainer>
    </div>
  )
}

export default MapView
