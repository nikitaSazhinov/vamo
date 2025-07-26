'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-inter), "Arial", sans-serif',
    h1: {
      fontFamily: 'var(--font-pacifico), cursive',
      fontSize: '3rem',
      fontWeight: 400,
      textShadow: '3px 3px 0px #FF1493, -1px -1px 0px #00FFFF',
      background: 'linear-gradient(45deg, #FF1493, #00FFFF, #32CD32)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontFamily: 'var(--font-pacifico), cursive',
      fontSize: '2rem',
      fontWeight: 400,
      color: '#FF1493',
      textShadow: '2px 2px 0px #00FFFF',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontFamily: 'var(--font-pacifico), cursive',
      fontSize: '1.5rem',
      fontWeight: 400,
      color: '#8A2BE2',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    body1: {
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: '1.1rem',
      fontWeight: 500,
      color: '#2D2D2D',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: 'var(--font-pacifico), cursive',
      fontSize: '1rem',
      fontWeight: 400,
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#FF1493', // Hot Pink
      light: '#FF69B4',
      dark: '#C71585',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00FFFF', // Electric Cyan
      light: '#40E0D0',
      dark: '#008B8B',
      contrastText: '#000000',
    },
    error: {
      main: '#FF4500', // Orange Red
      light: '#FF6347',
      dark: '#DC143C',
    },
    warning: {
      main: '#FFD700', // Gold
      light: '#FFFF00',
      dark: '#FFA500',
    },
    success: {
      main: '#32CD32', // Lime Green
      light: '#90EE90',
      dark: '#228B22',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D2D2D',
      secondary: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          padding: '12px 32px',
          boxShadow: '0 4px 15px rgba(255, 20, 147, 0.4)',
          background: 'linear-gradient(45deg, #FF1493, #00FFFF)',
          border: '3px solid transparent',
          backgroundClip: 'padding-box',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(255, 20, 147, 0.6)',
            background: 'linear-gradient(45deg, #00FFFF, #FF1493)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        contained: {
          color: '#FFFFFF',
          fontWeight: 400,
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(45deg, #FF1493, #FF69B4)',
            '&:hover': {
              background: 'linear-gradient(45deg, #C71585, #FF1493)',
            },
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(45deg, #00FFFF, #40E0D0)',
            color: '#000000',
            '&:hover': {
              background: 'linear-gradient(45deg, #008B8B, #00FFFF)',
            },
          },
        },
        outlined: {
          border: '3px solid',
          borderImage: 'linear-gradient(45deg, #FF1493, #00FFFF) 1',
          background: 'transparent',
          '&:hover': {
            background:
              'linear-gradient(45deg, rgba(255, 20, 147, 0.1), rgba(0, 255, 255, 0.1))',
            borderImage: 'linear-gradient(45deg, #00FFFF, #FF1493) 1',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(255, 20, 147, 0.15)',
          border: '2px solid transparent',
          background:
            'linear-gradient(white, white) padding-box, linear-gradient(45deg, #FF1493, #00FFFF, #32CD32) border-box',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(255, 20, 147, 0.25)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: 600,
          padding: '8px 16px',
          height: 'auto',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        colorPrimary: {
          background: 'linear-gradient(45deg, #FF1493, #FF69B4)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #C71585, #FF1493)',
          },
        },
        colorSecondary: {
          background: 'linear-gradient(45deg, #00FFFF, #40E0D0)',
          color: '#000000',
          '&:hover': {
            background: 'linear-gradient(45deg, #008B8B, #00FFFF)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
  shape: {
    borderRadius: 20,
  },
  spacing: 8,
});

// Custom colors for the app
export const customColors = {
  neonPink: '#FF1493',
  electricCyan: '#00FFFF',
  limeGreen: '#32CD32',
  sunshineYellow: '#FFD700',
  purpleHaze: '#8A2BE2',
  orangeBurst: '#FF4500',
  bubblegumPink: '#FF69B4',
  mintGreen: '#00FA9A',
  lavenderPurple: '#DDA0DD',
  coralReef: '#FF7F50',
};
