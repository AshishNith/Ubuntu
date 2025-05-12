import React, { useState } from 'react'
import { useWindowManager } from '../hooks/useWindowManager'
import { useWindow } from '../contexts/WindowContext'

const Terminal = ({ isVisible, setShowTerminal }) => {
  const { position, handleMouseDown } = useWindowManager();
  const { zIndexCounter, bringToFront } = useWindow();
  const [commands, setCommands] = useState(['Welcome to Ubuntu 22.04 LTS']);
  const [currentCommand, setCurrentCommand] = useState('');
  
  if (!isVisible) return null;

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setCommands([...commands, `user@ubuntu:~$ ${currentCommand}`, currentCommand]);
      setCurrentCommand('');
    }
  };

  return (
    <div 
      onMouseDown={(e) => {
        handleMouseDown(e);
        bringToFront('terminal');
      }}
      className='w-[45vw] h-[60vh] bg-[#300a24] rounded-xl shadow-lg absolute select-none'
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'default',
        zIndex: zIndexCounter
      }}
    >
      <div className='window-header h-12 bg-gray-950 rounded-t-xl flex items-center justify-between px-4 cursor-move'>
        <span className='text-white font-semibold'>Terminal</span>
        <div className='flex items-center gap-2'>
          <i onClick={() => setShowTerminal(false)} className="ri-close-fill text-white hover:bg-gray-800/50 p-2 rounded-full cursor-pointer"></i>
        </div>
      </div>

      <div className='p-4 font-mono text-sm h-[calc(100%-48px)] overflow-auto'>
        <div className='space-y-1 text-white'>
          {commands.map((cmd, i) => (
            <div key={i}>{cmd}</div>
          ))}
          <div className='flex items-center gap-2'>
            <span className='text-green-400'>user@ubuntu</span>
            <span className='text-white'>:</span>
            <span className='text-blue-400'>~</span>
            <span className='text-white'>$</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleEnter}
              className='bg-transparent outline-none text-white flex-1 ml-2'
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terminal
