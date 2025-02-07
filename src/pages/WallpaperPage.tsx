import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Wallpaper } from '../types';
import { EmailPopup } from '../components/EmailPopup';
import { WallpaperCard } from '../components/WallpaperCard';
import { ArrowLeft } from 'lucide-react';
import wallpaperData from '../data/wallpapers.json';

export function WallpaperPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [relatedWallpapers, setRelatedWallpapers] = useState<Wallpaper[]>([]);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [activeTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Scroll to top when the wallpaper ID changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const foundWallpaper = wallpaperData.wallpapers.find(w => w.id === id);
    if (foundWallpaper) {
      setWallpaper(foundWallpaper);
      document.title = `${foundWallpaper.title} - Aestora`;

      // Find related wallpapers that share at least one tag
      const related = wallpaperData.wallpapers
        .filter(w => 
          w.id !== foundWallpaper.id && // Exclude current wallpaper
          w.tags.some(tag => foundWallpaper.tags.includes(tag)) // Must share at least one tag
        )
        .sort(() => Math.random() - 0.5) // Randomize order
        .slice(0, 10); // Limit to 10 wallpapers

      setRelatedWallpapers(related);
    } else {
      navigate('/');
    }

    const emailSubmitted = localStorage.getItem('emailSubmitted');
    if (emailSubmitted) {
      setHasSubmittedEmail(true);
    }

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

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id, navigate]);

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

  const handleTagClick = (tag: string) => {
    navigate('/?tag=' + encodeURIComponent(tag));
  };

  if (!wallpaper) {
    return null;
  }

  return (
    <div 
      className="min-h-screen bg-[#121212]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <nav className="sticky top-0 z-50 bg-[#121212] border-b border-[#2a2a2a] px-4 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-[#c70039] transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <a href="/" className="flex items-center">
              <img 
                src="https://i.ibb.co/nNvK8jQf/Logo.png" 
                alt="Aestora Logo"
                className="h-8 w-auto"
                draggable="false"
              />
            </a>
          </div>

          <button 
            className="bg-[#c70039] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#a30030] transition-colors"
            onClick={() => setShowEmailPopup(true)}
          >
            ✨ Join Our Private Collection
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
          <div className="relative flex justify-center">
            <img
              src={wallpaper.url}
              alt={wallpaper.title}
              className="max-h-[80vh] w-auto object-contain select-none"
              draggable="false"
              style={{ 
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
            />
            <button
              onClick={() => handleDownloadClick(wallpaper)}
              className="absolute bottom-4 right-4 bg-[#c70039] text-white px-6 py-3 rounded-lg hover:bg-[#a30030] transition-colors flex items-center gap-2 font-medium"
            >
              Download 4K
            </button>
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-2">{wallpaper.title}</h1>
            <p className="text-gray-400 mb-4">{wallpaper.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {wallpaper.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1 text-sm rounded-full bg-[#2a2a2a] text-white hover:bg-[#c70039] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Related Wallpapers Section */}
        {relatedWallpapers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
              {relatedWallpapers.map((wallpaper) => (
                <div key={wallpaper.id} className="mb-2 break-inside-avoid">
                  <WallpaperCard
                    wallpaper={wallpaper}
                    onDownloadClick={handleDownloadClick}
                    onTagClick={handleTagClick}
                    activeTags={activeTags}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showEmailPopup && (
        <EmailPopup
          onClose={() => setShowEmailPopup(false)}
          wallpaperId={wallpaper.id}
        />
      )}

      <footer className="mt-12 py-4 bg-[#1a1a1a] text-gray-400 text-center text-sm">
        <p>&copy; 2025 Aestora | <a href="/privacy" className="text-[#c70039] hover:underline">Privacy Policy</a></p>
      </footer>
    </div>
  );
}