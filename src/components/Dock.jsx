import React, { useState } from 'react'
import Application from './Application'
import Files from '../windows/Files'
import Settings from '../windows/Settings'
import Terminal from '../windows/Terminal'
import settingsIcon from '/Logos/settings.png'
import terminalIcon from '/Logos/terminal.png'
import firefoxIcon from '/Logos/firefox.png'
import filesIcon from '/Logos/folder.png'
import softwareIcon from '/Logos/store.png'
import helpIcon from '/Logos/help.png'

const Dock = () => {
  const [showApps, setShowApps] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [showSettings, setShowSettings] = useState(false);  
  const [showTerminal, setShowTerminal] = useState(false);

  const handleItemClick = (name) => {
    switch(name) {
      case 'Files':
        setShowFiles(true);
        break;
      case 'Settings':
        setShowSettings(true);
        break;
      case 'Terminal':
        setShowTerminal(true);
        break;
      default:
        break;
    }
  };

  const dockItems = [
    {
      id: 1,
      icon: firefoxIcon,
      name: "Firefox"
    },
    {
      id: 3,
      icon: filesIcon,
      name: "Files"
    },
    {
      id: 4,
      icon: settingsIcon,
      name: "Settings"
    },
    {
      id: 5,
      icon: terminalIcon,
      name: "Terminal"
    },
    {
      id: 6,
      icon: softwareIcon,
      name: "Software"
    },
    {
      id: 7,
      icon: helpIcon,
      name: "Help"
    }
  ]

  return (
    <>
      <div className='fixed z-1 left-0 top-0 bottom-0 w-[60px] bg-black/50 backdrop-blur-md flex flex-col items-center py-4 pt-10 gap-4'>
        {dockItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleItemClick(item.name)}
            className='w-12 h-12 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all duration-200 group relative'
          >
            <img 
              src={item.icon} 
              alt={item.name}
              className="w-8 h-8 object-contain"
            />
            <div className='absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap'>
              {item.name}
            </div>
          </div>
        ))}
        
        {/* Grid menu at bottom */}
        <div className='mt-auto'>
          <div 
            onClick={() => setShowApps(!showApps)}
            className='w-12 h-12 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all duration-200 group relative'
          >
            <i className="ri-apps-2-fill text-2xl text-white"></i>
            <div className='absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap'>
              Show Applications
            </div>
          </div>
        </div>
      </div>
      <Application isVisible={showApps} setShowApps={setShowApps} />
      <Files isVisible={showFiles} setShowFiles={setShowFiles} />
      <Settings isVisible={showSettings} setShowSettings={setShowSettings} />
      <Terminal isVisible={showTerminal} setShowTerminal={setShowTerminal} />
    </>
  )
}

export default Dock