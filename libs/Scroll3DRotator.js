'use client';

import { useState, useEffect } from 'react';

export default function Scroll3DRotator({ children }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateZ, setRotateZ] = useState(0);

  useEffect(() => {
    const handleWheel = (e) => {
      const delta = e.deltaY * 0.2;
      setRotateX((prev) => prev + delta);
      setRotateZ((prev) => prev + delta * 0.5);
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div
        className="w-48 h-48 bg-white rounded-xl shadow-2xl flex items-center justify-center text-black font-bold text-xl"
        style={{
          transform: `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateZ(${rotateZ}deg)
          `,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
