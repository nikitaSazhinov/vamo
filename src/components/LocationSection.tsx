'use client';

import { Box, Typography, Button, Container, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';
import Map from './Map';

const LocationContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #FFFF00 0%, #FFD700 100%)',
  position: 'relative',
  padding: theme.spacing(4, 2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.05)', // Very light overlay
    pointerEvents: 'none',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 900,
  color: '#FF4500',
  textShadow:
    '4px 4px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  zIndex: 3,
  background: '#FFFFFF',
  padding: theme.spacing(1.5, 3),
  borderRadius: '20px',
  border: '4px solid #000000',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  boxShadow: '0 8px 0px #333333, 0 12px 32px rgba(0, 0, 0, 0.6)',
  '@media (max-width:600px)': {
    fontSize: '2rem',
    padding: theme.spacing(1.2, 2),
  },
}));

const MapContainer = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  height: '350px',
  borderRadius: '30px',
  overflow: 'hidden',
  position: 'relative',
  marginBottom: theme.spacing(4),
  border: '4px solid #FFFFFF',
  boxShadow:
    '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 4px 8px rgba(255, 255, 255, 0.3)',
  zIndex: 3,
  backdropFilter: 'blur(10px)',
  '@media (max-width:600px)': {
    height: '280px',
    maxWidth: '400px',
  },
}));

const MapPlaceholder = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  height: '350px',
  borderRadius: '20px',
  background:
    'linear-gradient(135deg, rgba(50, 205, 50, 0.9) 0%, rgba(0, 250, 154, 0.9) 50%, rgba(64, 224, 208, 0.9) 100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  marginBottom: theme.spacing(4),
  border: '4px solid #000000',
  boxShadow: '0 8px 0px #000000, 0 12px 32px rgba(0, 0, 0, 0.5)',
  overflow: 'hidden',
  zIndex: 3,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.1) 10px, rgba(0, 0, 0, 0.1) 20px)',
    pointerEvents: 'none',
  },
  '@media (max-width:600px)': {
    height: '280px',
    maxWidth: '400px',
  },
}));

const MapIcon = styled(LocationOnIcon)(({ theme }) => ({
  fontSize: '80px',
  color: '#FFFFFF',
  textShadow:
    '4px 4px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000',
  marginBottom: theme.spacing(2),
  animation: 'pulse 2s ease-in-out infinite',
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))',
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
  },
  '@media (max-width:600px)': {
    fontSize: '60px',
  },
}));

const MapText = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 700,
  color: '#FFFFFF',
  textAlign: 'center',
  textShadow:
    '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000',
  position: 'relative',
  zIndex: 1,
  '@media (max-width:600px)': {
    fontSize: '1.2rem',
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  fontSize: '1.3rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 900,
  padding: '20px 50px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
  color: '#FFFFFF',
  border: '4px solid #000000',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  position: 'relative',
  zIndex: 3,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  overflow: 'hidden',
  boxShadow: '0 8px 0px #000000, 0 12px 32px rgba(0, 0, 0, 0.4)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 0px #000000, 0 15px 40px rgba(0, 0, 0, 0.6)',
    '&:before': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(2px)',
    boxShadow: '0 4px 0px #000000, 0 8px 20px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.1s ease',
  },
  '@media (max-width:600px)': {
    fontSize: '1.1rem',
    padding: '18px 40px',
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
    textShadow:
      '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6))',
    '@keyframes float': {
      '0%, 100%': {
        transform: 'translateY(0px) rotate(0deg)',
      },
      '50%': {
        transform: 'translateY(-30px) rotate(180deg)',
      },
    },
    '@media (max-width:600px)': {
      fontSize: '30px',
    },
  })
);

interface LocationSectionProps {
  onConfirmLocation: (location: {latitude: number; longitude: number}) => void;
}

export default function LocationSection({
  onConfirmLocation,
}: LocationSectionProps) {
  const [location, setLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }

      setIsLoading(true);
      setError('');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          setError('Unable to retrieve your location');
          setIsLoading(false);
        }
      );
    };

    getUserLocation();
  }, []);

  const handleConfirmClick = () => {
    if (location) {
      onConfirmLocation(location);
    }
  };

  return (
    <LocationContainer>
      {/* Floating decorative icons */}
      <FloatingIcon top='15%' left='5%' delay='0s'>
        📍
      </FloatingIcon>
      <FloatingIcon top='25%' left='90%' delay='1s'>
        🗺️
      </FloatingIcon>
      <FloatingIcon top='75%' left='10%' delay='2s'>
        🧭
      </FloatingIcon>
      <FloatingIcon top='65%' left='85%' delay='1.5s'>
        📱
      </FloatingIcon>

      <Container maxWidth='md'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <SectionTitle variant='h2'>📍 Let's Get Your Location!</SectionTitle>

          {location ? (
            <MapContainer elevation={8}>
              <Map 
                coordinates={location}
                isLoading={false}
              />
            </MapContainer>
          ) : (
            <MapPlaceholder elevation={8}>
              <MapIcon />
              <MapText>
                {isLoading ? 'Getting your location...' : 
                 error ? `❌ ${error}` :
                 '🗺️ Getting your location... 🗺️'
                }
              </MapText>
            </MapPlaceholder>
          )}

          <ConfirmButton
            variant='contained'
            size='large'
            onClick={handleConfirmClick}
            disabled={!location || isLoading}
          >
            <CheckCircleIcon sx={{ fontSize: '24px' }} />
            {location ? 'Yes, This Is My Location! ✨' : 'Getting Location...'}
          </ConfirmButton>
        </Box>
      </Container>
    </LocationContainer>
  );
}
