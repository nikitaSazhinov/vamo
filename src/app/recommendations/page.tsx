'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Markdown from 'markdown-to-jsx';

const RecommendationsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: '0px',
  paddingBottom: '60px',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/327abfeb40ffd946c6b877fbba3543ea.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center left',
    backgroundRepeat: 'no-repeat',
    opacity: 0.6,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/543cd4340af9d07ebc9a17e6e5c0dc8b.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
    backgroundRepeat: 'no-repeat',
    opacity: 0.6,
    zIndex: 1,
  },
}));

const OverlayBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'linear-gradient(45deg, rgba(0, 0, 0, 0.4) 0%, rgba(34, 193, 195, 0.2) 25%, rgba(253, 187, 45, 0.2) 50%, rgba(50, 205, 50, 0.2) 75%, rgba(138, 43, 226, 0.3) 100%)',
  zIndex: 2,
  pointerEvents: 'none',
}));

const Navbar = styled(Box)(({ theme }) => ({
  width: '100%',
  background: 'transparent',
  position: 'relative',
  zIndex: 5,
  padding: theme.spacing(2, 0),
  '@media (max-width:600px)': {
    padding: theme.spacing(1.5, 0),
  },
}));

const NavbarContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(0, 3),
  '@media (max-width:600px)': {
    padding: theme.spacing(0, 2),
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: '60px',
  width: 'auto',
  filter:
    'drop-shadow(0 4px 0px #000000) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6))',
  transition: 'all 0.3s ease',
  '&:hover': {
    filter:
      'drop-shadow(0 6px 0px #000000) drop-shadow(0 12px 25px rgba(0, 0, 0, 0.8))',
  },
  '@media (max-width:600px)': {
    height: '50px',
  },
}));

const BackButton = styled(Box)(({ theme }) => ({
  fontSize: '1.1rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 900,
  padding: '16px 32px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#FFFFFF',
  border: '4px solid #000000',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  boxShadow: '0 8px 0px #000000, 0 12px 32px rgba(0, 0, 0, 0.4)',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
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
    fontSize: '1rem',
    padding: '14px 28px',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 800,
  color: '#FFFFFF',
  textShadow: '4px 4px 8px #000000, 0 0 20px rgba(0, 0, 0, 0.8)',
  textAlign: 'center',
  position: 'relative',
  zIndex: 3,
  background: 'linear-gradient(135deg, #FF1493 0%, #00FFFF 100%)',
  padding: theme.spacing(1.5, 2.5),
  borderRadius: '20px',
  border: '3px solid #000000',
  backdropFilter: 'blur(15px)',
  letterSpacing: '0.02em',
  boxShadow: '0 8px 0px #000000, 0 12px 32px rgba(0, 0, 0, 0.6)',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  '@media (max-width:600px)': {
    fontSize: '1.8rem',
    padding: theme.spacing(1.2, 2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ResponseContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  border: '3px solid #000000',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  position: 'relative',
  zIndex: 3,
  marginLeft: 0,
  marginRight: 'auto',
  '@media (max-width:768px)': {
    padding: theme.spacing(3),
    marginLeft: 0,
    marginRight: theme.spacing(2),
  },
}));

const ResponseText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 400,
  lineHeight: 1.6,
  color: '#000000',
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    color: '#000000',
    fontWeight: 600,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  '& strong, & b': {
    color: '#000000',
    fontWeight: 600,
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
  },
  '& li': {
    marginBottom: theme.spacing(0.5),
  },
  '& p': {
    marginBottom: theme.spacing(1.5),
  },
  '& a': {
    color: '#000000',
    textDecoration: 'none',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& blockquote': {
    borderLeft: '4px solid #000000',
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(2, 0),
    fontStyle: 'italic',
    background: 'rgba(0, 0, 0, 0.05)',
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
  '& code': {
    background: 'rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(0.5, 1),
    borderRadius: '4px',
    fontFamily: 'monospace',
  },
  '& pre': {
    background: 'rgba(0, 0, 0, 0.05)',
    padding: theme.spacing(2),
    borderRadius: '8px',
    overflow: 'auto',
    margin: theme.spacing(2, 0),
  },
  '@media (max-width:600px)': {
    fontSize: '1rem',
  },
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 600,
  color: '#FFFFFF',
  textAlign: 'center',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(0, 0, 0, 0.6)',
  padding: theme.spacing(2, 3),
  borderRadius: '16px',
  border: '2px solid rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.5)',
  animation: 'pulse 2s ease-in-out infinite alternate',
  '@keyframes pulse': {
    '0%': {
      opacity: 0.7,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 600,
  color: '#ff6b6b',
  textAlign: 'center',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(255, 107, 107, 0.1)',
  padding: theme.spacing(2, 3),
  borderRadius: '16px',
  border: '2px solid rgba(255, 107, 107, 0.4)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.5)',
}));

function RecommendationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const response = searchParams.get('response');
    const loadingParam = searchParams.get('loading');
    const errorParam = searchParams.get('error');

    if (loadingParam === 'true') {
      setLoading(true);
      // Poll for results or handle real-time updates here if needed
    } else {
      setLoading(false);
    }

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }

    if (response) {
      setRecommendations(decodeURIComponent(response));
    }
  }, [searchParams]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <RecommendationsContainer>
      <OverlayBox />

      {/* Navbar */}
      <Navbar>
        <NavbarContent>
          <LogoContainer onClick={handleLogoClick}>
            <LogoImage
              src='/ChatGPT%20Image%20Jul%2026,%202025,%2001_59_31%20PM.png'
              alt='VAMO Logo'
            />
          </LogoContainer>
          <BackButton onClick={handleBackClick}>← Back to Search</BackButton>
        </NavbarContent>
      </Navbar>

      <Container
        maxWidth='xl'
        sx={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          paddingLeft: '12px',
          paddingRight: '12px',
        }}
      >
        <SectionTitle>Recommendations</SectionTitle>

        {loading && (
          <LoadingText>🔍 Finding amazing places for you...</LoadingText>
        )}

        {error && <ErrorText>❌ {error}</ErrorText>}

        {recommendations && !loading && !error && (
          <ResponseContent>
            <ResponseText>
              <Markdown>
                {recommendations}
              </Markdown>
            </ResponseText>
          </ResponseContent>
        )}

        {!recommendations && !loading && !error && (
          <ResponseContent>
            <ResponseText>
              No recommendations found. Please go back and try again.
            </ResponseText>
          </ResponseContent>
        )}
      </Container>
    </RecommendationsContainer>
  );
}

export default function RecommendationsPage() {
  return (
    <Suspense
      fallback={
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
        >
          <Typography>Loading...</Typography>
        </Box>
      }
    >
      <RecommendationsContent />
    </Suspense>
  );
}
