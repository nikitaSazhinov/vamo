'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import LocationSection from '../components/LocationSection';
import PreferencesSection from '../components/PreferencesSection';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
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

      const sectionsContainer = sectionsRef.current;
      if (sectionsContainer) {
        // Use transform instead of scrollTo for smoother animation
        const translateY = -(index * 100);
        sectionsContainer.style.transform = `translateY(${translateY}vh)`;
        sectionsContainer.style.transition = 'transform 0.8s ease-in-out';

        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 800); // Match the CSS transition duration
      }
    },
    [isScrolling, totalSections]
  );

  // Check for section parameter and navigate accordingly
  useEffect(() => {
    const section = searchParams.get('section');
    if (section === 'location') {
      // Small delay to ensure the component is mounted
      setTimeout(() => {
        scrollToSectionByIndex(1); // Location section is at index 1
      }, 100);
    }
  }, [searchParams, scrollToSectionByIndex]);

  // Handle wheel scroll events
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // Check if the event target is inside a scrollable content area
      const target = event.target as HTMLElement;
      const isInsideScrollableContent =
        target.closest('[data-scrollable-content]') ||
        target.closest('.preferences-scrollable') ||
        target.closest('[data-testid="preferences-scroll-area"]') ||
        target.closest('.MuiPaper-root') ||
        target.closest('[role="dialog"]');

      // If we're inside a scrollable content area, don't prevent default
      if (isInsideScrollableContent) {
        return;
      }

      // Additional check: if we're in section 2 (preferences), allow some scrolling
      if (currentSection === 2) {
        const preferencesSection =
          target.closest('[class*="preferences"]') ||
          target.closest('[data-scrollable-content]');
        if (preferencesSection) {
          return;
        }
      }

      event.preventDefault();

      // Block scroll events while transitioning
      if (isScrolling) return;

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a debounce to prevent rapid scrolling
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
      }, 100); // Debounce for smoother experience
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
    let touchStartedInScrollable = false;
    let touchMoved = false;

    const handleTouchStart = (event: TouchEvent) => {
      const target = event.target as HTMLElement;
      touchStartY.current = event.touches[0].clientY;
      touchMoved = false;
      // Check if touch started inside a scrollable content area
      touchStartedInScrollable = !!(
        target.closest('[data-scrollable-content]') ||
        target.closest('.MuiPaper-root') ||
        target.closest('[role="dialog"]')
      );
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartedInScrollable) {
        // Let the scrollable area handle the scroll
        return;
      }
      // Prevent scrolling the main container
      event.preventDefault();
      touchMoved = true;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isScrolling) return;
      if (touchStartedInScrollable) return; // Don't swipe sections if touch started in scrollable
      if (!touchMoved) return; // Only handle if there was a move

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
      container.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      container.addEventListener('touchend', handleTouchEnd, {
        passive: false,
      });

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
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

  const handleConfirmLocation = (location: {
    latitude: number;
    longitude: number;
  }) => {
    setUserLocation(location);
    scrollToSectionByIndex(2);
  };

  const handlePreferencesSelected = (preferences: string[]) => {
    setUserPreferences(preferences);
    // Just store preferences, don't auto-call API
  };

  const handleGoButtonClick = async (preferences: string[]) => {
    if (userLocation && preferences.length > 0) {
      await callRecommendationsAPI(userLocation, preferences);
    }
  };

  const callRecommendationsAPI = async (
    location: { latitude: number; longitude: number },
    preferences: string[]
  ) => {
    setLoading(true);
    setError('');
    setResponse('');

    // Navigate to recommendations page with loading state
    router.push('/recommendations?loading=true');

    // Create the prompt with location and preferences - modified to only give content about places
    let prompt = `Provide specific recommendations for places to visit within 5km of coordinates ${location.latitude}, ${location.longitude}.`;

    if (preferences.length > 0) {
      const preferenceLabels = preferences.map((pref) => {
        // Map preference values to readable labels
        const preferenceMap: { [key: string]: string } = {
          lazy: 'relaxing and chill',
          cozy: 'cozy and comfortable',
          adventurous: 'adventurous and exciting',
          artsy: 'artsy and creative',
          foodie: 'food and dining',
          shopping: 'shopping and retail',
          nature: 'nature and outdoor',
          nightlife: 'music and nightlife',
          culture: 'learning and cultural',
          fitness: 'fitness and sports',
          instagram: 'instagram-worthy and photogenic',
          social: 'social and fun',
        };
        return preferenceMap[pref] || pref;
      });

      if (preferenceLabels.length === 1) {
        prompt += ` Focus on ${preferenceLabels[0]} activities.`;
      } else {
        const lastPreference = preferenceLabels.pop();
        prompt += ` Focus on ${preferenceLabels.join(
          ', '
        )} and ${lastPreference} activities.`;
      }
    }

    prompt += ` List specific places with names, addresses, and brief descriptions. Do not include any introductory text like "I'm happy to help" or "Here are some recommendations" - just provide the place information directly.`;

    try {
      const res = await fetch('/api/mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to get response');
      }

      // Extract the content from the Mistral API response
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        setResponse(content);
        console.log('Recommendations:', content);
        // Navigate to recommendations page with the response
        router.push(`/recommendations?response=${encodeURIComponent(content)}`);
      } else {
        throw new Error('No content found in response');
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
      // Navigate to recommendations page with error
      router.push(
        `/recommendations?error=${encodeURIComponent(
          error.message || 'An error occurred'
        )}`
      );
    } finally {
      setLoading(false);
    }
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
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
    >
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
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
          background: 'rgba(0, 0, 0, 0.4)',
          padding: '8px 16px',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        }}
      >
        {currentSection + 1} / {totalSections}
      </Box>

      {/* Sections Container with Transform Animation */}
      <Box
        ref={sectionsRef}
        sx={{
          width: '100%',
          height: `${totalSections * 100}vh`,
          position: 'relative',
          transition: 'transform 0.8s ease-in-out',
        }}
      >
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
          sx={{
            position: 'absolute',
            top: '200vh',
            width: '100%',
            height: '100vh',
          }}
        >
          <PreferencesSection
            onPreferencesSelected={handlePreferencesSelected}
            onGoButtonClick={handleGoButtonClick}
            userLocation={userLocation}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
