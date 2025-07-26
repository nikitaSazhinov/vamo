'use client';

import { Box, Typography, Button, Container, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LocationContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url(/543cd4340af9d07ebc9a17e6e5c0dc8b.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  padding: theme.spacing(4, 2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better readability
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(circle at 20% 80%, rgba(255, 20, 147, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.2) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontFamily: 'var(--font-pacifico), cursive',
  fontWeight: 400,
  color: '#FFFFFF',
  textShadow: '4px 4px 0px #000000, 0 0 20px rgba(255, 215, 0, 0.8)',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(0, 0, 0, 0.4)',
  padding: theme.spacing(2, 3),
  borderRadius: '20px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  '@media (max-width:600px)': {
    fontSize: '2rem',
    padding: theme.spacing(1.5, 2),
  },
}));

const MapPlaceholder = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  height: '350px',
  borderRadius: '30px',
  background:
    'linear-gradient(135deg, rgba(50, 205, 50, 0.9) 0%, rgba(0, 250, 154, 0.9) 50%, rgba(64, 224, 208, 0.9) 100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  marginBottom: theme.spacing(4),
  border: '4px solid #FFFFFF',
  boxShadow:
    '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 4px 8px rgba(255, 255, 255, 0.3)',
  overflow: 'hidden',
  zIndex: 3,
  backdropFilter: 'blur(10px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px)',
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
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  marginBottom: theme.spacing(2),
  animation: 'pulse 2s ease-in-out infinite',
  filter: 'drop-shadow(0 0 10px rgba(255, 20, 147, 0.6))',
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
  fontFamily: 'var(--font-pacifico), cursive',
  fontWeight: 400,
  color: '#FFFFFF',
  textAlign: 'center',
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)',
  position: 'relative',
  zIndex: 1,
  '@media (max-width:600px)': {
    fontSize: '1.2rem',
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  fontSize: '1.1rem',
  fontFamily: 'var(--font-pacifico), cursive',
  fontWeight: 400,
  padding: '16px 40px',
  borderRadius: '50px',
  background: 'linear-gradient(45deg, #FFFFFF, #F8F8FF)',
  color: '#8A2BE2',
  border: '3px solid #FFFFFF',
  boxShadow:
    '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(138, 43, 226, 0.2)',
  textTransform: 'none',
  position: 'relative',
  zIndex: 3,
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    transform: 'translateY(-4px) scale(1.05)',
    background: 'linear-gradient(45deg, #FFD700, #FFFFFF)',
    boxShadow:
      '0 12px 48px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 215, 0, 0.3)',
    color: '#FF1493',
    borderColor: '#FFD700',
  },
  '&:active': {
    transform: 'translateY(-2px) scale(1.02)',
  },
  '@media (max-width:600px)': {
    fontSize: '1rem',
    padding: '14px 32px',
  },
}));

const FloatingIcon = styled(Box)<{ top: string; left: string; delay: string }>(
  ({ theme, top, left, delay }) => ({
    position: 'absolute',
    top,
    left,
    fontSize: '40px',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: `float ${4 + Math.random() * 2}s ease-in-out infinite`,
    animationDelay: delay,
    zIndex: 2,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    filter: 'drop-shadow(0 0 8px rgba(255, 20, 147, 0.4))',
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
  onConfirmLocation: () => void;
}

export default function LocationSection({
  onConfirmLocation,
}: LocationSectionProps) {
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

          <MapPlaceholder elevation={8}>
            <MapIcon />
            <MapText>
              🗺️ Map Coming Soon! 🗺️
              <br />
              Your location will appear here
            </MapText>
          </MapPlaceholder>

          <ConfirmButton
            variant='contained'
            size='large'
            onClick={onConfirmLocation}
          >
            <CheckCircleIcon sx={{ fontSize: '24px' }} />
            Yes, This Is My Location! ✨
          </ConfirmButton>
        </Box>
      </Container>
    </LocationContainer>
  );
}
