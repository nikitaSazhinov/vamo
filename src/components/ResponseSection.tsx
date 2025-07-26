'use client';

import { Box, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Markdown from 'markdown-to-jsx';

const ResponseContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: theme.spacing(3, 2),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/327abfeb40ffd946c6b877fbba3543ea.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.6,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(45deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 20, 147, 0.2) 25%, rgba(0, 255, 255, 0.2) 50%, rgba(50, 205, 50, 0.2) 75%, rgba(138, 43, 226, 0.3) 100%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem',
  fontFamily: 'var(--font-pacifico), cursive',
  fontWeight: 400,
  color: '#FFFFFF',
  textShadow: '4px 4px 0px #000000, 0 0 30px rgba(255, 215, 0, 0.8)',
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(2, 3),
  borderRadius: '25px',
  border: '3px solid rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(15px)',
  '@media (max-width:600px)': {
    fontSize: '2.2rem',
    padding: theme.spacing(1.5, 2),
  },
}));

const ResponseContent = styled(Paper)(({ theme }) => ({
  maxWidth: '800px',
  maxHeight: '60vh',
  overflow: 'auto',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(15px)',
  border: '3px solid rgba(255, 255, 255, 0.6)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  position: 'relative',
  zIndex: 3,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(45deg, #FF1493, #00FFFF)',
    borderRadius: '4px',
  },
  '@media (max-width:600px)': {
    maxWidth: '90%',
    maxHeight: '50vh',
    padding: theme.spacing(2),
  },
}));

const ResponseText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 400,
  lineHeight: 1.6,
  color: '#333333',
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    color: '#FF1493',
    fontWeight: 600,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  '& strong, & b': {
    color: '#00FFFF',
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
    color: '#FF1493',
    textDecoration: 'none',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& blockquote': {
    borderLeft: '4px solid #00FFFF',
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(2, 0),
    fontStyle: 'italic',
    background: 'rgba(0, 255, 255, 0.1)',
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
  '& code': {
    background: 'rgba(255, 20, 147, 0.1)',
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
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(2, 3),
  borderRadius: '20px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 600,
  color: '#FF6B6B',
  textAlign: 'center',
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(255, 107, 107, 0.1)',
  padding: theme.spacing(2, 3),
  borderRadius: '20px',
  border: '2px solid rgba(255, 107, 107, 0.3)',
  backdropFilter: 'blur(10px)',
}));

interface ResponseSectionProps {
  response: string;
  loading: boolean;
  error: string;
}

export default function ResponseSection({ response, loading, error }: ResponseSectionProps) {
  const handleContentScroll = (event: React.WheelEvent) => {
    // Stop propagation to prevent the main page scroll from interfering
    event.stopPropagation();
  };

  return (
    <ResponseContainer>
      <SectionTitle>Your Recommendations</SectionTitle>
      
      {loading && (
        <LoadingText>
          Finding amazing places for you...
        </LoadingText>
      )}
      
      {error && (
        <ErrorText>
          {error}
        </ErrorText>
      )}
      
      {response && !loading && !error && (
        <ResponseContent onWheel={handleContentScroll} data-scrollable-content>
          <ResponseText>
            <Markdown>
              {response}
            </Markdown>
          </ResponseText>
        </ResponseContent>
      )}
    </ResponseContainer>
  );
} 