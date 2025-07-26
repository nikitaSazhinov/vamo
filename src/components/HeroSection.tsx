'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url(/327abfeb40ffd946c6b877fbba3543ea.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed', // Parallax effect
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better text readability
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
      'radial-gradient(circle at 30% 70%, rgba(255, 20, 147, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(0, 255, 255, 0.2) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontFamily: 'var(--font-pacifico), cursive',
  fontWeight: 400,
  background: 'linear-gradient(45deg, #FFFFFF, #FFD700, #FFFFFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '4px 4px 0px #000000, -2px -2px 0px #FF1493',
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  position: 'relative',
  zIndex: 3,
  '@media (max-width:600px)': {
    fontSize: '3rem',
  },
  '@media (max-width:400px)': {
    fontSize: '2.5rem',
  },
}));

const TaglineText = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 700,
  color: '#FFFFFF',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  textShadow:
    '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 20, 147, 0.5)',
  maxWidth: '600px',
  lineHeight: 1.5,
  position: 'relative',
  zIndex: 3,
  background: 'rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(2, 3),
  borderRadius: '20px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  '@media (max-width:600px)': {
    fontSize: '1.1rem',
    maxWidth: '400px',
    padding: theme.spacing(1.5, 2),
  },
}));

const StartButton = styled(Button)(({ theme }) => ({
  fontSize: '1.2rem',
  fontFamily: 'var(--font-pacifico), cursive',
  fontWeight: 400,
  padding: '16px 48px',
  borderRadius: '50px',
  background: 'linear-gradient(45deg, #FF1493, #00FFFF)',
  color: '#FFFFFF',
  border: '4px solid #FFFFFF',
  boxShadow:
    '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
  textTransform: 'none',
  position: 'relative',
  zIndex: 3,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.05)',
    background: 'linear-gradient(45deg, #00FFFF, #FF1493)',
    boxShadow:
      '0 12px 48px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
    borderColor: '#FFD700',
  },
  '&:active': {
    transform: 'translateY(-2px) scale(1.02)',
  },
  '@media (max-width:600px)': {
    fontSize: '1rem',
    padding: '14px 36px',
  },
}));

const FloatingElement = styled(Box)<{
  top: string;
  left: string;
  delay: string;
}>(({ theme, top, left, delay }) => ({
  position: 'absolute',
  top,
  left,
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background:
    'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 20, 147, 0.3))',
  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
  animationDelay: delay,
  zIndex: 2,
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(5px)',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
    },
    '50%': {
      transform: 'translateY(-20px) rotate(180deg)',
    },
  },
  '@media (max-width:600px)': {
    width: '40px',
    height: '40px',
  },
}));

const ScrollIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: '#FFFFFF',
  animation: 'bounce 2s ease-in-out infinite',
  cursor: 'pointer',
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateX(-50%) translateY(0px)',
    },
    '50%': {
      transform: 'translateX(-50%) translateY(-10px)',
    },
  },
}));

const ScrollText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 600,
  color: '#FFFFFF',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
  marginBottom: theme.spacing(0.5),
}));

const ScrollArrow = styled(Box)(({ theme }) => ({
  width: '30px',
  height: '30px',
  border: '2px solid #FFFFFF',
  borderTop: 'none',
  borderRight: 'none',
  transform: 'rotate(-45deg)',
  animation: 'arrowMove 2s ease-in-out infinite',
  '@keyframes arrowMove': {
    '0%, 100%': {
      transform: 'rotate(-45deg) translateY(0px)',
    },
    '50%': {
      transform: 'rotate(-45deg) translateY(5px)',
    },
  },
}));

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <HeroContainer>
      {/* Floating decorative elements */}
      <FloatingElement top='20%' left='10%' delay='0s' />
      <FloatingElement top='30%' left='85%' delay='1s' />
      <FloatingElement top='70%' left='15%' delay='2s' />
      <FloatingElement top='60%' left='80%' delay='1.5s' />
      <FloatingElement top='40%' left='90%' delay='0.5s' />

      <Container maxWidth='md'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          px={2}
        >
          <LogoText variant='h1'>VAMO!</LogoText>

          <TaglineText variant='h4'>
            🌟 Your AI-powered adventure buddy! 🌟
            <br />
            Discover amazing activities tailored just for you, wherever you are
            ✨
          </TaglineText>

          <StartButton variant='contained' size='large' onClick={onGetStarted}>
            Let's Get You Started! 🚀
          </StartButton>
        </Box>
      </Container>

      <ScrollIndicator onClick={onGetStarted}>
        <ScrollText>Scroll Down</ScrollText>
        <ScrollArrow />
      </ScrollIndicator>
    </HeroContainer>
  );
}
