import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <h1 className="text-4xl font-bold">Palki Cuisine of India</h1>
      <p className="mt-4 text-xl">Loading 3D WOW elements...</p>
      {/* 3D placeholder */}
      <div id="canvas-container" className="w-full h-96 bg-gray-900 mt-10 rounded-lg flex items-center justify-center">
         <span>[3D Canvas Placeholder]</span>
      </div>
    </main>
  );
}