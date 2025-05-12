import React, { useState, useEffect } from 'react'
import TopMenu from './TopMenu'

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateString = currentTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=582c8c66f06a44758d3d4596fb3ed32a`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const components = data.results[0].components;
        setCityInfo({
          city: components.city || components.town || components.village,
          state: components.state,
          country: components.country,
        });
      }
    } catch (err) {
      setError('Unable to fetch city information',err);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        await getCityFromCoordinates(latitude, longitude);
      },
      () => {
        setError('Unable to retrieve location');
      }
    );
  }, []);

  const getWeather = async (latitude, longitude) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather data fetch failed');

      const data = await res.json();
      setWeather({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      setWeatherError(null);
    } catch (err) {
      setWeatherError('Weather data unavailable',err);
      setWeather(null);
    }
  };

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      getWeather(location.latitude, location.longitude);
    }
  }, [location]);

  const handleIconClick = (menuType, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom + 8 });
    setActiveMenu(activeMenu === menuType ? null : menuType);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeMenu && !e.target.closest('.top-menu')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu]);

  return (
    <>
      <div className="fixed z-10 top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-md text-white flex items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-4">
          <span className="font-medium">Activities</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <i onClick={(e) => handleIconClick('wifi', e)} className="ri-wifi-fill cursor-pointer hover:bg-white/10 p-1 rounded"></i>
            <i onClick={(e) => handleIconClick('volume', e)} className="ri-volume-up-fill cursor-pointer hover:bg-white/10 p-1 rounded"></i>
            <i onClick={(e) => handleIconClick('battery', e)} className="ri-battery-fill cursor-pointer hover:bg-white/10 p-1 rounded"></i>
          </div>
          <div className="flex items-center gap-4 text-xs">
            {error ? (
              <span>{error}</span>
            ) : (
              <>
                {cityInfo && (
                  <div className="flex items-center gap-2">
                    <span>{cityInfo.city}, {cityInfo.country}</span>
                    {weather && (
                      <div className="flex items-center gap-1">
                        <span>•</span>
                        <span>{weather.temp}°C</span>
                        <img
                          src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                          alt={weather.description}
                          className="w-6 h-6 -my-1"
                        />
                      </div>
                    )}
                    {weatherError && <span className="text-red-400">• {weatherError}</span>}
                  </div>
                )}
                <span>{dateString}</span>
                <span>{timeString}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="top-menu z-50">
        <TopMenu 
          type={activeMenu}
          isVisible={!!activeMenu}
          position={menuPosition}
          onClose={() => setActiveMenu(null)}
        />
      </div>
    </>
  );
};

export default TopBar;
