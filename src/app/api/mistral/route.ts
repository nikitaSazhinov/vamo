import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { prompt, coordinates } = await request.json();

  if (!prompt) {
    return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
  }

  try {
    console.log('Making request to Mistral API with prompt:', prompt);
    
    // First, determine the city/location from coordinates using reverse geocoding
    let locationInfo = '';
    if (coordinates) {
      try {
        const geocodeResponse = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}&zoom=10&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'VamoApp/1.0'
            },
            timeout: 5000 // 5 second timeout
          }
        );
        
        const locationData = geocodeResponse.data;
        
        // Try to get the most specific location name available
        const city = locationData.address?.city || 
                    locationData.address?.town || 
                    locationData.address?.village || 
                    locationData.address?.suburb ||
                    locationData.address?.county ||
                    locationData.address?.state ||
                    'this area';
        
        const state = locationData.address?.state;
        const country = locationData.address?.country;
        
        // Only include state if it's different from city
        const locationString = city === state ? 
          `${city}${country ? `, ${country}` : ''}` :
          `${city}${state ? `, ${state}` : ''}${country ? `, ${country}` : ''}`;
        
        locationInfo = `You are located in ${locationString}. `;
        console.log('Location determined:', locationInfo);
      } catch (geocodeError) {
        console.error('Error getting location info:', geocodeError);
        // Fallback: use coordinates but mention they're approximate
        locationInfo = `You are located at coordinates ${coordinates.latitude}, ${coordinates.longitude}. `;
      }
    } else {
      locationInfo = 'You are located at the provided coordinates. ';
    }
    
    // Enhanced prompt to request structured content with location context
    const cityName = locationInfo.match(/in ([^,]+)/)?.[1] || 'this area';
    const enhancedPrompt = `${locationInfo}${prompt}

Please format your response with clear structure using:
- Headers (## for main sections, ### for subsections)
- Bold text (**text**) for emphasis
- Bullet points (* item) for lists
- Clear paragraphs separated by line breaks

Make the content visually appealing and easy to read.

Important: Provide recommendations that are actually available in ${cityName}. Focus on real places, venues, and activities that would be found in this specific location. If you're not certain about exact place names, describe the types of venues and activities that would be typical for this area.`;

    const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
      model: 'mistral-tiny',
      messages: [
        {
          role: 'user',
          content: enhancedPrompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
    });

    console.log('Mistral API response:', response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error calling Mistral API:', error);
    
    // Log more detailed error information
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request was made but no response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    return NextResponse.json({ 
      message: 'Internal server error',
      error: error.message,
      status: error.response?.status || 'unknown'
    }, { status: 500 });
  }
}
