'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Card, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import HomeIcon from '@mui/icons-material/Home';
import ParkIcon from '@mui/icons-material/Park';

const WeatherContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  position: 'relative',
  padding: theme.spacing(4, 2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.05)',
    pointerEvents: 'none',
  },
}));

const WeatherCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  padding: theme.spacing(6),
  borderRadius: '30px',
  background: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '4px solid #FFFFFF',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

const LocationButton = styled(Button)(({ theme }) => ({
  fontSize: '1.2rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 700,
  padding: '15px 30px',
  borderRadius: '12px',
  border: '3px solid #000000',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  boxShadow: '0 6px 0px #000000',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 0px #000000',
  },
  '&:active': {
    transform: 'translateY(2px)',
    boxShadow: '0 4px 0px #000000',
  },
}));

const FloatingIcon = styled(Box)<{ top: string; left: string; delay: string }>(
  ({ theme, top, left, delay }) => ({
    position: 'absolute',
    top,
    left,
    fontSize: '40px',
    color: '#FFFFFF',
    animation: `float ${4 + Math.random() * 2}s ease-in-out infinite`,
    animationDelay: delay,
    zIndex: 2,
    textShadow: '2px 2px 0px #000000',
    '@keyframes float': {
      '0%, 100%': {
        transform: 'translateY(0px) rotate(0deg)',
      },
      '50%': {
        transform: 'translateY(-20px) rotate(10deg)',
      },
    },
  })
);

interface WeatherSectionProps {
  coordinates?: {
    latitude: number;
    longitude: number;
  } | null;
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return <WbSunnyIcon sx={{ fontSize: 80, color: '#FFD700' }} />;
  if (code >= 1 && code <= 3) return <CloudIcon sx={{ fontSize: 80, color: '#E0E0E0' }} />;
  if (code >= 51 && code <= 67) return <UmbrellaIcon sx={{ fontSize: 80, color: '#4682B4' }} />;
  if (code >= 71 && code <= 77) return <AcUnitIcon sx={{ fontSize: 80, color: '#B0E0E6' }} />;
  if (code >= 95 && code <= 99) return <ThunderstormIcon sx={{ fontSize: 80, color: '#4B0082' }} />;
  return <CloudIcon sx={{ fontSize: 80, color: '#E0E0E0' }} />;
};

const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Sunny';
  if (code >= 1 && code <= 3) return 'Cloudy';
  if (code >= 51 && code <= 67) return 'Rainy';
  if (code >= 71 && code <= 77) return 'Snowy';
  if (code >= 95 && code <= 99) return 'Stormy';
  return 'Unknown';
};

export default function WeatherSection({ coordinates }: WeatherSectionProps) {
  const [weather, setWeather] = useState<{ temperature: number; weatherCode: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preference, setPreference] = useState<'indoor' | 'outdoor' | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!coordinates) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,weather_code`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather data');

        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code
        });
      } catch (err) {
        setError('Failed to load weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coordinates]);

  if (!coordinates) return null;

  return (
    <WeatherContainer>
      <FloatingIcon top="10%" left="10%" delay="0s">🌤️</FloatingIcon>
      <FloatingIcon top="20%" left="85%" delay="1s">🌡️</FloatingIcon>
      <FloatingIcon top="80%" left="15%" delay="0.5s">🌈</FloatingIcon>
      <FloatingIcon top="70%" left="90%" delay="1.5s">⛅</FloatingIcon>

      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: '2.5rem',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 900,
              color: '#FF4500',
              textShadow: '4px 4px 0px #000000',
              marginBottom: 4,
              background: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '20px',
              border: '4px solid #000000',
              boxShadow: '0 8px 0px #333333',
            }}
          >
            🌈 Today's Weather
          </Typography>

          <WeatherCard>
            {loading ? (
              <Typography variant="h4" sx={{ color: 'white' }}>Loading...</Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ color: '#FF6B6B' }}>{error}</Typography>
            ) : weather ? (
              <>
                {getWeatherIcon(weather.weatherCode)}
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: '#FF69B4',
                    fontWeight: 700,
                    marginTop: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {weather.temperature}°C
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: 'white',
                    marginTop: 1,
                    marginBottom: 4,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  Today is {getWeatherDescription(weather.weatherCode)}
                </Typography>

                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white',
                    marginBottom: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  Where would you like to go?
                </Typography>

                <ButtonGroup variant="contained" size="large">
                  <LocationButton
                    onClick={() => setPreference('indoor')}
                    sx={{
                      background: preference === 'indoor' ? '#4CAF50' : '#FFFFFF',
                      color: preference === 'indoor' ? '#FFFFFF' : '#000000',
                    }}
                  >
                    <HomeIcon /> Indoors
                  </LocationButton>
                  <LocationButton
                    onClick={() => setPreference('outdoor')}
                    sx={{
                      background: preference === 'outdoor' ? '#4CAF50' : '#FFFFFF',
                      color: preference === 'outdoor' ? '#FFFFFF' : '#000000',
                    }}
                  >
                    <ParkIcon /> Outdoors
                  </LocationButton>
                </ButtonGroup>
              </>
            ) : null}
          </WeatherCard>
        </Box>
      </Container>
    </WeatherContainer>
  );
}
