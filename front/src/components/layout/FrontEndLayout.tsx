'use client';
import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { LoginModal } from '../LoginModal';
import { useUIStore } from '@/store/uiStore';


export const FrontEndLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    isDarkMode,
    toggleDarkMode,
    showLoginModal,
    openLoginModal,
    closeLoginModal,
    currentLocation,
    isLocationLoading,
    setLocation,
    setLocationLoading
  } = useUIStore();


  /*
  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async () => {
            const mockLocations = [
              'New York, NY',
              'Los Angeles, CA',
              'Chicago, IL',
              'Houston, TX',
              'Phoenix, AZ',
              'Philadelphia, PA',
              'San Antonio, TX',
              'San Diego, CA',
            ];
            const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
            setLocation(randomLocation);
            setLocationLoading(false);
          },
          () => {
            setLocation('Location unavailable');
            setLocationLoading(false);
          },
          { timeout: 10000 }
        );
      } else {
        setLocation('Location not supported');
        setLocationLoading(false);
      }
    };

    getCurrentLocation();
  }, []);

  */

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b201f666f92f4309bd408ebaeb793b49`);
              const data = await res.json();
              
              if (data?.results?.length) {
                const locationName = data.results[0].components.state || 'Delhi';
                setLocation(locationName);
              } else {
                setLocation('Location not found');
              }
            } catch (err: unknown) {
              console.error(err);
              setLocation('Error fetching location');
            }

            setLocationLoading(false);
          },
          (error: unknown) => {
            console.error(error);
            setLocation('Location unavailable');
            setLocationLoading(false);
          },
          { timeout: 10000 }
        );
      } else {
        setLocation('Location not supported');
        setLocationLoading(false);
      }
    };

    getCurrentLocation();
  }, []);



  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDarkMode
          ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}
    >
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleDarkMode}
        handlePatientLogin={openLoginModal}
        currentLocation={currentLocation}
        isLocationLoading={isLocationLoading}
      />

      {children}

      <Footer isDarkMode={isDarkMode} />

      <LoginModal isOpen={showLoginModal} onClose={closeLoginModal} />
    </div>
  );
};
