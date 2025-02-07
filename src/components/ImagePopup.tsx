import React from 'react';
import { X, Download } from 'lucide-react';
import { Wallpaper } from '../types';

interface ImagePopupProps {
  wallpaper: Wallpaper;
  onClose: () => void;
  onDownload: (wallpaper: Wallpaper) => void;
}

export function ImagePopup({ wallpaper, onClose, onDownload }: ImagePopupProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-sm">
      <div className="min-h-screen px-4 flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Download button */}
        <button
          onClick={() => onDownload(wallpaper)}
          className="absolute top-4 left-4 bg-[#FF69B4] text-white px-6 py-2 rounded-lg hover:bg-[#FF1493] transition-colors flex items-center gap-2"
        >
          <Download size={20} />
          <span>Free Download</span>
        </button>

        {/* Image container */}
        <div className="relative max-w-7xl w-full">
          <img
            src={wallpaper.url}
            alt={wallpaper.title}
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Image info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-white text-xl font-bold mb-2">{wallpaper.title}</h2>
            <p className="text-white/80 text-sm">{wallpaper.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {wallpaper.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}