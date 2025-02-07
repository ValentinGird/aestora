import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';  // 👈 On utilise HashRouter au lieu de BrowserRouter
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('❌ Root element not found in index.html');

createRoot(rootElement).render(
  <StrictMode>
    <HashRouter>  {/* 👈 Fix pour que toutes les pages fonctionnent sur GitHub Pages */}
      <App />
    </HashRouter>
  </StrictMode>
);