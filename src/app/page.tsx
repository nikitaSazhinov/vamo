'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import LocationSection from '../components/LocationSection';
import PreferencesSection from '../components/PreferencesSection';

export default function Home() {
  const [userLocation, setUserLocation] = useState<string>('');
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const preferencesRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const totalSections = 3;

  const scrollToSectionByIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections || isScrolling) return;

      setIsScrolling(true);
      setCurrentSection(index);

      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          top: index * window.innerHeight,
          behavior: 'smooth',
        });

        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }
    },
    [isScrolling, totalSections]
  );

  // Handle wheel scroll events
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (isScrolling) return;

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Debounce scroll events
      scrollTimeout.current = setTimeout(() => {
        const delta = event.deltaY;

        if (delta > 0) {
          // Scrolling down
          if (currentSection < totalSections - 1) {
            scrollToSectionByIndex(currentSection + 1);
          }
        } else {
          // Scrolling up
          if (currentSection > 0) {
            scrollToSectionByIndex(currentSection - 1);
          }
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        container.removeEventListener('wheel', handleWheel);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }
  }, [currentSection, isScrolling, scrollToSectionByIndex]);

  // Handle touch events for mobile
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isScrolling) return;

      const touchEndY = event.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const threshold = 50; // Minimum swipe distance

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          // Swiping up (next section)
          if (currentSection < totalSections - 1) {
            scrollToSectionByIndex(currentSection + 1);
          }
        } else {
          // Swiping down (previous section)
          if (currentSection > 0) {
            scrollToSectionByIndex(currentSection - 1);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      });
      container.addEventListener('touchend', handleTouchEnd, {
        passive: false,
      });

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentSection, isScrolling, scrollToSectionByIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrolling) return;

      switch (event.key) {
        case 'ArrowDown':
        case ' ': // Space bar
          event.preventDefault();
          if (currentSection < totalSections - 1) {
            scrollToSectionByIndex(currentSection + 1);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (currentSection > 0) {
            scrollToSectionByIndex(currentSection - 1);
          }
          break;
        case 'Home':
          event.preventDefault();
          scrollToSectionByIndex(0);
          break;
        case 'End':
          event.preventDefault();
          scrollToSectionByIndex(totalSections - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling, scrollToSectionByIndex, totalSections]);

  const handleGetStarted = () => {
    scrollToSectionByIndex(1);
  };

  const handleConfirmLocation = () => {
    setUserLocation('confirmed');
    scrollToSectionByIndex(2);
  };

  const handlePreferencesSelected = (preferences: string[]) => {
    setUserPreferences(preferences);
    console.log('User Data:', {
      location: userLocation,
      preferences: preferences,
    });
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        '&::-webkit-scrollbar': {
          display: 'none', // Hide scrollbar since we're controlling scroll
        },
        scrollbarWidth: 'none', // Hide scrollbar for Firefox
      }}
    >
      {/* Navigation Dots Indicator */}
      <Box
        sx={{
          position: 'fixed',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {Array.from({ length: totalSections }).map((_, index) => (
          <Box
            key={index}
            onClick={() => scrollToSectionByIndex(index)}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background:
                currentSection === index
                  ? 'linear-gradient(45deg, #FF1493, #00FFFF)'
                  : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              '&:hover': {
                transform: 'scale(1.2)',
                background: 'linear-gradient(45deg, #FF1493, #00FFFF)',
              },
            }}
          />
        ))}
      </Box>

      {/* Section Indicator Text */}
      <Box
        sx={{
          position: 'fixed',
          left: '30px',
          bottom: '30px',
          zIndex: 1000,
          color: '#FFFFFF',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.9rem',
          fontWeight: 600,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          background: 'rgba(0, 0, 0, 0.4)',
          padding: '8px 16px',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        {currentSection + 1} / {totalSections}
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'absolute',
          top: '0vh',
          width: '100%',
          height: '100vh',
        }}
      >
        <HeroSection onGetStarted={handleGetStarted} />
      </Box>

      {/* Location Section */}
      <Box
        ref={locationRef}
        sx={{
          position: 'absolute',
          top: '100vh',
          width: '100%',
          height: '100vh',
        }}
      >
        <LocationSection onConfirmLocation={handleConfirmLocation} />
      </Box>

      {/* Preferences Section */}
      <Box
        ref={preferencesRef}
        sx={{
          position: 'absolute',
          top: '200vh',
          width: '100%',
          height: '100vh',
        }}
      >
        <PreferencesSection onPreferencesSelected={handlePreferencesSelected} />
      </Box>
    </Box>
  );
}
