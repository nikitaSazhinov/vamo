'use client';

import { useState } from 'react';

export default function MistralForm() {
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const vibeOptions = [
    { emoji: '☕', label: 'Cafe', value: 'cafe' },
    { emoji: '🍽️', label: 'Restaurant', value: 'restaurant' },
    { emoji: '🎉', label: 'Party', value: 'party' },
    { emoji: '🌿', label: 'Nature', value: 'nature' },
    { emoji: '🌧️', label: 'Rain', value: 'rain' },
    { emoji: '☀️', label: 'Sunny', value: 'sunny' },
    { emoji: '😌', label: 'Relaxing', value: 'relaxing' },
  ];

  const handleVibeToggle = (vibeValue: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibeValue) 
        ? prev.filter(v => v !== vibeValue)
        : [...prev, vibeValue]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    // Validate that all fields are filled
    if (!city.trim() || !distance.trim() || !hours.trim()) {
      setError('Please fill in all blanks');
      setLoading(false);
      return;
    }

    // Create the prompt with the filled-in values and vibes
    let prompt = `I am currently in ${city}, I am looking for something to do in a ${distance} radius in the next ${hours}`;
    
    if (selectedVibes.length > 0) {
      const vibeLabels = selectedVibes.map(vibeValue => {
        const vibeInfo = vibeOptions.find(v => v.value === vibeValue);
        return vibeInfo?.label.toLowerCase();
      });
      
      if (vibeLabels.length === 1) {
        prompt += `. I'm in the mood for ${vibeLabels[0]} activities`;
      } else {
        const lastVibe = vibeLabels.pop();
        prompt += `. I'm in the mood for ${vibeLabels.join(', ')} and ${lastVibe} activities`;
      }
    }
    
    prompt += `. Please provide specific recommendations with details about each option.`;

    try {
      const res = await fetch('/api/mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to get response');
      }

      // Extract the content from the Mistral API response
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        setResponse(content);
      } else {
        throw new Error('No content found in response');
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Find Things To Do</h2>
        <p className="text-gray-600">Fill in the blanks below to get personalized recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-lg text-gray-800 leading-relaxed">
            I am currently in{' '}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="city"
              className="inline-block px-3 py-1 mx-1 border-b-2 border-blue-400 bg-transparent focus:outline-none focus:border-blue-600 font-medium text-blue-700 placeholder-blue-400"
              disabled={loading}
            />
            , I am looking for something to do in a{' '}
            <input
              type="text"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="distance"
              className="inline-block px-3 py-1 mx-1 border-b-2 border-blue-400 bg-transparent focus:outline-none focus:border-blue-600 font-medium text-blue-700 placeholder-blue-400"
              disabled={loading}
            />
            {' '}radius in the next{' '}
            <input
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="time"
              className="inline-block px-3 py-1 mx-1 border-b-2 border-blue-400 bg-transparent focus:outline-none focus:border-blue-600 font-medium text-blue-700 placeholder-blue-400"
              disabled={loading}
            />
            .
          </p>
        </div>

        {/* Vibe Selection */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">What's your vibe? (Select multiple)</h3>
          <div className="grid grid-cols-4 gap-3">
            {vibeOptions.map((vibe) => (
              <button
                key={vibe.value}
                type="button"
                onClick={() => handleVibeToggle(vibe.value)}
                disabled={loading}
                className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                  selectedVibes.includes(vibe.value)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="text-2xl mb-1">{vibe.emoji}</span>
                <span className="text-xs font-medium">{vibe.label}</span>
              </button>
            ))}
          </div>
          {selectedVibes.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-blue-600 mb-2">Selected vibes:</p>
              <div className="flex flex-wrap gap-2">
                {selectedVibes.map(vibeValue => {
                  const vibeInfo = vibeOptions.find(v => v.value === vibeValue);
                  return (
                    <span 
                      key={vibeValue}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {vibeInfo?.emoji} {vibeInfo?.label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button 
            type="submit" 
            disabled={loading || !city.trim() || !distance.trim() || !hours.trim()}
            className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
          >
            {loading ? 'Finding recommendations...' : 'Get Recommendations'}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-red-800 font-medium">Error:</h3>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      )}
      
      {response && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Recommendations:</h2>
          <div className="bg-gray-50 p-4 rounded-md border">
            <div className="whitespace-pre-wrap text-gray-800">{response}</div>
          </div>
        </div>
      )}
    </div>
  );
}
