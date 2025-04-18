import React from 'react'
import { useWindowManager } from '../hooks/useWindowManager'
import { useWindow } from '../contexts/WindowContext'

const Files = ({ isVisible, setShowFiles }) => {
  const { position, handleMouseDown } = useWindowManager();
  const { zIndexCounter, bringToFront } = useWindow();
  
  if (!isVisible) return null;

  return (
    <div 
      onMouseDown={(e) => {
        handleMouseDown(e);
        bringToFront('files');
      }}
      className='w-[50vw] h-[60vh] bg-gray-100 rounded-xl z-50 shadow-lg absolute select-none'
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'default',
        zIndex: zIndexCounter
      }}
    >
      {/* Drag Handle */}
      <div className='window-header h-12 bg-gray-950 rounded-t-xl flex items-center justify-between px-4 cursor-move'>
        <span className='text-white font-semibold'>Files</span>
        <div className='flex items-center gap-2'>
          <i className="ri-search-line text-white hover:bg-gray-800/50 p-2 rounded-full cursor-pointer"></i>
          <i className="ri-more-2-fill text-white hover:bg-gray-800/50 p-2 rounded-full cursor-pointer"></i>
          <i onClick={() => setShowFiles(false)} className="ri-close-fill text-white hover:bg-gray-800/50 p-2 rounded-full cursor-pointer"></i>
        </div>
      </div>

      {/* Body */}
      <div className='flex-1 h-[calc(100%-48px)] flex flex-col'>
        <div className='w-full h-12 border-b flex items-center px-4 gap-4'>
          <i className="ri-arrow-left-line text-gray-600"></i>
          <i className="ri-arrow-right-line text-gray-600"></i>
          <span className="text-sm text-gray-600">Home</span>
        </div>

        <div className='flex-1 flex items-center justify-center'>
          <span className='text-gray-500 font-semibold'>No files found</span>
        </div>
      </div>
    </div>
  )
}

export default Files
