'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: '15vh',
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
    background: 'rgba(76, 175, 80, 0.3)', // Green overlay on the image
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
      'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  '@media (max-width:600px)': {
    paddingTop: '12vh',
  },
  '@media (max-width:400px)': {
    paddingTop: '10vh',
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  maxWidth: '500px',
  width: '90%',
  height: 'auto',
  marginBottom: theme.spacing(1),
  zIndex: 4,
  position: 'relative',
  filter:
    'drop-shadow(0 8px 0px #000000) drop-shadow(0 12px 32px rgba(0, 0, 0, 0.6))',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    filter:
      'drop-shadow(0 10px 0px #000000) drop-shadow(0 15px 40px rgba(0, 0, 0, 0.8))',
  },
  '@media (max-width:600px)': {
    maxWidth: '350px',
    width: '85%',
    marginBottom: theme.spacing(0.5),
  },
  '@media (max-width:400px)': {
    maxWidth: '280px',
    width: '80%',
    marginBottom: theme.spacing(0.5),
  },
}));

const TaglineText = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 700,
  color: '#FFFFFF',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  textShadow:
    '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000',
  maxWidth: '600px',
  lineHeight: 1.4,
  position: 'relative',
  zIndex: 3,
  background: '#4CAF50',
  padding: theme.spacing(2.5, 3),
  paddingTop: theme.spacing(3.5),
  borderRadius: '20px',
  border: '3px solid #000000',
  boxShadow: '0 8px 0px #000000, 0 12px 32px rgba(0, 0, 0, 0.5)',
  marginTop: theme.spacing(-1),
  '@media (max-width:600px)': {
    fontSize: '1.1rem',
    maxWidth: '400px',
    padding: theme.spacing(2, 2),
    paddingTop: theme.spacing(2.8),
    marginTop: theme.spacing(-0.5),
  },
  '@media (max-width:400px)': {
    fontSize: '1rem',
    maxWidth: '320px',
    padding: theme.spacing(1.8, 1.8),
    paddingTop: theme.spacing(2.5),
  },
}));

const StartButton = styled(Button)(({ theme }) => ({
  fontSize: '1.3rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 900,
  padding: '20px 50px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
  color: '#000000',
  border: '4px solid #000000',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  position: 'relative',
  zIndex: 3,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  boxShadow: '0 8px 0px #000000, 0 12px 32px rgba(0, 0, 0, 0.4)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #FFA000 0%, #FFD700 100%)',
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
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
  animationDelay: delay,
  zIndex: 2,
  border: '4px solid #000000',
  boxShadow: '0 6px 0px #000000, 0 10px 20px rgba(0, 0, 0, 0.4)',
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
    border: '3px solid #000000',
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
          <LogoImage
            src='/ChatGPT%20Image%20Jul%2026,%202025,%2001_59_31%20PM.png'
            alt='VAMO Logo'
          />

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
    </HeroContainer>
  );
}
