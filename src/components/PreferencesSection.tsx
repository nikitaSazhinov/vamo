'use client';

import { Box, Typography, Container, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const PreferencesContainer = styled(Box)(({ theme }) => ({
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
    'linear-gradient(45deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 20, 147, 0.2) 25%, rgba(0, 255, 255, 0.2) 50%, rgba(50, 205, 50, 0.2) 75%, rgba(138, 43, 226, 0.3) 100%)',
  zIndex: 2,
  pointerEvents: 'none',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem',
  fontFamily: 'var(--font-pacifico), cursive',
  fontWeight: 400,
  color: '#FFFFFF',
  textShadow: '4px 4px 0px #000000, 0 0 30px rgba(255, 215, 0, 0.8)',
  marginBottom: theme.spacing(1.5),
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

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 700,
  color: '#FFFFFF',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(0, 0, 0, 0.4)',
  padding: theme.spacing(1.5, 2.5),
  borderRadius: '20px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  '@media (max-width:600px)': {
    fontSize: '1rem',
    padding: theme.spacing(1, 2),
  },
}));

const PreferenceChip = styled(Chip)<{ isSelected: boolean }>(
  ({ theme, isSelected }) => ({
    fontSize: '1.1rem',
    fontFamily: 'var(--font-pacifico), cursive',
    fontWeight: 400,
    padding: '16px 24px',
    height: 'auto',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '3px solid transparent',
    position: 'relative',
    zIndex: 3,
    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isSelected
      ? '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 20, 147, 0.6)'
      : '0 6px 20px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',

    '&:hover': {
      transform: 'scale(1.1) translateY(-4px)',
      boxShadow:
        '0 15px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 20, 147, 0.7)',
    },

    '&:active': {
      transform: 'scale(1.05) translateY(-2px)',
    },

    '@media (max-width:600px)': {
      fontSize: '0.95rem',
      padding: '12px 20px',
    },
  })
);

const FloatingEmoji = styled(Box)<{ top: string; left: string; delay: string }>(
  ({ theme, top, left, delay }) => ({
    position: 'absolute',
    top,
    left,
    fontSize: '50px',
    animation: `float ${5 + Math.random() * 3}s ease-in-out infinite`,
    animationDelay: delay,
    zIndex: 2,
    opacity: 0.8,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
    filter: 'drop-shadow(0 0 10px rgba(255, 20, 147, 0.4))',
    '@keyframes float': {
      '0%, 100%': {
        transform: 'translateY(0px) rotate(0deg)',
      },
      '50%': {
        transform: 'translateY(-40px) rotate(360deg)',
      },
    },
    '@media (max-width:600px)': {
      fontSize: '35px',
    },
  })
);

interface PreferencesSectionProps {
  onPreferencesSelected: (preferences: string[]) => void;
}

const preferences = [
  { label: '🛋️ Lazy & Chill', value: 'lazy', color: '#FF69B4' },
  { label: '☕ Cozy Vibes', value: 'cozy', color: '#DDA0DD' },
  { label: '🏃 Adventurous', value: 'adventurous', color: '#32CD32' },
  { label: '🎨 Artsy & Creative', value: 'artsy', color: '#FF4500' },
  { label: '🍕 Foodie Adventures', value: 'foodie', color: '#FFD700' },
  { label: '🛍️ Shopping Spree', value: 'shopping', color: '#00FFFF' },
  { label: '🌿 Nature Lover', value: 'nature', color: '#90EE90' },
  { label: '🎵 Music & Nightlife', value: 'nightlife', color: '#8A2BE2' },
  { label: '📚 Learning & Culture', value: 'culture', color: '#FF6347' },
  { label: '💪 Fitness & Sports', value: 'fitness', color: '#00FA9A' },
  { label: '📸 Instagram Worthy', value: 'instagram', color: '#FF1493' },
  { label: '👥 Social & Fun', value: 'social', color: '#40E0D0' },
];

export default function PreferencesSection({
  onPreferencesSelected,
}: PreferencesSectionProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const handlePreferenceToggle = (value: string) => {
    const newPreferences = selectedPreferences.includes(value)
      ? selectedPreferences.filter((p) => p !== value)
      : [...selectedPreferences, value];

    setSelectedPreferences(newPreferences);
    onPreferencesSelected(newPreferences);
  };

  const getChipStyle = (preference: any, isSelected: boolean) => ({
    background: isSelected
      ? `linear-gradient(45deg, ${preference.color}, rgba(255, 255, 255, 0.2))`
      : `linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))`,
    color: isSelected ? '#FFFFFF' : preference.color,
    border: isSelected
      ? `3px solid ${preference.color}`
      : '3px solid rgba(255, 255, 255, 0.5)',
    fontWeight: isSelected ? 600 : 400,
  });

  return (
    <PreferencesContainer>
      <OverlayBox />

      {/* Floating decorative emojis */}
      <FloatingEmoji top='10%' left='5%' delay='0s'>
        ✨
      </FloatingEmoji>
      <FloatingEmoji top='20%' left='92%' delay='1s'>
        🎯
      </FloatingEmoji>
      <FloatingEmoji top='30%' left='8%' delay='2s'>
        💫
      </FloatingEmoji>
      <FloatingEmoji top='80%' left='90%' delay='1.5s'>
        🌟
      </FloatingEmoji>
      <FloatingEmoji top='70%' left='5%' delay='0.5s'>
        🎨
      </FloatingEmoji>
      <FloatingEmoji top='85%' left='15%' delay='2.5s'>
        🎪
      </FloatingEmoji>

      <Container maxWidth='lg'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <SectionTitle variant='h2'>
            ✨ What's Your Vibe Today? ✨
          </SectionTitle>

          <SubTitle>
            Pick all the activities that spark your interest! The more you
            choose, the better we can help you! 🌈
          </SubTitle>

          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='center'
            gap={2}
            maxWidth='800px'
          >
            {preferences.map((preference) => {
              const isSelected = selectedPreferences.includes(preference.value);

              return (
                <PreferenceChip
                  key={preference.value}
                  label={preference.label}
                  onClick={() => handlePreferenceToggle(preference.value)}
                  isSelected={isSelected}
                  sx={getChipStyle(preference, isSelected)}
                />
              );
            })}
          </Box>

          {selectedPreferences.length > 0 && (
            <Box mt={4}>
              <Typography
                variant='h6'
                sx={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 600,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '12px 24px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  zIndex: 3,
                  position: 'relative',
                }}
              >
                🎉 {selectedPreferences.length} vibe
                {selectedPreferences.length !== 1 ? 's' : ''} selected! Ready to
                discover amazing activities! 🎉
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </PreferencesContainer>
  );
}
