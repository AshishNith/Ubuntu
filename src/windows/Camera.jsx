import React, { useState, useRef, useEffect } from 'react'
import { useWindowManager } from '../hooks/useWindowManager'
import { useWindow } from '../contexts/WindowContext'

const Camera = ({ isVisible, setShowCamera }) => {
  const { position, handleMouseDown } = useWindowManager();
  const { zIndexCounter, bringToFront } = useWindow();
  const videoRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState(null);

  const initializeCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      
      if (videoDevices.length > 0) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            deviceId: videoDevices[0].deviceId,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            aspectRatio: { ideal: 16/9 }
          }
        });
        videoRef.current.srcObject = stream;
        setActiveDeviceId(videoDevices[4].deviceId);
        setHasPermission(true);
        setError(null);
      } else {
        setError('No camera devices found');
      }
    } catch (err) {
      setError('Camera access denied');
      setHasPermission(false);
    }
  };

  const switchCamera = async () => {
    if (!hasPermission || devices.length <= 1) return;
    
    const currentIndex = devices.findIndex(d => d.deviceId === activeDeviceId);
    const nextIndex = (currentIndex + 1) % devices.length;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: devices[nextIndex].deviceId }
      });
      videoRef.current.srcObject = stream;
      setActiveDeviceId(devices[nextIndex].deviceId);
    } catch (err) {
      setError('Failed to switch camera');
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    
    const link = document.createElement('a');
    link.download = `photo_${new Date().getTime()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    if (isVisible) {
      initializeCamera();
    }
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isVisible]);
  
  if (!isVisible) return null;

  return (
    <div 
      onMouseDown={(e) => {
        handleMouseDown(e);
        bringToFront('camera');
      }}
      className='w-[800px] h-[600px] bg-gray-900 rounded-xl shadow-lg absolute select-none'
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
      <div className='flex flex-col h-[calc(100%-48px)] p-4'>
        {/* Video Preview */}
        <div className='relative flex-1 rounded-lg overflow-hidden bg-black mb-4'>
          {error ? (
            <div className='absolute inset-0 flex items-center justify-center text-white'>
              <span>{error}</span>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className='absolute inset-0 w-full h-full object-contain'
            />
          )}
        </div>

        {/* Camera Controls */}
        <div className='flex justify-center gap-4 py-2'>
          <button 
            onClick={switchCamera}
            disabled={devices.length <= 1}
            className='p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50'
          >
            <i className="ri-camera-switch-fill text-white text-xl"></i>
          </button>
          <button 
            onClick={capturePhoto}
            disabled={!hasPermission}
            className='p-6 bg-white rounded-full hover:bg-white/90 transition-colors disabled:opacity-50'
          >
            <i className="ri-camera-fill text-gray-900 text-2xl"></i>
          </button>
          <button className='p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors'>
            <i className="ri-settings-4-fill text-white text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Camera