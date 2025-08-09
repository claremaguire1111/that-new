import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider, css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { SharedLayout } from '../../components/SharedLayout';

// ElevenLabs-inspired dark theme
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
    heading: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    body: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
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

// Light theme with black and white
const lightTheme = {
  colors: {
    primary: '#202123',
    secondary: '#444654',
    accent: '#10A37F',
    background: '#FFFFFF',
    backgroundGradient: 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)',
    cardBackground: '#FFFFFF',
    text: '#202123',
    textSecondary: '#666666',
    border: '#EEEEEE',
    buttonPrimary: '#202123',
    buttonText: '#FFFFFF',
    buttonSecondary: '#F1F1F1',
    navBackground: 'rgba(255, 255, 255, 0.9)',
    glassEffect: 'rgba(255, 255, 255, 0.7)',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2))',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    glassShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  fonts: {
    heading: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    body: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
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
  isDark: false,
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

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
  50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
`;

const liquidMove = keyframes`
  0% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
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
      animation: ${liquidMove} 15s infinite alternate ease-in-out;
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
    
    &::after {
      content: "▼";
      font-size: 8px;
      margin-left: 5px;
      vertical-align: middle;
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
      
      &::after {
        display: none;
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
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.15);
    opacity: 0.15;
  }
`;

const MovingStar = styled(Star)`
  animation: ${twinkle} ${props => props.twinkleDuration || '3s'} infinite ease-in-out,
             ${float} ${props => props.moveDuration || '15s'} infinite ease-in-out;
  animation-delay: ${props => props.delay || '0s'}, ${props => props.moveDelay || '0s'};
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  grid-gap: ${props => props.gap || '2rem'};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(6, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    grid-gap: ${props => props.mobileGap || props.gap || '1.5rem'};
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

// Dark Mode Toggle
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
  
  ${props => props.theme.isDark ? css`
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #FFF;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    animation: ${glow} 3s infinite ease-in-out;
    
    &::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      border-radius: ${props.theme.radii.round};
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      z-index: -1;
      opacity: 0.6;
    }
    
    &:hover {
      transform: translateY(-3px);
      background-color: rgba(255, 255, 255, 0.15);
    }
  ` : css`
    background: #F1F1F1;
    border: 1px solid #E5E5E5;
    color: #202123;
    
    &:hover {
      transform: translateY(-3px);
      background-color: #E5E5E5;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    }
  `}
`;

// ElevenLabs-style Button
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
      
      &::before {
        opacity: 1;
      }
    }
  `}
`;

// Navigation Components
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

const Logo = styled.a`
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

// Ticket table styling
const TicketsSection = styled(Section)`
  position: relative;
  
  ${props => props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  `}
`;

const TicketTable = styled.div`
  overflow-x: auto;
  margin: 2rem 0;
  border-radius: ${props => props.theme.radii.md};
  ${props => props.theme.isDark && css`
    ${glassEffect}
  `}
  border: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : props.theme.colors.border};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
`;

const TableHead = styled.thead`
  background-color: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.6)' : '#F5F5F5'};
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : props.theme.colors.border};
  }
`;

const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.3)' : '#FAFAFA'};
    }
    
    &:hover {
      background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#F0F0F0'};
    }
  }
  
  td {
    padding: 1rem;
    border-bottom: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : props.theme.colors.border};
    
    &:last-child {
      color: ${props => props.theme.colors.textSecondary};
      font-style: italic;
      font-size: 0.875rem;
    }
  }
`;

const CategoryHeader = styled.tr`
  background-color: ${props => props.theme.isDark ? 'rgba(16, 163, 127, 0.2)' : '#E6F7F2'} !important;
  
  td {
    font-weight: 600;
    padding: 0.75rem 1rem;
    color: ${props => props.theme.isDark ? '#FFFFFF' : '#10A37F'};
  }
`;

const TicketCTA = styled.div`
  margin: 3rem 0;
  text-align: center;
`;

const NavLink = styled.a`
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 5rem;
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

// Schedule Section
const ScheduleSection = styled(Section)`
  background-color: ${props => props.theme.isDark ? 'transparent' : props.theme.colors.backgroundGradient};
  position: relative;
  
  ${props => props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  `}
`;

const ScheduleDay = styled.div`
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DayTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const DaySubtitle = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 400;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

// Speakers Grid
const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SpeakerCard = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.radii.md};
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#EEEEEE'};
  
  ${props => props.theme.isDark && css`
    ${glassEffect}
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px ${props => props.theme.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
    
    ${props => `
      & > div:first-child {
        filter: ${props.theme.isDark ? 'none' : 'grayscale(70%)'};
      }
    `}
  }
`;

const SpeakerImage = styled.div`
  height: 200px;
  background-color: ${props => props.theme.isDark ? '#16161D' : '#F5F5F5'};
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
  filter: ${props => props.theme.isDark ? 'none' : 'grayscale(100%)'};
  transition: filter 0.3s ease;
  
  // Placeholder when image is missing
  ${props => !props.src && css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("/images/misc/speaker_cards.jpg");
    
    &::after {
      content: '${props.name || 'Speaker'}';
      font-weight: 500;
      color: ${props.theme.colors.textSecondary};
      background: rgba(0,0,0,0.7);
      padding: 5px 10px;
      border-radius: 4px;
    }
  `}
`;

const SpeakerInfo = styled.div`
  padding: 1.25rem;
`;

const SpeakerName = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const SpeakerTitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.25rem;
  line-height: 1.4;
`;

const SpeakerCompany = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
`;

// Features Section
const FeaturesSection = styled(Section)`
  position: relative;
  
  ${props => props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  `}
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2.5rem 2rem;
  border-radius: ${props => props.theme.radii.md};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${props => props.theme.isDark ? css`
    ${glassEffect}
    border: 1px solid rgba(255, 255, 255, 0.05);
  ` : css`
    border: 1px solid ${props.theme.colors.border};
    background-color: #FFFFFF;
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, ${props => props.theme.isDark ? 0.2 : 0.05});
    
    ${props => props.theme.isDark && css`
      border-color: rgba(255, 255, 255, 0.1);
    `}
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#F1F1F1'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  
  ${props => props.theme.isDark && css`
    animation: ${float} 6s infinite ease-in-out;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  `}
`;

const FeatureTitle = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  font-size: 0.9375rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0;
`;

// Sponsors Section
const SponsorsSection = styled(Section)`
  text-align: center;
  position: relative;
  background-color: ${props => props.theme.isDark ? 'transparent' : '#F9F9F9'};
  
  ${props => props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  `}
`;

const SponsorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  grid-gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SponsorCategory = styled.div`
  margin-bottom: 5rem;
  padding: 2rem;
  border-radius: ${props => props.theme.radii.lg};
  background-color: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.2)' : '#F9F9F9'};
  
  ${props => props.theme.isDark && css`
    background: rgba(32, 33, 35, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  `}
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SponsorCategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.text};
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.2)' : '#DDDDDD'};
  }
`;

const SponsorLogo = styled.div`
  height: 120px;
  background-color: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.4)' : '#FFFFFF'};
  border-radius: ${props => props.theme.radii.md};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#EEEEEE'};
  
  ${props => props.theme.isDark && css`
    ${glassEffect}
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, ${props => props.theme.isDark ? 0.2 : 0.05});
    
    img {
      opacity: 1;
      filter: grayscale(100%);
      transform: scale(1.05);
    }
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.9;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }
`;

// Venue Section
const VenueSection = styled(Section)`
  position: relative;
  
  ${props => props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  `}
`;

const VenueInfo = styled.div`
  max-width: 500px;
  margin-right: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-right: 0;
    margin-bottom: 2rem;
    max-width: 100%;
  }
`;

const VenueAddress = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const VenueDirections = styled.p`
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.textSecondary};
  
  strong {
    color: ${props => props.theme.colors.text};
    font-weight: 600;
  }
`;

const VenueMap = styled.div`
  flex: 1;
  min-height: 300px;
  border-radius: ${props => props.theme.radii.md};
  overflow: hidden;
  filter: grayscale(${props => props.theme.isDark ? '50%' : '100%'});
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.theme.isDark ? 0.2 : 0.1});
  border: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#EEEEEE'};
  
  &:hover {
    filter: grayscale(${props => props.theme.isDark ? '0%' : '70%'});
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
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

// Generate stars for dark mode
const generateStars = (count) => {
  const stars = [];
  
  // Create random stars
  for (let i = 0; i < count * 0.7; i++) {
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
  
  // Create star clusters for more realism
  const clusterCount = Math.floor(count * 0.3 / 10);
  for (let c = 0; c < clusterCount; c++) {
    const clusterCenterX = Math.random() * 100;
    const clusterCenterY = Math.random() * 100;
    const clusterRadius = Math.random() * 15 + 5;
    
    for (let i = 0; i < 10; i++) {
      // Generate stars in a cluster
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * clusterRadius;
      const x = clusterCenterX + Math.cos(angle) * distance;
      const y = clusterCenterY + Math.sin(angle) * distance;
      
      // Brighter stars in clusters
      const size = Math.random() * 3 + 1 + 'px';
      stars.push(
        <Star 
          key={`cluster-${c}-star-${i}`}
          size={size}
          top={`${y}%`}
          left={`${x}%`}
          opacity={Math.random() * 0.6 + 0.3}
          duration={`${Math.random() * 4 + 3}s`}
          delay={`${Math.random() * 3}s`}
        />
      );
    }
  }
  
  return stars;
};

// Generate moving stars for dark mode
const generateMovingStars = (count) => {
  const stars = [];
  
  // Standard moving stars
  for (let i = 0; i < count * 0.7; i++) {
    const size = Math.random() * 3 + 1.5 + 'px';
    stars.push(
      <MovingStar 
        key={`moving-star-${i}`}
        size={size}
        top={`${Math.random() * 100}%`}
        left={`${Math.random() * 100}%`}
        opacity={Math.random() * 0.5 + 0.3}
        twinkleDuration={`${Math.random() * 5 + 3}s`}
        moveDuration={`${Math.random() * 20 + 15}s`}
        delay={`${Math.random() * 5}s`}
        moveDelay={`${Math.random() * 5}s`}
      />
    );
  }
  
  // Add some larger, brighter stars that move more slowly
  for (let i = 0; i < count * 0.3; i++) {
    const size = Math.random() * 4 + 2.5 + 'px';
    stars.push(
      <MovingStar 
        key={`large-moving-star-${i}`}
        size={size}
        top={`${Math.random() * 100}%`}
        left={`${Math.random() * 100}%`}
        opacity={Math.random() * 0.3 + 0.6} // Brighter
        twinkleDuration={`${Math.random() * 7 + 5}s`} // Slower twinkle
        moveDuration={`${Math.random() * 30 + 25}s`} // Slower movement
        delay={`${Math.random() * 4}s`}
        moveDelay={`${Math.random() * 3}s`}
      />
    );
  }
  
  return stars;
};

// Feature data
// Feature data for cards
const features = [
  {
    icon: "§",
    title: "Keynote Talks",
    description: "Hear from leading experts in AI research and application."
  },
  {
    icon: "§",
    title: "Panel Discussions",
    description: "Join thought-provoking conversations on AI's future challenges."
  },
  {
    icon: "§",
    title: "Breakout Sessions",
    description: "Dive deep into specific AI topics with focused group discussions."
  },
  {
    icon: "§",
    title: "Exhibition Hall",
    description: "Connect with organizations at the forefront of AI innovation."
  }
];

// Images for carousel
const carouselImages = [
  "/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.24.png",
  "/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.37.png",
  "/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.48.png",
  "/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.59.png",
  "/images/breakout_rooms/download copy 2.png"
];

// Agenda Page Component
function AgendaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
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
  
  // Speaker data
  // Ticket pricing data
const ticketPricing = {
  student: [
    { tier: "Super Early Bird", price: "£60", dailyPrice: "£25", notes: "Strict student ID check" },
    { tier: "Early Bird", price: "£99", dailyPrice: "£39", notes: "~150 available" },
    { tier: "Regular", price: "£139", dailyPrice: "£55", notes: "" }
  ],
  academic: [
    { tier: "Super Early Bird", price: "£120", dailyPrice: "£45", notes: "~320 available" },
    { tier: "Early Bird", price: "£139", dailyPrice: "£55", notes: "" },
    { tier: "Regular", price: "£199", dailyPrice: "£75", notes: "" }
  ],
  general: [
    { tier: "Super Early Bird", price: "£199", dailyPrice: "£75", notes: "~400 available" },
    { tier: "Early Bird", price: "£249", dailyPrice: "£95", notes: "" },
    { tier: "Regular", price: "£299", dailyPrice: "£115", notes: "" }
  ],
  special: [
    { category: "Pro Pass", tier: "Flat Rate", price: "£349", dailyPrice: "N/A", notes: "Merch bundle + priority seating" },
    { category: "VIP", tier: "Flat Rate", price: "£795", dailyPrice: "N/A", notes: "All-access, lounge, speaker dinner" },
    { category: "Group", tier: "Flat Rate", price: "-10% on total", dailyPrice: "N/A", notes: "Min. 5 tickets, any category" },
    { category: "Digital", tier: "Flat Rate", price: "£49", dailyPrice: "N/A", notes: "Livestream + recordings" }
  ]
};

const day1Speakers = [
    {
      name: "Dr David Silver",
      title: "Principal Research Scientist",
      company: "DeepMind",
      image: "/images/speakers/DrDavidSilver.jpg"
    },
    {
      name: "Dr Raia Hadsell",
      title: "VP of Research",
      company: "DeepMind",
      image: "/images/speakers/DrRaiaHadsell.jpg"
    },
    {
      name: "Prof. Jakob Foerster",
      title: "Senior Tech Lead",
      company: "Meta & Oxford",
      image: "/images/speakers/ProfJakobFoerster.jpg"
    },
    {
      name: "Dr Jonathan Richard Schwarz",
      title: "Head of AI Research",
      company: "Thomson Reuters",
      image: "/images/speakers/DrJonathanRichardSchwarz.jpg"
    },
    {
      name: "Dr Lion Schulz",
      title: "Head of Machine Learning",
      company: "Bertelsmann",
      image: "/images/speakers/DrLionSchulz.jpg"
    },
    {
      name: "Max Beverton-Palmer",
      title: "Head of Public Policy",
      company: "NVIDIA",
      image: "/images/speakers/MaxBeverton_Palmer.jpg"
    },
    {
      name: "Karl Havard",
      title: "CCO",
      company: "NSCALE",
      image: "/images/speakers/KarlHavard.jpg"
    },
    {
      name: "Mark Bjornsgaard",
      title: "Founder & CIO",
      company: "DeepGreen",
      image: "/images/speakers/MarkBjornsgaard.jpg"
    },
    {
      name: "Dr Joshua Tan",
      title: "Head of Policy",
      company: "Public AI",
      image: "/images/speakers/DrJoshuaTan.jpg"
    },
    {
      name: "Dr James Whittington",
      title: "Vice-President & Research Scientist",
      company: "Thinking About Thinking",
      company2: "Stanford & Oxford",
      image: "/images/speakers/DrJamesWhittington.jpg"
    },
    {
      name: "Dr Ruairidh McLennan Battleday",
      title: "President & Research Scientist",
      company: "Thinking About Thinking",
      company2: "Harvard & MIT",
      image: "/images/speakers/DrRuairidhMcLennanBattleday.jpg"
    },
    {
      name: "Dr Felix Sosa",
      title: "Research Scientist",
      company: "Harvard & MIT",
      image: "/images/speakers/DrFelixSosa.jpg"
    }
  ];

  const day2Speakers = [
    {
      name: "Prof. Chris Summerfield",
      title: "Research Director & Professor",
      company: "AISI & Oxford",
      image: "/images/speakers/ProfChrisSummerfield.webp"
    },
    {
      name: "Dr Samuel Bell",
      title: "AI Research Scientist",
      company: "Meta",
      image: "/images/speakers/DrSamuelBell.jpg"
    },
    {
      name: "Prof. Skyler Wang",
      title: "Assistant Professor & Research Scientist",
      company: "McGill & Meta",
      image: "/images/speakers/ProfSkylerWang.jpg"
    },
    {
      name: "Dr Marius Hobbhahn",
      title: "Director & Co-Founder",
      company: "Apollo Research",
      image: "/images/speakers/DrMariusHobbhahn.jpg"
    },
    {
      name: "David Sully",
      title: "CEO & Co-Founder",
      company: "ADVAI",
      image: "/images/speakers/DavidSully.jpg"
    },
    {
      name: "Ashley Ramrachia",
      title: "Founder and CEO",
      company: "Academy",
      image: "/images/speakers/AshleyRamrachia.jpg"
    },
    {
      name: "Dr Jakob Mökander",
      title: "Director",
      company: "Tony Blair Institute",
      image: "/images/speakers/DrJakobMökander.jpg"
    },
    {
      name: "Dr Kevin Loi-Heng",
      title: "Co-Founder & CEO",
      company: "Avalon Insights",
      image: "/images/speakers/DrKevinLoiHeng.jpg"
    },
    {
      name: "Nicolay Hagen",
      title: "Lecturer",
      company: "NTNU",
      image: "/images/speakers/NicolayHagen.jpg"
    },
    {
      name: "Julian Von Nehammer",
      title: "Director",
      company: "Lilt",
      image: "/images/speakers/JulianVonNehammer.jpg"
    }
  ];

  const day3Speakers = [
    {
      name: "Dr Irina Jurenka",
      title: "Research Lead",
      company: "DeepMind",
      image: "/images/speakers/DrIrinaJurenka.jpg"
    },
    {
      name: "Pete Hill",
      title: "Co-Founder",
      company: "Cudo",
      image: "/images/speakers/PeteHIll.jpg"
    },
    {
      name: "Dr Trias Gkikopoulos",
      title: "Innovation Lead - Robotics & AI",
      company: "Innovate UK",
      image: "/images/speakers/DrTriasGkikopoulos.jpg"
    },
    {
      name: "Erwann Le Lannou",
      title: "Ventures",
      company: "XTX Markets",
      image: "/images/speakers/ErwannLeLannou.jpg"
    },
    {
      name: "Timo Hannay",
      title: "Entrepreneur",
      company: "Project X",
      image: "/images/speakers/TimoHannay.jpg"
    },
    {
      name: "Dr Lucinda Scharff",
      title: "Staff Clinical Specialist",
      company: "Google Health",
      image: "/images/speakers/DrLucindaScharff.jpg"
    },
    {
      name: "Li-Lian Ang",
      title: "Product Manager",
      company: "BlueDot Impact",
      image: "/images/speakers/LiLianAng.jpg"
    },
    {
      name: "Rehana Al-Soltane",
      title: "Learning Manager",
      company: "Raspberry Pi Foundation",
      image: "/images/speakers/RehanaAlSoltane.jpg"
    },
    {
      name: "Prof. Dan Nicolau Jr",
      title: "Professor",
      company: "KCL",
      image: "/images/speakers/ProfDanNicolauJr.jpg"
    }
  ];

  // Render the app
  return (
    <SharedLayout activePath="/agenda">
      
      {/* Hero Section */}
      <HeroSection id="home">
        <Container>
          <HeroContent>
            <Badge>October 28-30, 2025</Badge>
            <SmallHeading style={{ 
              marginBottom: '0.75rem', 
              color: '#FFFFFF', 
              fontSize: '1.2rem',
              fontWeight: '500',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}>
              Algorithmic Innovation and Entrepreneurship
            </SmallHeading>
            <MainHeading data-text="Global Summit on Open Problems for AI">Global Summit on<br />Open Problems for AI</MainHeading>
            <SubHeading>How can Britain leverage AI research breakthroughs safely to drive productivity and growth?</SubHeading>
            <ButtonGroup>
              <Button as="a" href="/tickets" primary>
                Buy Tickets
              </Button>
              <Button as="a" href="#register">
                Sign Up
              </Button>
            </ButtonGroup>
          </HeroContent>
        </Container>
      </HeroSection>
      
      
      {/* Schedule Section */}
      <ScheduleSection id="schedule">
        <Container>
          <SmallHeading>Schedule</SmallHeading>
          <MainHeading>Event Schedule</MainHeading>
          
          <ScheduleDay delay="0.1s">
            <DayTitle>Day 1: Oct 28th</DayTitle>
            <DaySubtitle>New Algorithmic Breakthroughs and AI Infrastructure</DaySubtitle>
            <SpeakersGrid>
              {day1Speakers.map((speaker, index) => (
                <SpeakerCard key={index}>
                  <SpeakerImage 
                    src={speaker.image} 
                    name={speaker.name}
                  />
                  <SpeakerInfo>
                    <SpeakerName>{speaker.name}</SpeakerName>
                    <SpeakerTitle>{speaker.title}</SpeakerTitle>
                    <SpeakerCompany>{speaker.company}</SpeakerCompany>
                    {speaker.company2 && <SpeakerCompany>{speaker.company2}</SpeakerCompany>}
                  </SpeakerInfo>
                </SpeakerCard>
              ))}
            </SpeakersGrid>
          </ScheduleDay>
          
          <ScheduleDay delay="0.2s">
            <DayTitle>Day 2: Oct 29th</DayTitle>
            <DaySubtitle>AI Safety, and AI in Enterprise & Society</DaySubtitle>
            <SpeakersGrid>
              {day2Speakers.map((speaker, index) => (
                <SpeakerCard key={index}>
                  <SpeakerImage 
                    src={speaker.image}
                    name={speaker.name}
                  />
                  <SpeakerInfo>
                    <SpeakerName>{speaker.name}</SpeakerName>
                    <SpeakerTitle>{speaker.title}</SpeakerTitle>
                    <SpeakerCompany>{speaker.company}</SpeakerCompany>
                    {speaker.company2 && <SpeakerCompany>{speaker.company2}</SpeakerCompany>}
                  </SpeakerInfo>
                </SpeakerCard>
              ))}
            </SpeakersGrid>
          </ScheduleDay>
          
          <ScheduleDay delay="0.3s">
            <DayTitle>Day 3: Oct 30th</DayTitle>
            <DaySubtitle>AI Entrepreneurship & Application</DaySubtitle>
            <SpeakersGrid>
              {day3Speakers.map((speaker, index) => (
                <SpeakerCard key={index}>
                  <SpeakerImage 
                    src={speaker.image}
                    name={speaker.name}
                  />
                  <SpeakerInfo>
                    <SpeakerName>{speaker.name}</SpeakerName>
                    <SpeakerTitle>{speaker.title}</SpeakerTitle>
                    <SpeakerCompany>{speaker.company}</SpeakerCompany>
                    {speaker.company2 && <SpeakerCompany>{speaker.company2}</SpeakerCompany>}
                  </SpeakerInfo>
                </SpeakerCard>
              ))}
            </SpeakersGrid>
          </ScheduleDay>
        </Container>
      </ScheduleSection>
      
      {/* Sponsors Section */}
      <SponsorsSection id="sponsors">
        <Container>
          <SmallHeading>Our Supporters</SmallHeading>
          <MainHeading>Sponsors & Partners</MainHeading>
          <SubHeading style={{ maxWidth: '800px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            We're grateful to our sponsors and partners who make this summit possible
          </SubHeading>
          
          <SponsorCategory>
            <SponsorCategoryTitle>Gold Sponsor</SponsorCategoryTitle>
            <SponsorGrid columns={1}>
              <SponsorLogo style={{ maxWidth: '400px', margin: '0 auto' }}>
                <img src="/images/sponsors/gold/XTX_Markets.png" alt="XTX Markets" />
              </SponsorLogo>
            </SponsorGrid>
          </SponsorCategory>
          
          <SponsorCategory>
            <SponsorCategoryTitle>Silver Sponsor</SponsorCategoryTitle>
            <SponsorGrid columns={1}>
              <SponsorLogo style={{ maxWidth: '350px', margin: '0 auto' }}>
                <img src="/images/sponsors/silver/HSBC-Logo.png" alt="HSBC" />
              </SponsorLogo>
            </SponsorGrid>
          </SponsorCategory>
          
          <SponsorCategory>
            <SponsorCategoryTitle>Partners</SponsorCategoryTitle>
            <SponsorGrid columns={3}>
              <SponsorLogo>
                <img src="/images/sponsors/tony_blair copy.webp" alt="Tony Blair Institute" />
              </SponsorLogo>
              <SponsorLogo>
                <img src="/images/sponsors/public-ai-logo-large.png" alt="Public AI" />
              </SponsorLogo>
              <SponsorLogo>
                <img src="/images/sponsors/multiverse_logo_transparent.png" alt="Multiverse" />
              </SponsorLogo>
            </SponsorGrid>
          </SponsorCategory>
          
          <div style={{ marginTop: '3rem' }}>
            <SubHeading>Want to become a sponsor? Contact us</SubHeading>
            <ButtonGroup>
              <Button as="a" href="#contact" primary>
                Contact Us
              </Button>
            </ButtonGroup>
          </div>
        </Container>
      </SponsorsSection>
      
      {/* Logo Wall Section */}
      <Section id="community">
        <Container>
          <SmallHeading>Our Community</SmallHeading>
          <MainHeading>Supporting Organizations</MainHeading>
          <SubHeading style={{ maxWidth: '800px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            The AI ecosystem is represented by organizations from across the UK and beyond
          </SubHeading>
          
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '2rem', 
            background: isDarkMode ? 'rgba(32, 33, 35, 0.4)' : '#F9F9F9',
            padding: '2rem',
            borderRadius: '12px',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE'
          }}>
            <img 
              src="/images/misc/logo_wall.png" 
              alt="Supporting Organizations" 
              style={{ 
                maxWidth: '100%', 
                borderRadius: '8px',
                filter: isDarkMode ? 'none' : 'grayscale(100%)'
              }} 
            />
          </div>
        </Container>
      </Section>
      
      {/* Features Section */}
      <FeaturesSection id="algopreneurship">
        <Container>
          <SmallHeading>What to Expect</SmallHeading>
          <MainHeading>Join Us at THAT</MainHeading>
          <SubHeading>Speakers from the UK's leading institutions discuss the future challenges and opportunities in AI research and application.</SubHeading>
          
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
          
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ 
              textAlign: 'center', 
              marginBottom: '2rem', 
              fontSize: '1.5rem',
              position: 'relative',
              paddingBottom: '1rem'
            }}>
              Breakout Sessions
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '2px',
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#DDDDDD'
              }}></span>
            </h3>
            
            {/* Horizontal Carousel */}
            <div style={{ 
              position: 'relative',
              overflow: 'hidden',
              height: '300px',
              marginBottom: '3rem',
              borderRadius: '12px',
              boxShadow: isDarkMode ? '0 8px 30px rgba(0, 0, 0, 0.3)' : '0 8px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div 
                className="carousel-track" 
                style={{
                  display: 'flex',
                  gap: '20px',
                  width: 'fit-content',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  padding: '0 10px',
                  animation: 'slideLeft 30s linear infinite',
                }}
              >
                {/* Triple the images to create seamless loop */}
                {[
                  ...carouselImages,
                  ...carouselImages,
                  ...carouselImages
                ].map((imageSrc, index) => (
                  <div 
                    key={`carousel-img-${index}`} 
                    className="carousel-item"
                    style={{
                      height: '100%',
                      width: '400px',
                      flexShrink: 0,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      transform: 'translateZ(0)', // Hardware acceleration
                      boxShadow: isDarkMode ? '0 4px 15px rgba(0, 0, 0, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <img 
                      src={imageSrc} 
                      alt={`Breakout session ${index % carouselImages.length + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Adding custom keyframes for the animations */}
            <style jsx="true">{`
              @keyframes slideLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${carouselImages.length * (400 + 20)}px); }
              }
              
              /* Hover effect for images in the carousel */
              .carousel-track:hover {
                animation-play-state: paused;
              }
              
              .carousel-item:hover img {
                transform: scale(1.05);
                filter: grayscale(70%) !important;
              }
            `}</style>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <SubHeading>Join hundreds of like-minded researchers, policy makers, and entrepreneurs</SubHeading>
            <ButtonGroup>
              <Button as="a" href="#register" primary>
                Register Interest
              </Button>
            </ButtonGroup>
          </div>
        </Container>
      </FeaturesSection>
      
      
      {/* Venue Section */}
      <VenueSection id="venue">
        <Container>
          <SmallHeading>Location</SmallHeading>
          <MainHeading>Venue</MainHeading>
          
          <Flex mobileDirection="column" gap="2.5rem">
            <VenueInfo>
              <VenueAddress>Friend's House<br />173-177 Euston Road<br />London, NW1 2BJ</VenueAddress>
              <VenueDirections>
                <strong>Getting there</strong><br />
                Walking distance from Euston, Euston Square, and King's Cross. No on-site parking available.
              </VenueDirections>
              
              <div>
                <strong>Inquiries</strong><br />
                webmaster@thinkingaboutthinking.org
              </div>
              
              <ButtonGroup>
                <Button 
                  as="a" 
                  href="https://goo.gl/maps/1JZd7Z8nQJwF1ZBHA" 
                  target="_blank"
                  rel="noopener noreferrer"
                  primary
                >
                  Get Directions
                </Button>
              </ButtonGroup>
            </VenueInfo>
            
            <VenueMap>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.415700557149!2d-0.1350049233905342!3d51.52730870950385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b25ce671315%3A0x28af3d0d00fa38c0!2sFriends%20House!5e0!3m2!1sen!2sus!4v1691512895777!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ 
                  border: 0,
                  borderRadius: '8px'
                }}
                title="Friends House venue location map"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </VenueMap>
          </Flex>
        </Container>
      </VenueSection>
      
      {/* Media & Community Partners Section */}
      <Section id="media-community" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <Container>
          <SmallHeading>Join Our Community</SmallHeading>
          <MainHeading>Media & Community Partners</MainHeading>
          <SubHeading style={{ maxWidth: '800px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Join the thriving community of AI innovators and entrepreneurs building the future together.
          </SubHeading>
          
          <Flex direction="column" align="center" gap="3rem">
            {/* Partner Benefits */}
            <div style={{ 
              width: '100%', 
              maxWidth: '900px',
              padding: '2rem',
              borderRadius: '16px',
              backgroundColor: isDarkMode ? 'rgba(32, 33, 35, 0.4)' : '#F9F9F9',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE',
            }}>
              <h3 style={{ 
                textAlign: 'center', 
                marginBottom: '2rem',
                fontSize: '1.5rem',
              }}>Partnership Benefits</h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem' 
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    marginBottom: '1rem',
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                  }}>🎯</div>
                  <h4>Targeted Reach</h4>
                  <p style={{ fontSize: '0.9rem' }}>Connect with a focused audience of AI researchers, entrepreneurs, and decision-makers.</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    marginBottom: '1rem',
                    color: isDarkMode ? '#FFFFFF' : '#333333', 
                  }}>🔄</div>
                  <h4>Cross Promotion</h4>
                  <p style={{ fontSize: '0.9rem' }}>Mutual promotion across our channels and networks for maximum visibility.</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    marginBottom: '1rem',
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                  }}>🎟️</div>
                  <h4>Event Passes</h4>
                  <p style={{ fontSize: '0.9rem' }}>Complimentary passes to THAT Summit for your team or community members.</p>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div style={{ textAlign: 'center', maxWidth: '700px' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Become a Partner</h3>
              <p style={{ marginBottom: '2rem' }}>
                We're looking for media outlets, communities, organizations and networks who want to support algorithmic innovation and entrepreneurship.
              </p>
              
              <ButtonGroup>
                <Button as="a" href="mailto:partnerships@thinkingaboutthinking.org" primary>
                  Contact Our Partnership Team
                </Button>
                <Button as="a" href="#register">
                  Join Our Newsletter
                </Button>
              </ButtonGroup>
            </div>
          </Flex>
        </Container>
      </Section>
      
      {/* Newsletter Signup Section */}
      <Section id="register" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <Container>
          <SmallHeading>Stay Updated</SmallHeading>
          <MainHeading>Sign Up For Updates</MainHeading>
          <SubHeading style={{ maxWidth: '700px', margin: '0 auto 2rem auto', textAlign: 'center' }}>
            Join our mailing list to receive the latest news and updates about THAT Summit
          </SubHeading>
          
          <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto',
            padding: '2.5rem',
            borderRadius: '20px',
            background: darkTheme.isDark ? 'rgba(32, 33, 35, 0.5)' : '#F9F9F9',
            border: darkTheme.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #EEEEEE',
            boxShadow: darkTheme.isDark ? '0 20px 50px rgba(0, 0, 0, 0.5)' : '0 20px 50px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Glass overlay effect */}
            {darkTheme.isDark && (
              <>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 20%, transparent 60%)',
                  opacity: '0.5',
                  pointerEvents: 'none',
                  animation: 'liquidMove 15s infinite alternate ease-in-out'
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%)',
                  pointerEvents: 'none'
                }}></div>
              </>
            )}
            
            <form action="https://formspree.io/f/mvgqvezg" method="POST">
              {/* Decorative star elements */}
              {darkTheme.isDark && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '30px',
                    width: '3px',
                    height: '3px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    opacity: '0.6'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '20px',
                    width: '2px',
                    height: '2px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                    opacity: '0.5'
                  }}></div>
                </>
              )}
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem',
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em'
                }}>
                  Your Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '12px',
                    border: darkTheme.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #DDDDDD',
                    background: darkTheme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                    color: darkTheme.isDark ? '#FFFFFF' : '#333333',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: darkTheme.isDark ? 'inset 0 1px 3px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem',
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em'
                }}>
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '12px',
                    border: darkTheme.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #DDDDDD',
                    background: darkTheme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                    color: darkTheme.isDark ? '#FFFFFF' : '#333333',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: darkTheme.isDark ? 'inset 0 1px 3px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem',
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em'
                }}>
                  Your Interest
                </label>
                <select 
                  name="interests" 
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '12px',
                    border: darkTheme.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #DDDDDD',
                    background: darkTheme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                    color: darkTheme.isDark ? '#FFFFFF' : '#333333',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: darkTheme.isDark ? 'inset 0 1px 3px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23' + (darkTheme.isDark ? 'FFFFFF' : '444444') + '%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem top 50%',
                    backgroundSize: '0.65rem auto',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="general">General Interest</option>
                  <option value="academic">Academic Research</option>
                  <option value="industry">Industry Applications</option>
                  <option value="policy">AI Policy</option>
                  <option value="speaking">Speaking Opportunities</option>
                  <option value="sponsorship">Sponsorship Opportunities</option>
                </select>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <Button 
                  as="button" 
                  type="submit" 
                  primary
                  style={{
                    padding: '1rem 2.8rem',
                    fontSize: '1.05rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    letterSpacing: '0.01em',
                    boxShadow: darkTheme.isDark ? '0 10px 20px rgba(0, 0, 0, 0.4)' : '0 10px 20px rgba(0, 0, 0, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                    background: darkTheme.isDark ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))' : '#202123'
                  }}
                >
                  Subscribe for Updates
                </Button>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginTop: '2rem', 
                gap: '1.5rem' 
              }}>
                <a href="https://x.com/thought_channel" target="_blank" rel="noopener noreferrer" style={{
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  ':hover': { opacity: 1 }
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={darkTheme.isDark ? "#FFFFFF" : "#202123"}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/thoughts_channel" target="_blank" rel="noopener noreferrer" style={{
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  ':hover': { opacity: 1 }
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={darkTheme.isDark ? "#FFFFFF" : "#202123"}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/thinking-about-thinking-inc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" style={{
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  ':hover': { opacity: 1 }
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={darkTheme.isDark ? "#FFFFFF" : "#202123"}>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
              
              <p style={{ 
                fontSize: '0.8rem', 
                color: darkTheme.isDark ? 'rgba(255, 255, 255, 0.5)' : '#888888', 
                textAlign: 'center',
                marginTop: '1.5rem',
                marginBottom: '0'
              }}>
                We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </Container>
      </Section>
      
      {/* Footer */}
    </SharedLayout>
  );
}

export default AgendaPage;