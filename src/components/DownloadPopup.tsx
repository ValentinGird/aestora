import React from 'react';
import { X, Download } from 'lucide-react';
import { Wallpaper } from '../types';

interface DownloadPopupProps {
  wallpaper: Wallpaper;
  onClose: () => void;
}

export function DownloadPopup({ wallpaper, onClose }: DownloadPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-sm relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold mb-4 text-white">{wallpaper.title}</h3>
        
        <div className="relative rounded-lg overflow-hidden mb-6">
          <img
            src={wallpaper.url}
            alt={wallpaper.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a] opacity-50" />
        </div>

        <a
          href={wallpaper.url_4k}
          download
          className="w-full bg-[#c70039] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#a30030] transition-colors font-medium"
        >
          <Download size={18} />
          Download 4K Version
        </a>

        <p className="text-gray-400 text-sm text-center mt-4">
          If you're on mobile, tap and hold the image to save
        </p>
      </div>
    </div>
  );
}