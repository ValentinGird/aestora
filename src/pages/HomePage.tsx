import React, { useState, useEffect } from 'react';
import { Wallpaper } from '../types';
import { WallpaperCard } from '../components/WallpaperCard';
import { EmailPopup } from '../components/EmailPopup';
import { ArrowUp } from 'lucide-react';
import wallpaperData from '../data/wallpapers.json';

export function HomePage() {
  const [wallpapers] = useState<Wallpaper[]>(wallpaperData.wallpapers);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    const emailSubmitted = localStorage.getItem('emailSubmitted');
    if (emailSubmitted) {
      setHasSubmittedEmail(true);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    // Prevent context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl+S, Ctrl+P, etc.
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
          case 'p':
          case 'u':
            e.preventDefault();
            return false;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Disable scroll when popup is open
  useEffect(() => {
    if (showEmailPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEmailPopup]);

  const handleDownloadClick = async (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    if (hasSubmittedEmail) {
      const link = document.createElement('a');
      link.href = wallpaper.url_4k;
      link.download = `aestora-wallpaper-${wallpaper.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setShowEmailPopup(true);
    }
  };

  const handleTagToggle = (tag: string) => {
    setActiveTags(prev => {
      const newTags = new Set(prev);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  };

  const filteredWallpapers = wallpapers.filter(wallpaper => {
    const matchesSearch = wallpaper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallpaper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallpaper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTags = activeTags.size === 0 || 
                       wallpaper.tags.some(tag => activeTags.has(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div 
      className="min-h-screen bg-[#121212]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <nav className="sticky top-0 z-50 bg-[#121212] border-b border-[#2a2a2a] px-4 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="/" className="flex items-center">
            <img 
              src="https://i.ibb.co/nNvK8jQf/Logo.png" 
              alt="Aestora Logo"
              className="h-8 w-auto"
              draggable="false"
            />
          </a>

          <button 
            className="bg-[#c70039] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#a30030] transition-colors"
            onClick={() => setShowEmailPopup(true)}
          >
            ✨ Join Our Private Collection
          </button>
        </div>
      </nav>

      <div className="px-4 py-3">
        <input
          type="text"
          placeholder="Search wallpapers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#c70039] transition-colors"
        />
      </div>

      <div className="px-2">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
          {filteredWallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="mb-2 break-inside-avoid">
              <WallpaperCard
                wallpaper={wallpaper}
                onDownloadClick={handleDownloadClick}
                onTagClick={handleTagToggle}
                activeTags={activeTags}
              />
            </div>
          ))}
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-[#c70039] text-white rounded-full shadow-lg hover:bg-[#a30030] transition-colors"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {showEmailPopup && selectedWallpaper && (
        <EmailPopup
          onClose={() => setShowEmailPopup(false)}
          wallpaperId={selectedWallpaper.id}
        />
      )}

      <footer className="mt-12 py-4 bg-[#1a1a1a] text-gray-400 text-center text-sm">
        <p>&copy; 2025 Aestora | <a href="/privacy" className="text-[#c70039] hover:underline">Privacy Policy</a></p>
      </footer>
    </div>
  );
}