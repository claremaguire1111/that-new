import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import TicketsPage from './pages/TicketsPage';
import SpeakersPage from './pages/speakers';
import AgendaPage from './pages/agenda';
import SponsorsPage from './pages/sponsors';
import MediaPage from './pages/media';
import BlogPage from './pages/blog';
import JobsPage from './pages/jobs';
import AboutPage from './pages/about';
import TeamPage from './pages/about/team';

// Dark theme
const darkTheme = {
  colors: {
    primary: '#202123',
    secondary: '#444654',
    accent: '#10A37F',
    background: '#0D0D13',
    backgroundGradient: 'linear-gradient(180deg, #0D0D13 0%, #16161D 100%)',
    cardBackground: 'rgba(32, 33, 35, 0.5)',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: 'rgba(255, 255, 255, 0.1)',
    buttonPrimary: '#FFFFFF',
    buttonText: '#000000',
    buttonSecondary: 'rgba(255, 255, 255, 0.1)',
    navBackground: 'rgba(13, 13, 19, 0.8)',
    glassEffect: 'rgba(32, 33, 35, 0.4)',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
    glassBorder: 'rgba(255, 255, 255, 0.05)',
    glassShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  fonts: {
    heading: "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    body: "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', monospace",
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    round: '50%',
  },
  breakpoints: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1440px',
    xxl: '1920px',
  },
  isDark: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/team" element={<TeamPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);