'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'

// Prevent Leaflet undefined window errors
const DEFAULT_CENTER: [number, number] = [51.505, -0.09]

// Custom mushroom marker
const icon = L.icon({
  iconUrl: '/marker.png',
  iconSize: [45, 45],     // Adjusted size for the actual image
  iconAnchor: [22, 45],   // Bottom center of the icon
  popupAnchor: [0, -45]   // Top center of the icon
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
    : DEFAULT_CENTER

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-[999]">
          <p>Loading location...</p>
        </div>
      )}

      <MapContainer
        key={`${position[0]}-${position[1]}`} // Force remount on position change
        center={position}
        zoom={14}
        className="w-full h-full"
      >
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
          url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
        />

        {coordinates && (
          <>
            <SetViewOnCoordinates coords={position} />
            
            <Marker 
              position={position}
              icon={icon}
            >
            </Marker>

            <Circle
              center={position}
              radius={1000}
              pathOptions={{
                color: '#FF69B4',
                fillColor: '#FF69B4',
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
