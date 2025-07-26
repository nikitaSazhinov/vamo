'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  )
})

export default function MapPage() {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser')
        return
      }

      setIsLoading(true)
      setError(null)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setIsLoading(false)
        },
        (error) => {
          setError('Unable to retrieve your location')
          setIsLoading(false)
        }
      )
    }

    getUserLocation()
  }, [])

  return (
    <main className="w-screen h-screen">
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Map 
        coordinates={coordinates ?? undefined}
        isLoading={isLoading}
      />
    </main>
  )
}
