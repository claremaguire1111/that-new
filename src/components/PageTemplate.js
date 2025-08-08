import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider, css, keyframes } from 'styled-components';
import Navigation from './Navigation';

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

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const twinkle = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.8; }
  100% { opacity: 0.2; }
`;

// Glass morphism styles
const glassEffect = css`
  background: ${props => props.theme.colors.glassEffect};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-image: ${props => props.theme.colors.glassGradient};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  box-shadow: ${props => props.theme.colors.glassShadow};
  position: relative;
  overflow: hidden;
  
  ${props => props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0.02) 20%, 
        transparent 60%
      );
      opacity: 0.5;
      pointer-events: none;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.03) 0%,
        transparent 50%,
        rgba(255, 255, 255, 0.02) 100%
      );
      pointer-events: none;
    }
  `}
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }
  
  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background};
    background-image: ${props => props.theme.colors.backgroundGradient};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2.5rem;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 2.5rem;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2rem;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1.75rem;
    }
  }
  
  h3 {
    font-size: 1.75rem;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 1.5rem;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1.25rem;
    }
  }
  
  p {
    margin-bottom: 1.5em;
    font-size: 1rem;
    line-height: 1.6;
  }
  
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  .dropdown {
    position: relative;
    
    &:hover .dropdown-content {
      display: block !important;
    }
  }
  
  .dropdown-content {
    a {
      display: block;
      padding: 8px 0;
      margin: 5px 0;
      
      &:hover {
        opacity: 1;
        color: ${props => props.theme.colors.accent};
      }
    }
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  /* Make all images grayscale in light mode */
  img {
    filter: ${props => props.theme.isDark ? 'none' : 'grayscale(100%)'};
    transition: filter 0.3s ease;
    max-width: 100%;
  }
`;

// Stars background for dark mode
const StarsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  display: ${props => props.theme.isDark ? 'block' : 'none'};
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
  animation: ${twinkle} ${props => props.duration || '3s'} infinite ease-in-out;
  animation-delay: ${props => props.delay || '0s'};
  
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

const Section = styled.section`
  padding: 6rem 0;
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 4rem 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 3rem 0;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  gap: ${props => props.gap || '0'};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: ${props => props.mobileDirection || props.direction || 'column'};
    gap: ${props => props.mobileGap || props.gap || '1.5rem'};
  }
`;

// Header Components
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  background-color: ${props => props.scrolled ? props.theme.colors.navBackground : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  
  ${props => props.scrolled && props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.03) 0%, 
        rgba(255, 255, 255, 0.02) 50%,
        rgba(255, 255, 255, 0.03) 100%
      );
      pointer-events: none;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
    }
  `}
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  z-index: 1001;
  letter-spacing: -0.02em;
  
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.colors.navBackground};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1000;
    padding-top: 5rem;
    gap: 1.5rem;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  position: relative;
  color: ${props => props.theme.colors.text};
  font-size: 0.9375rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: ${props => props.theme.colors.text};
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  z-index: 1001;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

// Hero Section Components
const HeroSection = styled(Section)`
  min-height: 50vh;
  display: flex;
  align-items: center;
  padding-top: 8rem;
  overflow: hidden;
  position: relative;
  
  ${props => props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at 50% 30%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.01) 20%,
        transparent 60%
      );
      pointer-events: none;
    }
  `}
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-out;
`;

const SmallHeading = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.875rem;
  }
`;

const MainHeading = styled.h1`
  font-size: 3.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
  background: ${props => props.theme.isDark ? 'linear-gradient(135deg, #FFFFFF 0%, #AAAAAA 100%)' : 'none'};
  -webkit-background-clip: ${props => props.theme.isDark ? 'text' : 'none'};
  -webkit-text-fill-color: ${props => props.theme.isDark ? 'transparent' : 'inherit'};
  position: relative;
  
  ${props => props.theme.isDark && css`
    &::after {
      content: attr(data-text);
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: blur(8px);
      opacity: 0.6;
      animation: ${pulse} 4s infinite ease-in-out;
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const SubHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

// Button Styles
const Button = styled.button`
  position: relative;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  font-size: 0.9375rem;
  border-radius: ${props => props.theme.radii.md};
  overflow: hidden;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;
  line-height: 1.4;
  
  ${props => props.theme.isDark ? css`
    background: ${props.primary ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${props.primary ? '#000000' : '#FFFFFF'};
    border: 1px solid ${props.primary ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.1) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-2px);
      background: ${props.primary ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)'};
      box-shadow: ${props.primary ? '0 8px 16px rgba(0, 0, 0, 0.2)' : 'none'};
      opacity: 1;
      
      &::before {
        opacity: 1;
      }
    }
  ` : css`
    background: ${props.primary ? '#202123' : '#F1F1F1'};
    color: ${props.primary ? '#FFFFFF' : '#202123'};
    border: 1px solid ${props.primary ? 'transparent' : '#E5E5E5'};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.1) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.primary ? '0 6px 12px rgba(0, 0, 0, 0.15)' : 'none'};
      background: ${props.primary ? '#333333' : '#E5E5E5'};
      opacity: 1;
      
      &::before {
        opacity: 1;
      }
    }
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`;

// Badge Components
const Badge = styled.span`
  display: inline-block;
  padding: 0.35em 0.75em;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: ${props => props.theme.radii.md};
  background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : props.theme.colors.buttonSecondary};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.25rem;
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

// Generate stars for dark mode
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
        duration={`${Math.random() * 5 + 2}s`}
        delay={`${Math.random() * 5}s`}
      />
    );
  }
  
  return stars;
};

// Form Styles for reuse
const FormContainer = styled.div`
  max-width: 600px; 
  margin: 0 auto;
  padding: 2.5rem;
  border-radius: 16px;
  background: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.4)' : '#F9F9F9'};
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE'};
  box-shadow: ${props => props.theme.isDark ? '0 15px 40px rgba(0, 0, 0, 0.4)' : '0 15px 40px rgba(0, 0, 0, 0.05)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #DDDDDD'};
  background: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF'};
  color: ${props => props.theme.isDark ? '#FFFFFF' : '#333333'};
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: ${props => props.theme.isDark ? 'inset 0 1px 3px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 3px rgba(0, 0, 0, 0.05)'};
  margin-bottom: 1.5rem;
  
  &::placeholder {
    color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.3)' : '#999999'};
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.isDark ? 'rgba(16, 163, 127, 0.2)' : 'rgba(16, 163, 127, 0.1)'};
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #DDDDDD'};
  background: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF'};
  color: ${props => props.theme.isDark ? '#FFFFFF' : '#333333'};
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: ${props => props.theme.isDark ? 'inset 0 1px 3px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 3px rgba(0, 0, 0, 0.05)'};
  margin-bottom: 1.5rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${props => props.theme.isDark ? 'FFFFFF' : '444444'}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;
  padding-right: 2.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
`;

const FormPrivacyText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.5)' : '#888888'};
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0;
`;

// Page Template Component
const PageTemplate = ({ 
  title, 
  subtitle, 
  children, 
  activePage = '/' 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const theme = darkTheme;
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      {/* Stars Background for Dark Mode */}
      <StarsContainer>
        {generateStars(200)}
      </StarsContainer>
      
      {/* Use the Navigation component */}
      <Navigation activePath={activePage} />
      
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <HeroContent>
            <Badge>October 28-30, 2025</Badge>
            <SmallHeading style={{ marginBottom: '0.5rem', color: '#FFFFFF' }}>Algorithmic Innovation and Entrepreneurship</SmallHeading>
            <MainHeading data-text={title}>{title}</MainHeading>
            <SubHeading>{subtitle}</SubHeading>
          </HeroContent>
        </Container>
      </HeroSection>
      
      {/* Page Content */}
      {children}
      
      {/* Footer */}
      <Footer>
        <Container>
          <FooterText>Brought to you by Thinking About Thinking, Inc.<br />A 501(c)3 Nonprofit Company in the State of New Jersey.<br /><br />28 Spring Street, Unit 156, Princeton, NJ, USA, 08540</FooterText>
          
          <FooterBottom>
            <Copyright>© 2025 THAT. All rights reserved.</Copyright>
            
            <SocialLinks>
              <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube</SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</SocialLink>
            </SocialLinks>
          </FooterBottom>
        </Container>
      </Footer>
    </ThemeProvider>
  );
};

export {
  PageTemplate,
  Section,
  Container,
  Flex,
  Button,
  ButtonGroup,
  SmallHeading,
  MainHeading,
  SubHeading,
  Badge,
  FormContainer,
  FormInput,
  FormSelect,
  FormLabel,
  FormPrivacyText,
  glassEffect
};