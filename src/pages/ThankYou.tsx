import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wallpaperData from '../data/wallpapers.json';

export function ThankYou() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Récupérer l'ID du wallpaper depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const wallpaperId = params.get('wallpaper');
    
    if (wallpaperId) {
      // Trouver le wallpaper correspondant
      const wallpaper = wallpaperData.wallpapers.find(w => w.id === wallpaperId);
      
      if (wallpaper) {
        // Déclencher le téléchargement
        const link = document.createElement('a');
        link.href = wallpaper.url_4k;
        link.download = `kawaiify-wallpaper-${wallpaper.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    // Marquer l'email comme soumis
    localStorage.setItem('emailSubmitted', 'true');

    // Compte à rebours pour la redirection
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">🎉 Thank You!</h1>
        <p className="text-gray-300 mb-6">
          Your wallpaper is downloading automatically. You'll be redirected to the homepage in {countdown} seconds...
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#FF69B4] text-white px-6 py-2 rounded-lg hover:bg-[#FF1493] transition-colors"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
}