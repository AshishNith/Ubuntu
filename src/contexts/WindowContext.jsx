import React, { createContext, useState, useContext } from 'react';

const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const [activeWindow, setActiveWindow] = useState(null);
  const [zIndexCounter, setZIndexCounter] = useState(50);

  const bringToFront = (windowId) => {
    setActiveWindow(windowId);
    setZIndexCounter(prev => prev + 1);
  };

  return (
    <WindowContext.Provider value={{ activeWindow, zIndexCounter, bringToFront }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => useContext(WindowContext);
