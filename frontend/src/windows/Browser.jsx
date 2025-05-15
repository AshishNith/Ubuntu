import React, { useState, useRef, useEffect } from 'react';
import { useWindowManager } from '../hooks/useWindowManager';
import { useWindow } from '../contexts/WindowContext';

const NavPage = ({ setUrl, setDisplayUrl, setInputValue }) => {
  const favorites = [
    { id: 1, title: 'Google', link: 'https://google.com', img: 'https://www.google.com/favicon.ico' },
    { id: 2, title: 'GitHub', link: 'https://github.com', img: 'https://github.com/favicon.ico' },
    { id: 3, title: 'YouTube', link: 'https://youtube.com', img: 'https://www.youtube.com/favicon.ico' },
    // Add more favorites as needed
  ];

  const handleFavoriteClick = (site) => {
    const processedURL = `http://localhost:5000/proxy?url=${encodeURIComponent(site.link)}`;
    setUrl(processedURL);
    setDisplayUrl(site.link);
    setInputValue(site.link);
  };

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-medium mb-4">Favorites</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
          {favorites.map(site => (
            <div 
              key={site.id} 
              onClick={() => handleFavoriteClick(site)}
              className="flex flex-col items-center cursor-pointer hover:opacity-80"
            >
              <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2 cursor-pointer">
                <img src={site.img} alt={site.title} className="w-8 h-8" />
              </div>
              <span className="text-sm text-gray-600">{site.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NoInternet = () => (
  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Internet Connection</h2>
      <p className="text-gray-600">Please check your connection and try again.</p>
    </div>
  </div>
);

const Browser = ({ isVisible, setShowBrowser }) => {
  const { position, handleMouseDown } = useWindowManager();
  const { zIndexCounter, bringToFront } = useWindow();
  const iframeRef = useRef(null);
  
  const [url, setUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");  // Add this line
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // this is to show the actual URL in the input field
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        try {
          const currentUrl = new URL(url);
          const actualUrl = currentUrl.searchParams.get('url') || url;
          setDisplayUrl(actualUrl);
          setInputValue(actualUrl);
        } catch (e) {
          setDisplayUrl(url);
          setInputValue(url);
        }
      };
    }
  }, [url]);

  const handleURLSubmit = () => {
    if (!inputValue) return;
    
    let processedURL = inputValue;
    // Check if it is a search query or url
    if (!processedURL.match(/^https?:\/\//i)) {
      if (processedURL.includes('.') && !processedURL.includes(' ')) {
        processedURL = `https://${processedURL}`;
      } else {
        // use Google search
        processedURL = `http://localhost:5000/search?q=${encodeURIComponent(processedURL)}`;
        setDisplayUrl(processedURL);
        setUrl(processedURL);
        return;
      }
    }
    
    // Use for url
    setDisplayUrl(processedURL);
    setUrl(`http://localhost:5000/proxy?url=${encodeURIComponent(processedURL)}`);
  };

  if (!isVisible) return null;

  return (
    <div
      onMouseDown={(e) => {
        handleMouseDown(e);
        bringToFront('browser');
      }}
      className="absolute w-[80vw] h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden"
      style={{ left: position.x, top: position.y, zIndex: zIndexCounter }}
    >
      {/* Header */}
      <div className="window-header h-12 bg-gray-900 text-white px-4 flex items-center justify-between cursor-move rounded-t-xl">
        <span>Web Browser</span>
        <i onClick={() => setShowBrowser(false)} className="ri-close-fill hover:bg-gray-800 p-2 rounded-full cursor-pointer" />
      </div>

      {/* Browser Controls */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b">
        <div className="flex items-center gap-1">
          <button onClick={() => iframeRef.current?.contentWindow?.history.back()} className="p-2 hover:bg-gray-200 rounded">
            <i className="ri-arrow-left-line" />
          </button>
          <button onClick={() => iframeRef.current?.contentWindow?.history.forward()} className="p-2 hover:bg-gray-200 rounded">
            <i className="ri-arrow-right-line" />
          </button>
          <button onClick={() => iframeRef.current?.contentWindow?.location.reload()} className="p-2 hover:bg-gray-200 rounded">
            <i className="ri-refresh-line" />
          </button>
        </div>
        <div className="flex-1 flex items-center bg-white rounded-lg border shadow-sm">
          <i className={`ml-3 ${url.startsWith('https') ? 'ri-lock-line text-green-600' : 'ri-error-warning-line text-gray-400'}`} />
          <input
            type="text"
            className="flex-1 px-3 py-2 outline-none bg-transparent"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={(e) => e.target.select()}  // Add this line
            onKeyDown={(e) => e.key === 'Enter' && handleURLSubmit()}
            placeholder="Search Google or enter URL"
          />
          {inputValue && (  
            <button onClick={() => setInputValue('')} className="p-2 hover:bg-gray-100 rounded-r">
              <i className="ri-close-line text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-[calc(100%-96px)]">
        {!isOnline ? <NoInternet /> : 
         !url ? <NavPage setUrl={setUrl} setDisplayUrl={setDisplayUrl} setInputValue={setInputValue} /> :
         <iframe
           ref={iframeRef}
           src={url}
           title="Web Browser"
           className="w-full h-full"
           sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
           loading="lazy"
         />
        }
      </div>
    </div>
  );
};

export default Browser;

