import React from 'react'
import { useWindowManager } from '../hooks/useWindowManager'
import { useWindow } from '../contexts/WindowContext'

const Camera = ({ isVisible, setShowCamera }) => {
  const { position, handleMouseDown } = useWindowManager();
  const { zIndexCounter, bringToFront } = useWindow();
  
  if (!isVisible) return null;

  return (
    <div 
      onMouseDown={(e) => {
        handleMouseDown(e);
        bringToFront('Camera');
      }}
      className='w-[60vw] h-[70vh] bg-gray-100 rounded-xl z-50 shadow-lg absolute select-none'
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'default',
        zIndex: zIndexCounter
      }}
    >
      {/* Window Header */}
      <div className='window-header h-12 bg-gray-950 rounded-t-xl flex items-center justify-between px-4 cursor-move'>
        <span className='text-white font-semibold'>Camera</span>
        <div className='flex items-center gap-2'>
          <i onClick={() => setShowCamera(false)} className="ri-close-fill text-white hover:bg-gray-800/50 p-2 rounded-full cursor-pointer"></i>
        </div>
      </div>

      {/* Camera Content */}
      <div className='flex h-[calc(100%-48px)]'>
        {/* Sidebar */}
        <div className='w-64 border-r bg-gray-50 p-4'>
          <div className='space-y-2'>
            <div className='flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer'>
              <i className="ri-wifi-line text-gray-600"></i>
              <span className='text-gray-700'>Wi-Fi</span>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer'>
              <i className="ri-computer-line text-gray-600"></i>
              <span className='text-gray-700'>Display</span>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer'>
              <i className="ri-brush-line text-gray-600"></i>
              <span className='text-gray-700'>Appearance</span>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer'>
              <i className="ri-notification-3-line text-gray-600"></i>
              <span className='text-gray-700'>Notifications</span>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer'>
              <i className="ri-sound-module-line text-gray-600"></i>
              <span className='text-gray-700'>Sound</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 p-6'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Camera</h2>
          <p className='text-gray-600'>Select a category from the sidebar to view and modify Camera.</p>
        </div>
      </div>
    </div>
  )
}

export default Camera