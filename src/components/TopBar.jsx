import React, { useState, useEffect } from 'react'

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeString = currentTime
    .toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })

  const dateString = currentTime
    .toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

  return (
    <div className="fixed z-2 top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-md text-white flex items-center justify-between px-4 text-sm">
      <div className="flex items-center gap-4">
        <span className="font-medium">Activities</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <i className="ri-wifi-fill"></i>
          <i className="ri-volume-up-fill"></i>
          <i className="ri-battery-fill"></i>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className=''>{dateString}</span>
          <span>{timeString}</span>
        </div>
      </div>
    </div>
  )
}

export default TopBar
