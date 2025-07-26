'use client'

import { useState, useEffect } from 'react'
import Map from '@/components/Map'

export default function MapPage() {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [distance, setDistance] = useState('5km')
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const vibeOptions = [
    { emoji: '☕', label: 'Cafe', value: 'cafe' },
    { emoji: '🍽️', label: 'Restaurant', value: 'restaurant' },
    { emoji: '🎉', label: 'Party', value: 'party' },
    { emoji: '🌿', label: 'Nature', value: 'nature' },
    { emoji: '🌧️', label: 'Rain', value: 'rain' },
    { emoji: '☀️', label: 'Sunny', value: 'sunny' },
    { emoji: '😌', label: 'Relaxing', value: 'relaxing' },
  ]

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

  const handleVibeToggle = (vibeValue: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibeValue) 
        ? prev.filter(v => v !== vibeValue)
        : [...prev, vibeValue]
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResponse('')

    if (!coordinates) {
      setError('Please allow location access to get recommendations')
      setLoading(false)
      return
    }

    // Create the prompt with the location and vibes
    let prompt = `I am currently at coordinates ${coordinates.latitude}, ${coordinates.longitude}, I am looking for something to do in a ${distance} radius`
    
    if (selectedVibes.length > 0) {
      const vibeLabels = selectedVibes.map(vibeValue => {
        const vibeInfo = vibeOptions.find(v => v.value === vibeValue)
        return vibeInfo?.label.toLowerCase()
      })
      
      if (vibeLabels.length === 1) {
        prompt += `. I'm in the mood for ${vibeLabels[0]} activities`
      } else {
        const lastVibe = vibeLabels.pop()
        prompt += `. I'm in the mood for ${vibeLabels.join(', ')} and ${lastVibe} activities`
      }
    }
    
    prompt += `. Please provide specific recommendations with details about each option.`

    try {
      const res = await fetch('/api/mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to get response')
      }

      // Extract the content from the Mistral API response
      const content = data.choices?.[0]?.message?.content
      if (content) {
        setResponse(content)
      } else {
        throw new Error('No content found in response')
      }
    } catch (error: any) {
      console.error('Error:', error)
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-screen h-screen relative">
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-[1000]">
          {error}
        </div>
      )}

      <Map 
        coordinates={coordinates ?? undefined}
        isLoading={isLoading}
      />

      {/* Floating Vibe Buttons */}
      <div className="absolute top-4 left-4 right-4 z-[1000]">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h3 className="text-sm font-semibold mb-2 text-gray-800">What's your vibe?</h3>
          <div className="grid grid-cols-7 gap-2">
            {vibeOptions.map((vibe) => (
              <button
                key={vibe.value}
                type="button"
                onClick={() => handleVibeToggle(vibe.value)}
                disabled={loading}
                className={`p-2 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                  selectedVibes.includes(vibe.value)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white/80 hover:border-blue-300'
                } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="text-lg">{vibe.emoji}</span>
                <span className="text-xs font-medium hidden sm:block">{vibe.label}</span>
              </button>
            ))}
          </div>
          {selectedVibes.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {selectedVibes.map(vibeValue => {
                  const vibeInfo = vibeOptions.find(v => v.value === vibeValue)
                  return (
                    <span 
                      key={vibeValue}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {vibeInfo?.emoji} {vibeInfo?.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Distance Selector */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000]">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-800">
                Search radius
              </label>
              <select
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1km">1km</option>
                <option value="2km">2km</option>
                <option value="5km">5km</option>
                <option value="10km">10km</option>
                <option value="20km">20km</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !coordinates}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Finding recommendations...' : 'Get Recommendations'}
            </button>
          </form>
        </div>
      </div>

      {/* Response Display */}
      {response && (
        <div className="absolute top-20 left-4 right-4 z-[1000]">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Recommendations:</h2>
            <div className="whitespace-pre-wrap text-gray-800 text-sm">{response}</div>
          </div>
        </div>
      )}
    </main>
  )
}
