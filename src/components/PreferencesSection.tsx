'use client';

import { Box, Typography, Container, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useMemo } from 'react';

const PreferencesContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: '20px',
  paddingBottom: '60px', // Increased bottom padding to prevent cutoff
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 800,
  color: '#FFFFFF',
  textShadow: '4px 4px 8px #000000, 0 0 20px rgba(0, 0, 0, 0.8)',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  textAlign: 'center',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(0, 0, 0, 0.7)',
  padding: theme.spacing(1.5, 2.5),
  borderRadius: '20px',
  border: '3px solid rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(15px)',
  letterSpacing: '0.02em',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
  maxWidth: '90%',
  '@media (max-width:600px)': {
    fontSize: '1.8rem',
    padding: theme.spacing(1.2, 2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 600,
  color: '#FFFFFF',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
  position: 'relative',
  zIndex: 3,
  background: 'rgba(0, 0, 0, 0.6)',
  padding: theme.spacing(1.2, 2),
  borderRadius: '16px',
  border: '2px solid rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.5)',
  maxWidth: '90%',
  '@media (max-width:600px)': {
    fontSize: '1rem',
    padding: theme.spacing(1, 1.5),
    marginBottom: theme.spacing(2),
  },
}));

const SelectedPreferencesContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  marginBottom: theme.spacing(3),
  position: 'relative',
  zIndex: 3,
  minHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SelectedTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 700,
  color: '#FFFFFF',
  textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
  marginBottom: theme.spacing(1.5),
  textAlign: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(1, 2),
  borderRadius: '12px',
  border: '2px solid #000000',
  boxShadow: '0 4px 0px #000000, 0 6px 20px rgba(0, 0, 0, 0.4)',
  '@media (max-width:600px)': {
    fontSize: '1rem',
    padding: theme.spacing(0.8, 1.5),
  },
}));

const SelectedChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacing(1.2),
  marginBottom: theme.spacing(3),
  minHeight: '50px',
  width: '100%',
  padding: theme.spacing(1),
  '@media (max-width:600px)': {
    gap: theme.spacing(0.8),
    marginBottom: theme.spacing(2),
  },
}));

const PreferenceChip = styled(Chip)<{
  isSelected: boolean;
  isInSelectedArea?: boolean;
}>(({ theme, isSelected, isInSelectedArea }) => ({
  fontSize: isInSelectedArea ? '0.9rem' : '1rem',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 600,
  padding: isInSelectedArea ? '10px 16px' : '14px 20px',
  margin: isInSelectedArea ? '4px' : '8px',
  height: 'auto',
  borderRadius: '25px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: isSelected ? '3px solid #000000' : '2px solid #000000',
  position: 'relative',
  zIndex: 3,
  boxShadow: isSelected
    ? '0 6px 0px #000000, 0 8px 25px rgba(0, 0, 0, 0.4)'
    : '0 4px 0px #000000, 0 6px 15px rgba(0, 0, 0, 0.3)',
  opacity: 1,
  transform: 'scale(1)',
  minWidth: 'fit-content',
  whiteSpace: 'nowrap',

  '&:hover': {
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: '0 8px 0px #000000, 0 10px 30px rgba(0, 0, 0, 0.5)',
  },

  '&:active': {
    transform: 'scale(1.02) translateY(1px)',
    boxShadow: '0 2px 0px #000000, 0 4px 10px rgba(0, 0, 0, 0.3)',
  },

  '@media (max-width:600px)': {
    fontSize: isInSelectedArea ? '0.8rem' : '0.9rem',
    padding: isInSelectedArea ? '8px 14px' : '12px 18px',
    margin: isInSelectedArea ? '3px' : '6px',
  },
}));

const PreferencesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: '1200px',
  justifyItems: 'center',
  position: 'relative',
  zIndex: 3,
  marginBottom: theme.spacing(4),
  padding: theme.spacing(1),
  '@media (max-width:768px)': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(3),
  },
  '@media (max-width:480px)': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: theme.spacing(1.2),
    marginBottom: theme.spacing(2),
  },
}));

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
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
    filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.6))',
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

const allPreferences = [
  {
    label: '🏃 Adventurous',
    value: 'adventurous',
    color: '#32CD32',
    category: 'active',
  },
  {
    label: '💪 Fitness & Sports',
    value: 'fitness',
    color: '#00FA9A',
    category: 'active',
  },
  {
    label: '⛰️ Mountain Hiking',
    value: 'hiking',
    color: '#8FBC8F',
    category: 'active',
  },
  {
    label: '🚴 Biking Around',
    value: 'biking',
    color: '#32CD32',
    category: 'active',
  },
  {
    label: '🧗 Rock Climbing',
    value: 'climbing',
    color: '#8B4513',
    category: 'active',
  },
  {
    label: '🏄 Extreme Sports',
    value: 'extreme',
    color: '#FF6347',
    category: 'active',
  },
  {
    label: '🏊 Swimming',
    value: 'swimming',
    color: '#00CED1',
    category: 'active',
  },
  {
    label: '🌊 Surfing',
    value: 'surfing',
    color: '#20B2AA',
    category: 'active',
  },
  {
    label: '🧊 Ice Skating',
    value: 'iceskating',
    color: '#B0E0E6',
    category: 'active',
  },
  {
    label: '🏕️ Camping',
    value: 'camping',
    color: '#228B22',
    category: 'active',
  },

  {
    label: '🎨 Artsy & Creative',
    value: 'artsy',
    color: '#FF4500',
    category: 'creative',
  },
  {
    label: '📚 Learning & Culture',
    value: 'culture',
    color: '#FF6347',
    category: 'creative',
  },
  {
    label: '🎭 Theater & Shows',
    value: 'theater',
    color: '#DDA0DD',
    category: 'creative',
  },
  {
    label: '🎵 Music & Nightlife',
    value: 'nightlife',
    color: '#8A2BE2',
    category: 'creative',
  },
  {
    label: '🎸 Live Music',
    value: 'livemusic',
    color: '#FF4500',
    category: 'creative',
  },
  {
    label: '🏛️ Museums & History',
    value: 'museums',
    color: '#CD853F',
    category: 'creative',
  },
  {
    label: '🎨 Art Galleries',
    value: 'artgallery',
    color: '#9370DB',
    category: 'creative',
  },
  {
    label: '📖 Book Cafes',
    value: 'books',
    color: '#8B4513',
    category: 'creative',
  },
  {
    label: '🎨 DIY Crafts',
    value: 'crafts',
    color: '#DDA0DD',
    category: 'creative',
  },
  {
    label: '🏰 Historical Sites',
    value: 'history',
    color: '#A0522D',
    category: 'creative',
  },

  {
    label: '🍕 Foodie Adventures',
    value: 'foodie',
    color: '#FFD700',
    category: 'food',
  },
  {
    label: '🍸 Cocktails & Bars',
    value: 'cocktails',
    color: '#FF69B4',
    category: 'food',
  },
  {
    label: '🍳 Cooking Classes',
    value: 'cooking',
    color: '#FFA500',
    category: 'food',
  },
  {
    label: '🍦 Sweet Treats',
    value: 'desserts',
    color: '#FFB6C1',
    category: 'food',
  },
  {
    label: '🍷 Wine Tasting',
    value: 'wine',
    color: '#800080',
    category: 'food',
  },
  {
    label: '🍜 Street Food',
    value: 'streetfood',
    color: '#FF8C00',
    category: 'food',
  },
  {
    label: '🍰 Baking Fun',
    value: 'baking',
    color: '#F0E68C',
    category: 'food',
  },

  {
    label: '👥 Social & Fun',
    value: 'social',
    color: '#40E0D0',
    category: 'social',
  },
  {
    label: '🎊 Party & Dancing',
    value: 'party',
    color: '#FF1493',
    category: 'social',
  },
  {
    label: '🎪 Festivals & Events',
    value: 'festivals',
    color: '#FF1493',
    category: 'social',
  },
  {
    label: '🎤 Karaoke Night',
    value: 'karaoke',
    color: '#FF69B4',
    category: 'social',
  },
  {
    label: '🎲 Board Games',
    value: 'boardgames',
    color: '#9370DB',
    category: 'social',
  },
  {
    label: '🎯 Competitive Fun',
    value: 'competitive',
    color: '#FF4500',
    category: 'social',
  },
  {
    label: '🎬 Movies & Cinema',
    value: 'movies',
    color: '#2F4F4F',
    category: 'social',
  },
  {
    label: '🎪 Circus & Magic',
    value: 'circus',
    color: '#FF1493',
    category: 'social',
  },
  {
    label: '🎪 Amusement Parks',
    value: 'amusement',
    color: '#FF1493',
    category: 'social',
  },

  {
    label: '🛋️ Lazy & Chill',
    value: 'lazy',
    color: '#667eea',
    category: 'relaxation',
  },
  {
    label: '☕ Cozy Vibes',
    value: 'cozy',
    color: '#f093fb',
    category: 'relaxation',
  },
  {
    label: '🌿 Nature Lover',
    value: 'nature',
    color: '#90EE90',
    category: 'relaxation',
  },
  {
    label: '🧘 Wellness & Spa',
    value: 'wellness',
    color: '#98FB98',
    category: 'relaxation',
  },
  {
    label: '🏖️ Beach & Water',
    value: 'beach',
    color: '#87CEEB',
    category: 'relaxation',
  },
  {
    label: '🌅 Sunrise/Sunset',
    value: 'scenic',
    color: '#FFA07A',
    category: 'relaxation',
  },
  {
    label: '🌸 Flower Gardens',
    value: 'gardens',
    color: '#FFB6C1',
    category: 'relaxation',
  },

  {
    label: '🛍️ Shopping Spree',
    value: 'shopping',
    color: '#22c1c3',
    category: 'lifestyle',
  },
  {
    label: '📸 Instagram Worthy',
    value: 'instagram',
    color: '#fdbb2d',
    category: 'lifestyle',
  },
  {
    label: '🎮 Gaming & Tech',
    value: 'gaming',
    color: '#4169E1',
    category: 'lifestyle',
  },
  {
    label: '🧩 Mind Puzzles',
    value: 'puzzles',
    color: '#4682B4',
    category: 'lifestyle',
  },
  {
    label: '🚗 Road Trips',
    value: 'roadtrips',
    color: '#32CD32',
    category: 'lifestyle',
  },
];

export default function PreferencesSection({
  onPreferencesSelected,
}: PreferencesSectionProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  // Get random selection of unselected preferences to display
  const displayedPreferences = useMemo(() => {
    const unselected = allPreferences.filter(
      (p) => !selectedPreferences.includes(p.value)
    );
    const shuffled = [...unselected].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15); // Show 15 options at a time
  }, [selectedPreferences]);

  const selectedPreferenceObjects = useMemo(() => {
    return selectedPreferences
      .map((value) => allPreferences.find((p) => p.value === value))
      .filter((p): p is (typeof allPreferences)[0] => p !== undefined);
  }, [selectedPreferences]);

  const handlePreferenceToggle = (value: string) => {
    const newPreferences = selectedPreferences.includes(value)
      ? selectedPreferences.filter((p) => p !== value)
      : [...selectedPreferences, value];

    setSelectedPreferences(newPreferences);
    onPreferencesSelected(newPreferences);
  };

  const getChipStyle = (preference: any, isSelected: boolean) => ({
    background: isSelected ? preference.color : '#FFFFFF',
    color: isSelected ? '#FFFFFF' : '#000000',
    borderColor: '#000000',
    '& .MuiChip-label': {
      color: isSelected ? '#FFFFFF' : '#000000',
      fontWeight: isSelected ? 700 : 600,
    },
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

      <Container
        maxWidth='xl'
        sx={{ position: 'relative', zIndex: 3, width: '100%' }}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='flex-start'
          textAlign='center'
          sx={{ width: '100%', minHeight: 'auto' }}
        >
          <SectionTitle variant='h2'>
            ✨ What's Your Vibe Today? ✨
          </SectionTitle>

          {/* Selected Preferences Section */}
          {selectedPreferences.length > 0 && (
            <SelectedPreferencesContainer>
              <SelectedTitle>🎉 Your Selected Vibes</SelectedTitle>
              <SelectedChipsContainer>
                {selectedPreferenceObjects.map((preference) => (
                  <PreferenceChip
                    key={preference.value}
                    label={preference.label}
                    onClick={() => handlePreferenceToggle(preference.value)}
                    isSelected={true}
                    isInSelectedArea={true}
                    sx={getChipStyle(preference, true)}
                  />
                ))}
              </SelectedChipsContainer>
            </SelectedPreferencesContainer>
          )}

          {/* Available Preferences Grid */}
          <PreferencesGrid>
            {displayedPreferences.map((preference) => {
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
          </PreferencesGrid>

          {selectedPreferences.length === 0 && (
            <Box mt={4} mb={4}>
              <Typography
                variant='h6'
                sx={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 600,
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '12px 24px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.5)',
                  zIndex: 3,
                  position: 'relative',
                }}
              >
                👆 Start selecting activities that interest you!
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </PreferencesContainer>
  );
}
