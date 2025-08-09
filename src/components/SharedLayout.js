import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle, css } from 'styled-components';
import Navigation from './Navigation';

// ElevenLabs-inspired dark theme
const darkTheme = {
  isDark: true,
  colors: {
    primary: '#202123',
    secondary: '#444654',
    accent: '#444654',
    background: '#0D0D13',
    backgroundGradient: 'linear-gradient(180deg, #0D0D13 0%, #16161D 100%)',
    cardBackground: 'rgba(60, 62, 68, 0.3)',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: 'rgba(255, 255, 255, 0.1)',
    buttonPrimary: '#FFFFFF',
    buttonText: '#000000',
    buttonSecondary: 'rgba(255, 255, 255, 0.1)',
    navBackground: 'rgba(13, 13, 19, 0.8)',
    glassEffect: 'rgba(60, 62, 68, 0.3)',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
    glassBorder: 'rgba(255, 255, 255, 0.05)',
    glassShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  fonts: {
    heading: "'Nyse', 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    body: "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', monospace",
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    round: '50%',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  }
};

// Light theme
const lightTheme = {
  isDark: false,
  colors: {
    primary: '#333333',
    secondary: '#666666',
    accent: '#444654',
    background: '#FFFFFF',
    backgroundGradient: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
    cardBackground: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#EEEEEE',
    buttonPrimary: '#444654',
    buttonText: '#FFFFFF',
    buttonSecondary: '#F5F5F5',
    navBackground: 'rgba(255, 255, 255, 0.9)',
    glassEffect: 'rgba(255, 255, 255, 0.7)',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
    glassBorder: '#EEEEEE',
    glassShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  fonts: {
    heading: "'Nyse', 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    body: "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', monospace",
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    round: '50%',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  }
};

// Glass effect
const glassEffect = css`
  background: ${props => props.theme.colors.glassEffect};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-image: ${props => props.theme.colors.glassGradient};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  box-shadow: ${props => props.theme.colors.glassShadow};
  position: relative;
  overflow: hidden;
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.5;
    overflow-x: hidden;
    background: ${props => props.theme.colors.backgroundGradient};
    min-height: 100vh;
  }
  
  h1, h2, h3, h4, h5, h6, .heading {
    font-family: ${props => props.theme.fonts.heading};
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }
`;

// Theme Toggle Button
const ThemeToggleContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const ThemeToggleButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.radii.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
  background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'};
  }
`;

// Stars background
const StarsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  background-color: #ffffff;
  width: ${props => props.size || '2px'};
  height: ${props => props.size || '2px'};
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  opacity: ${props => props.opacity || 0.5};
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 70%);
    opacity: 0.3;
  }
`;

// Layout Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding-top: 70px; /* Account for fixed header */
`;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 1.5rem;
  }
`;

// Footer Components
const Footer = styled.footer`
  background-color: ${props => props.theme.isDark ? 'rgba(13, 13, 19, 0.5)' : '#F1F1F1'};
  color: ${props => props.theme.colors.text};
  padding: 3rem 0;
  position: relative;
  
  ${props => props.theme.isDark && css`
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  `}
`;

const FooterText = styled.p`
  margin-bottom: 1.5rem;
  max-width: 400px;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9375rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#E5E5E5'};
  margin-top: 2rem;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  color: ${props => props.theme.colors.textSecondary};
  
  &:hover {
    color: ${props => props.theme.colors.text};
    opacity: 1;
    transform: translateY(-2px);
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.textSecondary};
`;

// Generate stars for background
const generateStars = (count) => {
  const stars = [];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 1 + 'px';
    stars.push(
      <Star 
        key={`star-${i}`}
        size={size}
        top={`${Math.random() * 100}%`}
        left={`${Math.random() * 100}%`}
        opacity={Math.random() * 0.5 + 0.2}
      />
    );
  }
  
  return stars;
};

// Create the shared layout component
const SharedLayout = ({ children, activePath }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <PageContainer>
        <GlobalStyle />
        
        {/* Stars Background - only show in dark mode */}
        {isDarkMode && (
          <StarsContainer>
            {generateStars(200)}
          </StarsContainer>
        )}
        
        {/* Theme Toggle Button */}
        <ThemeToggleContainer>
          <ThemeToggleButton onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </ThemeToggleButton>
        </ThemeToggleContainer>
        
        {/* Navigation */}
        <Navigation activePath={activePath} />
        
        {/* Main Content */}
        <Main>
          {children}
        </Main>
        
        {/* Footer */}
        <Footer>
          <Container>
            <FooterText>
              Brought to you by Thinking About Thinking, Inc.<br />
              A 501(c)3 Nonprofit Company in the State of New Jersey.<br /><br />
              28 Spring Street, Unit 156, Princeton, NJ, USA, 08540
            </FooterText>
            
            <FooterBottom>
              <Copyright>© 2025 THAT. All rights reserved.</Copyright>
              
              <SocialLinks>
                <SocialLink href="https://x.com/thought_channel" target="_blank" rel="noopener noreferrer">Twitter</SocialLink>
                <SocialLink href="https://www.instagram.com/thoughts_channel" target="_blank" rel="noopener noreferrer">Instagram</SocialLink>
                <SocialLink href="https://www.linkedin.com/company/thinking-about-thinking-inc/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
                <SocialLink href="https://www.youtube.com/@ThoughtChannel" target="_blank" rel="noopener noreferrer">YouTube</SocialLink>
              </SocialLinks>
            </FooterBottom>
          </Container>
        </Footer>
      </PageContainer>
    </ThemeProvider>
  );
};

export { SharedLayout, Container, glassEffect };