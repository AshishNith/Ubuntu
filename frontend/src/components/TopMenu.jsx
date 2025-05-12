import React from 'react'

const TopMenu = ({ type, isVisible, position, onClose }) => {
  if (!isVisible) return null;

  const menus = {
    wifi: (
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">Wi-Fi</span>
          <div className="relative inline-block w-10 h-6">
            <input type="checkbox" className="hidden peer" />
            <div className="absolute inset-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition-colors cursor-pointer"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-4 transition-transform"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div>
              <div className="font-medium">Home Network</div>
              <div className="text-sm text-gray-500">Connected</div>
            </div>
            <i className="ri-wifi-fill text-blue-500"></i>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <span>Other Networks...</span>
            <i className="ri-arrow-right-s-line"></i>
          </div>
        </div>
      </div>
    ),
    volume: (
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Volume</span>
          <i className="ri-volume-up-fill"></i>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          className="w-full accent-blue-500"
        />
        <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <span>Sound Settings...</span>
          <i className="ri-settings-3-line"></i>
        </div>
      </div>
    ),
    battery: (
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Battery</span>
          <span className="text-sm text-gray-500">85%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full w-[85%]"></div>
        </div>
        <div className="text-sm text-gray-500">3:45 remaining</div>
        <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <span>Power Settings...</span>
          <i className="ri-settings-3-line"></i>
        </div>
      </div>
    )
  };

  return (
    <div 
      className="fixed bg-white rounded-lg shadow-lg w-80 z-50"
      style={{
        top: position.y + 'px',
        right: window.innerWidth - position.x - 320 + 'px',
        transform: 'translateY(4px)'
      }}
    >
      {menus[type]}
    </div>
  );
};

export default TopMenu;
