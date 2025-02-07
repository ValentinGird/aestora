import React from 'react';
import { Download } from 'lucide-react';
import { Wallpaper } from '../types';
import { Link } from 'react-router-dom';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onDownloadClick: (wallpaper: Wallpaper) => void;
  onTagClick: (tag: string) => void;
  activeTags: Set<string>;
}

export function WallpaperCard({ wallpaper, onDownloadClick, onTagClick, activeTags }: WallpaperCardProps) {
  return (
    <div className="relative group">
      {/* Image Container */}
      <Link to={`/wallpaper/${wallpaper.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer">
          <img
            src={wallpaper.url}
            alt={wallpaper.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 select-none"
            draggable="false"
            style={{ 
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
          />
          
          {/* Semi-transparent overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          {/* Download Button - Always visible but more prominent on hover */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onDownloadClick(wallpaper);
            }}
            className="absolute bottom-2 right-2 bg-black/30 hover:bg-[#c70039] text-white p-2 rounded-lg transition-all duration-200 group-hover:bg-[#c70039] backdrop-blur-sm"
            title="Download 4K"
          >
            <Download size={20} />
          </button>

          {/* Tags - Show on hover */}
          <div className="absolute bottom-2 left-2 right-12 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {wallpaper.tags.slice(0, 2).map((tag) => (
              <button
                key={`${wallpaper.id}-${tag}`}
                onClick={(e) => {
                  e.preventDefault();
                  onTagClick(tag);
                }}
                className={`px-2 py-1 text-xs rounded-full backdrop-blur-sm transition-colors ${
                  activeTags.has(tag)
                    ? 'bg-[#c70039] text-white'
                    : 'bg-black/30 text-white hover:bg-[#c70039]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}