import React from 'react'

const Application = ({ isVisible, setShowApps }) => {
  const apps = [
    { id: 1, name: 'Camera', icon: 'https://cdn-icons-png.flaticon.com/128/3617/3617277.png' },
    { id: 2, name: 'AisleRiot Solitaire', icon: 'https://cdn-icons-png.flaticon.com/128/8919/8919970.png' },
    { id: 3, name: 'Calendar', icon: 'https://cdn-icons-png.flaticon.com/128/591/591576.png' },
    { id: 4, name: 'Cheese', icon: 'https://cdn-icons-png.flaticon.com/128/2413/2413766.png' },
    { id: 5, name: 'Files', icon: 'https://cdn-icons-png.flaticon.com/128/1383/1383397.png' },
    { id: 6, name: 'Firefox Web Browser', icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968827.png' },
    { id: 7, name: 'Language Support', icon: 'https://cdn-icons-png.flaticon.com/128/888/888878.png' },
    { id: 8, name: 'LibreOffice Calc', icon: 'https://cdn-icons-png.flaticon.com/128/2758/2758751.png' },
    { id: 9, name: 'LibreOffice Draw', icon: 'https://cdn-icons-png.flaticon.com/128/603/603570.png' },
    { id: 10, name: 'LibreOffice Impress', icon: 'https://cdn-icons-png.flaticon.com/128/1377/1377975.png' },
    { id: 11, name: 'LibreOffice Writer', icon: 'https://cdn-icons-png.flaticon.com/128/3997/3997593.png' },
    { id: 12, name: 'Livepatch', icon: 'https://cdn-icons-png.flaticon.com/128/2921/2921222.png' },
    { id: 13, name: 'Mahjongg', icon: 'https://cdn-icons-png.flaticon.com/128/2534/2534310.png' },
    { id: 14, name: 'Mines', icon: 'https://cdn-icons-png.flaticon.com/128/2537/2537535.png' },
    { id: 15, name: 'Notepad++', icon: 'https://cdn-icons-png.flaticon.com/128/3997/3997593.png' },
    { id: 16, name: 'Power Statistics', icon: 'https://cdn-icons-png.flaticon.com/128/1779/1779940.png' },
    { id: 17, name: 'Remmina', icon: 'https://cdn-icons-png.flaticon.com/128/1183/1183643.png' },
    { id: 18, name: 'Rhythmbox', icon: 'https://cdn-icons-png.flaticon.com/128/2995/2995101.png' },
    { id: 19, name: 'Settings', icon: 'https://cdn-icons-png.flaticon.com/128/3953/3953226.png' },
    { id: 20, name: 'Shotwell', icon: 'https://cdn-icons-png.flaticon.com/128/4503/4503941.png' },
    { id: 21, name: 'Software & Updates', icon: 'https://cdn-icons-png.flaticon.com/128/8422/8422293.png' },
    { id: 22, name: 'Software Updater', icon: 'https://cdn-icons-png.flaticon.com/128/2921/2921222.png' },
    { id: 23, name: 'Startup Applications', icon: 'https://cdn-icons-png.flaticon.com/128/1802/1802979.png' },
    { id: 24, name: 'Startup Disk Creator', icon: 'https://cdn-icons-png.flaticon.com/128/9166/9166967.png' },
  ]

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowApps(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md pt-10 z-50" onClick={handleBackdropClick}>     
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <input
            type="search"
            placeholder="Type to search"
            className="w-full px-4 py-2 rounded-full bg-white/10 text-white mb-8 outline-none"
          />
          <div className="grid grid-cols-6 gap-6">
            {apps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
              >
                <img src={app.icon} alt={app.name} className="w-12 h-12 object-contain" />
                <span className="text-white text-sm text-center">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Application