import { HashRouter, Routes, Route } from 'react-router-dom';  // 👈 Remplace BrowserRouter par HashRouter
import { HomePage } from './pages/HomePage';
import { ThankYou } from './pages/ThankYou';
import { WallpaperPage } from './pages/WallpaperPage';

export default function App() {
  return (
    <HashRouter>  {/* 👈 Correction ici */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallpaper/:id" element={<WallpaperPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </HashRouter>
  );
}
