import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, ThemeProvider, keyframes } from 'styled-components';

// Custom hook for tracking mouse position and adding stars
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add stars to the background
    const createStars = () => {
      const body = document.body;
      const numStars = 100;
      
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2;
        
        star.style.position = 'fixed';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        star.style.borderRadius = '50%';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.zIndex = '-1';
        star.style.opacity = Math.random() * 0.8;
        star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.className = 'star-element';
        
        body.appendChild(star);
      }
      
      // Add keyframes for twinkling
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `;
      document.head.appendChild(style);
    };
    
    createStars();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Clean up stars
      document.querySelectorAll('.star-element').forEach(star => star.remove());
    };
  }, []);
  
  return mousePosition;
}

// Theme
const theme = {
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    mediumGray: '#AAAAAA',
    darkGray: '#121212',
    accent: '#6610f2',
    primary: '#8A2BE2',
    secondary: '#4B0082',
    gradient: 'linear-gradient(135deg, #4B0082, #8A2BE2)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    glass: 'rgba(30, 30, 40, 0.3)',
    glassLight: 'rgba(255, 255, 255, 0.1)',
    glassHighlight: 'rgba(255, 255, 255, 0.05)',
    starColor: '#ffffff',
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    line-height: 1.5;
    overflow-x: hidden;
    font-size: 16px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    position: relative;
  }
  
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 15% 50%, rgba(74, 16, 138, 0.2) 0%, transparent 25%),
      radial-gradient(circle at 85% 30%, rgba(138, 43, 226, 0.2) 0%, transparent 25%);
    pointer-events: none;
    z-index: -1;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  .background-logo {
    position: absolute;
    z-index: 0;
    opacity: 0.05;
    width: 50%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes scrollVertical {
    0% { transform: translateY(0); }
    100% { transform: translateY(calc(-50% - 40px)); }
  }
`;

// Layout Components
const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (min-width: 768px) {
    padding: 0 40px;
  }
  
  @media (min-width: 1200px) {
    padding: 0 60px;
  }
  
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

const Section = styled.section`
  margin: ${props => props.margin || "60px 0"};
  padding: ${props => props.padding || "40px 0"};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin: ${props => props.mobileMargin || "40px 0"};
    padding: ${props => props.mobilePadding || "30px 0"};
  }
`;

// Navigation
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  background: ${props => props.scrolled ? 'rgba(18, 18, 24, 0.85)' : 'rgba(10, 10, 15, 0.65)'};
  box-shadow: ${props => props.scrolled ? '0 2px 20px rgba(138, 43, 226, 0.15)' : '0 1px 5px rgba(106, 90, 205, 0.1)'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 16px 0;
  }
`;

const Logo = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  
  img {
    height: 32px;
    margin-right: 10px;
  }
  
  span {
    color: ${props => props.theme.colors.black};
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`;

const MenuButton = styled.button`
  display: none;
  
  @media (max-width: 1024px) {
    display: block;
    font-size: 1.25rem;
    z-index: 1002;
    position: relative;
    width: 40px;
    height: 40px;
    background: transparent;
    border-radius: 4px;
    transition: all 0.25s ease;
    border: 1px solid rgba(0,0,0,0.1);
    color: #000;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
    
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 25px; /* Reduced gap for better spacing */
  align-items: center;
  
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 280px;
    height: 100vh;
    background-color: ${props => props.theme.colors.white};
    padding: 90px 30px 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    transition: right 0.3s ease, box-shadow 0.3s ease;
    z-index: 1001;
    box-shadow: ${props => props.isOpen ? '-5px 0 30px rgba(0, 0, 0, 0.1)' : 'none'};
    overflow-y: auto;
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1000;
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

const NavLink = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  padding: 6px 0;
  color: #222;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.black};
    transition: width 0.2s ease;
  }
  
  &:hover {
    color: #000;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 1024px) {
    font-size: 0.9rem;
    padding: 8px 0;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
`;

const RegistrationButton = styled.a`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 16px 34px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: all 0.25s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${props => props.theme.colors.darkGray};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 1024px) {
    display: inline-block;
    margin-top: 20px;
  }
`;

// Hero Section
const HeroSection = styled.section`
  min-height: 650px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #111, #333);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 120px 0 40px; /* Adjusted padding to prevent header overlap and ensure content fits */
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(128, 0, 255, 0.3) 0%, 
                rgba(0, 128, 255, 0.2) 25%, 
                rgba(0, 0, 0, 0) 70%);
    pointer-events: none;
    transition: background 0.1s ease-out;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    min-height: 600px;
    padding: 100px 0 40px;
  }
`;

const ConferenceInfo = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const DayHeading = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

const DaySubheading = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 40px;
  font-weight: 500;
  color: #666;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  color: white;
  text-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
`;

const HeroTagline = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: 20px;
  color: white;
  position: relative;
  text-shadow: 0 0 15px rgba(128, 0, 255, 0.3);
  
  @media (max-width: 1024px) {
    font-size: 3.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 48px;
  max-width: 600px;
  color: rgba(255, 255, 255, 0.85);
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const SecondaryButton = styled.a`
  border: 1px solid ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.black};
  padding: 12px 32px;
  border-radius: 2px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const HeroLogo = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 350px;
  height: 350px;
  opacity: 0.1;
  z-index: 1;
  animation: float 6s ease-in-out infinite;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 1200px) {
    width: 300px;
    height: 300px;
    right: 2%;
  }
  
  @media (max-width: 1024px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Countdown
const CountdownSection = styled.div`
  position: relative;
  margin-top: 30px;
  width: 100%;
  z-index: 5;
  padding-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const CountdownItem = styled.div`
  text-align: center;
`;

const CountdownNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CountdownLabel = styled.div`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
`;

// Day Tabs Section
const DayTabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const DayTab = styled.button`
  padding: 16px 32px;
  font-size: 1.25rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? props.theme.colors.black : props.theme.colors.mediumGray};
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.black : 'transparent'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    color: ${props => props.theme.colors.black};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.colors.black};
    transform: ${props => props.active ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.4s ease;
    opacity: ${props => props.active ? '1' : '0'};
  }
  
  &:hover::after {
    opacity: 0.5;
    transform: translateX(0);
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 1rem;
  }
`;

// Speakers Section
const SpeakersSection = styled(Section)`
  padding: 80px 0 60px 0;
  position: relative;
  z-index: 1;
  overflow: visible;
  
  @media (max-width: 768px) {
    padding: 60px 0 40px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 5px;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0;
    
    &::after {
      bottom: -10px;
      width: 50px;
      height: 2px;
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 25px;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  line-height: 1.6;
  color: #444;
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin-top: 20px;
    margin-bottom: 30px;
    max-width: 95%;
    line-height: 1.5;
  }
`;

const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto 60px auto;
  padding: 0 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 40px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 25px;
    justify-items: center;
  }
  
  @media (max-width: 480px) {
    padding: 0;
  }
`;

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const continuousMarqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const scrollUpAnimation = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
`;


const MarqueeContainer = styled.div`
  background-color: #000;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  padding: 12px 0;
  position: relative;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const LogoMarqueeContainer = styled.div`
  background-color: #f8f8f8;
  color: #000;
  width: 100%;
  padding: 40px 0;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
`;

const LogoMarqueeContent = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${continuousMarqueeAnimation} 20s linear infinite;
  padding-left: 100%;
  animation-delay: ${props => props.delay || '0s'};
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
`;

const LogoMarqueeItem = styled.span`
  display: inline-block;
  margin: 0 40px;
  vertical-align: middle;
`;

const MarqueeContent = styled.div`
  display: inline-block;
  animation: ${continuousMarqueeAnimation} 25s linear infinite;
  padding-left: 100%;
  animation-delay: ${props => props.delay || '0s'};
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
`;

const MarqueeItem = styled.span`
  margin-right: 50px;
  font-weight: 600;
  letter-spacing: 0.05em;
  
  strong {
    color: #fff;
    font-weight: 900;
  }
`;

const SpeakerCard = styled.div`
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(30, 30, 40, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 20px;
  margin-bottom: 40px;
  z-index: ${props => props.index % 2 === 0 ? '2' : '1'};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    z-index: 5;
    box-shadow: 0 22px 40px rgba(138, 43, 226, 0.15), 0 8px 15px rgba(106, 90, 205, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(138, 43, 226, 0.3), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    transition: all 0.5s ease;
  }
  
  &:hover::before {
    transform: scale(1.5);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

const SpeakerBio = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 10;
  color: white;
  
  ${SpeakerCard}:hover & {
    opacity: 1;
    visibility: visible;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 15px;
    max-height: 150px;
    overflow-y: auto;
    scrollbar-width: thin;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
    }
  }
`;

const BioButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    color: black;
  }
`;

const SpeakerPhoto = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
  transform: ${props => props.index % 3 === 0 ? 'rotate(-2deg)' : props.index % 3 === 1 ? 'rotate(0deg)' : 'rotate(2deg)'};
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(80%) brightness(0.9);
    transition: all 0.5s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 60%,
      rgba(10, 10, 15, 0.3) 70%,
      rgba(10, 10, 15, 0.6) 80%,
      rgba(10, 10, 15, 0.8) 90%,
      rgba(10, 10, 15, 0.9) 95%
    );
    z-index: 1;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  
  ${SpeakerCard}:hover & {
    transform: ${props => props.index % 3 === 0 ? 'rotate(0deg)' : props.index % 3 === 1 ? 'rotate(0deg)' : 'rotate(0deg)'};
    box-shadow: 0 20px 40px rgba(138, 43, 226, 0.15);
    border: 1px solid rgba(138, 43, 226, 0.3);
  }
  
  &:hover img {
    filter: grayscale(0%) brightness(1.1);
    transform: scale(1.05);
  }
  
  @media (max-width: 1024px) {
    height: 240px;
  }
  
  @media (max-width: 768px) {
    height: 220px;
  }
  
  @media (max-width: 640px) {
    height: 300px;
  }
`;

const SpeakerName = styled.h4`
  font-size: 1.375rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.white};
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
`;

const SpeakerRole = styled.p`
  font-size: 1rem;
  margin-bottom: 4px;
  color: ${props => props.theme.colors.glassLight};
`;

const SpeakerCompany = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.accent};
  opacity: 0.9;
`;

const SpeakerSocial = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
`;

const SocialIcon = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
  }
`;

const FeaturedSpeakers = styled.div`
  margin-bottom: 60px;
  overflow: visible;
  padding-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
    padding-bottom: 30px;
  }
`;

const SeeAllButton = styled.a`
  display: inline-block;
  margin: 40px auto 0;
  padding: 12px 32px;
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: 2px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
  }
`;

// Features Section
const FeaturesSection = styled(Section)`
  background-color: ${props => props.theme.colors.lightGray};
  padding: 100px 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 32px;
  background-color: ${props => props.dark ? props.theme.colors.black : props.theme.colors.white};
  color: ${props => props.dark ? props.theme.colors.white : props.theme.colors.black};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const FeatureDescription = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
`;

// Venue Section
const VenueSection = styled(Section)`
  padding: 160px 0 100px 0;
  position: relative;
  z-index: 0;
  background: linear-gradient(to bottom, #f9f9f9, #ffffff);
  margin-top: 0;
`;

const VenueGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const VenueInfo = styled.div`
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
  }
`;

const VenueTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 24px;
`;

const VenueAddress = styled.p`
  font-size: 1.125rem;
  margin-bottom: 16px;
`;

const VenueDirections = styled.p`
  font-size: 0.9375rem;
  margin-bottom: 32px;
`;

const VenueMap = styled.div`
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(80%);
  }
  
  &:hover {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px);
  }
`;

// Sponsors Section
const SponsorsSection = styled(Section)`
  background-color: ${props => props.theme.colors.lightGray};
  padding: 120px 0;
  position: relative;
  z-index: 0;
`;

const SponsorsTiers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const SponsorsTier = styled.div``;

const SponsorsTierTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: center;
`;

const SponsorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 4}, 1fr);
  gap: 32px;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(${props => Math.min(props.columns, 3) || 3}, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => Math.min(props.columns, 2) || 2}, 1fr);
  }
`;

const SponsorLogo = styled.div`
  height: ${props => props.height || '80px'};
  display: flex;
  justify-content: center;
  align-items: center;
  filter: ${props => props.grayscale ? 'grayscale(100%)' : 'none'};
  opacity: ${props => props.faded ? 0.7 : 1};
  transition: all 0.3s ease;
  background-color: ${props => props.theme.colors.white};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
    filter: none;
    opacity: 1;
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ContactInfo = styled.p`
  text-align: center;
  margin-top: 40px;
  font-size: 1.125rem;
`;

// Tickets Section
const TicketsSection = styled(Section)`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 120px 0;
  position: relative;
`;

const TicketsTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const TicketsTab = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.black : props.theme.colors.white};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: ${props => props.position === 'left' ? '4px 0 0 4px' : props.position === 'right' ? '0 4px 4px 0' : '0'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const TicketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TicketCard = styled.div`
  background: ${props => props.premium ? 'linear-gradient(135deg, #111111, #000000)' : 'rgba(0, 0, 0, 0.6)'};
  border: 1px solid ${props => props.premium ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  box-shadow: ${props => props.premium ? '0 10px 30px rgba(0, 0, 0, 0.3)' : '0 5px 15px rgba(0, 0, 0, 0.1)'};
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.premium ? '0 15px 40px rgba(0, 0, 0, 0.4)' : '0 10px 25px rgba(0, 0, 0, 0.2)'};
    border-color: ${props => props.premium ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const TicketTypeBadge = styled.span`
  position: absolute;
  top: 0;
  right: 24px;
  background: ${props => props.premium ? 'linear-gradient(135deg, #FFFFFF, #DDDDDD)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.premium ? props.theme.colors.black : props.theme.colors.white};
  padding: 8px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const TicketType = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.white};
`;

const TicketTypePremium = styled(TicketType)`
  color: #FFFFFF;
`;

const TicketPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 16px 0 8px;
  color: ${props => props.theme.colors.white};
`;

const TicketPricePerDay = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
`;

const TicketAvailability = styled.div`
  font-size: 0.85rem;
  color: ${props => props.limited ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'};
  font-weight: ${props => props.limited ? '600' : '400'};
  margin-bottom: 24px;
  font-style: italic;
`;

const TicketDivider = styled.div`
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  margin: 8px 0 24px;
`;

const TicketFeatures = styled.ul`
  list-style: none;
  margin: 0 0 32px;
  padding: 0;
  flex: 1;
`;

const TicketFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  
  &:before {
    content: "✓";
    margin-right: 8px;
    color: #FFFFFF;
    font-weight: bold;
  }
`;

const TicketButton = styled.a`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.white};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 12px 24px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const TicketButtonPremium = styled(TicketButton)`
  background: linear-gradient(135deg, #FFFFFF, #DDDDDD);
  color: ${props => props.theme.colors.black};
  border: none;
  font-weight: 600;
  animation: pulse 2s infinite;
  
  &:hover {
    background: linear-gradient(135deg, #EEEEEE, #CCCCCC);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
    animation: none;
  }
`;

// CTA Section
const CTASection = styled(Section)`
  text-align: center;
  padding: 100px 0;
`;

const CTATitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
`;

const CTAButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Newsletter Section
const NewsletterSection = styled.div`
  background-color: ${props => props.theme.colors.lightGray};
  padding: 80px 0;
`;

const NewsletterForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 16px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.black};
  }
  
  @media (max-width: 768px) {
    border-radius: 4px;
    margin-bottom: 12px;
  }
`;

const NewsletterButton = styled.button`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 16px 32px;
  border-radius: 0 4px 4px 0;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.darkGray};
  }
  
  @media (max-width: 768px) {
    border-radius: 4px;
  }
`;

// Footer
const Footer = styled.footer`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 80px 0 40px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 80px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div``;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  
  img {
    height: 30px;
    margin-right: 10px;
  }
`;

const FooterDescription = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialLink = styled.a`
  font-size: 1.25rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const FooterTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 24px;
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: 12px;
  
  a {
    font-size: 0.9375rem;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  opacity: 0.6;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 24px;
  
  a {
    font-size: 0.875rem;
    opacity: 0.6;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
`;

// Modal Components
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  padding: 40px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease;
  
  @media (max-width: 768px) {
    max-width: 90%;
    padding: 30px 20px;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 30px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
`;

const FormInput = styled.input`
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.black};
  }
`;

const FormSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.black};
  }
`;

const FormButton = styled.button`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 16px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background-color: ${props => props.theme.colors.darkGray};
  }
`;

// Speaker Card Bio Overlay
const SpeakerBioOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 20px;
  border-radius: 50%;
  text-align: center;
  color: white;
  
  ${SpeakerPhoto}:hover & {
    opacity: 1;
  }
`;

const SpeakerBioText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const SpeakerBioButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

// Tab transition styles
const TabsContainer = styled.div`
  position: relative;
  min-height: 2000px;
  overflow: visible;
  
  @media (max-width: 1024px) {
    min-height: 2400px;
  }
  
  @media (max-width: 768px) {
    min-height: 3000px;
    overflow: visible;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
`;

const TabContent = styled.div`
  opacity: ${props => props.active ? 1 : 0};
  visibility: ${props => props.active ? 'visible' : 'hidden'};
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  z-index: ${props => props.active ? '2' : '1'};
  overflow: visible;
  height: auto;
  
  @media (max-width: 768px) {
    position: relative;
    margin-bottom: ${props => props.active ? '20px' : '0'};
    display: ${props => props.active ? 'block' : 'none'};
  }
`;

// Speakers Data
const speakersData = {
  day1: [
    {
      name: "Dr David Silver",
      role: "Principal Research Scientist",
      company: "DeepMind",
      image: "/images/speakers/DrDavidSilver.jpg",
      linkedin: "#",
      twitter: "#",
      bio: "Dr. David Silver leads the reinforcement learning research group at DeepMind and was lead researcher on AlphaGo, AlphaZero and MuZero. His groundbreaking work in deep reinforcement learning has revolutionized the field of AI."
    },
    {
      name: "Dr Raia Hadsell",
      role: "VP of Research",
      company: "DeepMind",
      image: "/images/speakers/DrRaiaHadsell.jpg",
      linkedin: "#",
      twitter: "#",
      bio: "Dr. Raia Hadsell is a senior research director at DeepMind, where she leads research on robotics, embodied AI, and continual learning. Her pioneering work includes solutions to catastrophic forgetting in neural networks."
    },
    {
      name: "Prof. Jakob Foerster",
      role: "Senior Tech Lead",
      company: "Meta & Oxford",
      image: "/images/speakers/Prof_Jakob Foerster.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Jonathan Richard Schwarz",
      role: "Head of AI Research",
      company: "Thomson Reuters",
      image: "/images/speakers/DrJonathanRichardSchwarz.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Lion Schulz",
      role: "Head of Machine Learning",
      company: "Bertelsmann",
      image: "/images/speakers/DrLionSchulz.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Max Beverton-Palmer",
      role: "Head of Public Policy",
      company: "NVIDIA",
      image: "/images/speakers/MaxBeverton_Palmer.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Karl Havard",
      role: "CCO",
      company: "NSCALE",
      image: "/images/speakers/KarlHavard.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Mark Bjornsgaard",
      role: "Founder & CIO",
      company: "DeepGreen",
      image: "/images/speakers/MarkBjornsgaard.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Joshua Tan",
      role: "Head of Policy",
      company: "Public AI",
      image: "/images/speakers/DrJoshuaTan.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr James Whittington",
      role: "Vice-President & Research Scientist",
      company: "Thinking About Thinking",
      company2: "Stanford & Oxford",
      image: "/images/speakers/DrJamesWhittington.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Ruairidh McLennan Battleday",
      role: "President & Research Scientist",
      company: "Thinking About Thinking",
      company2: "Harvard & MIT",
      image: "/images/speakers/DrRuairidhMcLennanBattleday.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Felix Sosa",
      role: "Research Scientist",
      company: "Harvard & MIT",
      image: "/images/speakers/DrFelixSosa.jpg",
      linkedin: "#",
      twitter: "#"
    }
  ],
  day2: [
    {
      name: "Prof. Chris Summerfield",
      role: "Research Director & Professor",
      company: "AISI & Oxford",
      image: "/images/speakers/ProfChrisSummerfield.webp",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Samuel Bell",
      role: "AI Research Scientist",
      company: "Meta",
      image: "/images/speakers/DrSamuelBell.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Prof. Skyler Wang",
      role: "Assistant Professor & Research Scientist",
      company: "McGill & Meta",
      image: "/images/speakers/ProfSkylerWang.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Marius Hobbhahn",
      role: "Director & Co-Founder",
      company: "Apollo Research",
      image: "/images/speakers/DrMariusHobbhahn.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Sully",
      role: "CEO & Co-Founder",
      company: "ADVAI",
      image: "/images/speakers/DavidSully.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Ashley Ramrachia",
      role: "Founder and CEO",
      company: "Academy",
      image: "/images/speakers/AshleyRamrachia.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Jakob Mökander",
      role: "Director",
      company: "Tony Blair Institute",
      image: "/images/speakers/DrJakobMökander.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Julian Von Nehammer",
      role: "Director",
      company: "Lilt",
      image: "/images/speakers/JulianVonNehammer.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Esra Demir",
      role: "Group Digital Partner Director",
      company: "HSBC",
      image: "/images/speakers/EsraDemir.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Kevin Loi-Heng",
      role: "Co-Founder & CEO",
      company: "Avalon Insights",
      image: "/images/speakers/DrKevinLoiHeng.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Nicolay Hagen",
      role: "Lecturer",
      company: "NTNU",
      image: "/images/speakers/NicolayHagen.jpg",
      linkedin: "#",
      twitter: "#"
    }
  ],
  day3: [
    {
      name: "Dr Irina Jurenka",
      role: "Research Lead",
      company: "DeepMind",
      image: "/images/speakers/DrIrinaJurenka.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Pete Hill",
      role: "Co-Founder",
      company: "Cudo",
      image: "/images/speakers/PeteHIll.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Trias Gkikopoulos",
      role: "Innovation Lead - Robotics & AI",
      company: "Innovate UK",
      image: "/images/speakers/DrTriasGkikopoulos.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Erwann Le Lannou",
      role: "Ventures",
      company: "XTX Markets",
      image: "/images/speakers/ErwannLeLannou.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Timo Hannay",
      role: "Entrepreneur",
      company: "Project X",
      image: "/images/speakers/TimoHannay.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Lucinda Scharff",
      role: "Staff Clinical Specialist",
      company: "Google Health",
      image: "/images/speakers/DrLucindaScharff.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Li-Lian Ang",
      role: "Product Manager",
      company: "BlueDot Impact",
      image: "/images/speakers/LiLianAng.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Rehana Al-Soltane",
      role: "Learning Manager",
      company: "Raspberry Pi Foundation",
      image: "/images/speakers/RehanaAlSoltane.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Prof. Dan Nicolau Jr",
      role: "Professor",
      company: "KCL",
      image: "/images/speakers/ProfDanNicolauJr.jpg",
      linkedin: "#",
      twitter: "#"
    }
  ]
};

// Main App Component
function App() {
  const [ticketsPage, setTicketsPage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDay, setActiveDay] = useState('day1');
  const [showSingleDay, setShowSingleDay] = useState(true);
  const heroRef = useRef(null);
  
  // Use mouse position for gradient effects
  const { x, y } = useMousePosition();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState('general');
  const [selectedDay, setSelectedDay] = useState('day1');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
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
  
  useEffect(() => {
    const conferenceDate = new Date('October 28, 2025 00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = conferenceDate - now;
      
      if (distance < 0) {
        // Conference has started
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };
    
    // Initial update
    updateCountdown();
    
    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const toggleTicketView = (isSingleDay) => {
    setShowSingleDay(isSingleDay);
  };
  
  const openRegisterModal = (ticketType = 'general', day = 'day1') => {
    setSelectedTicketType(ticketType);
    setSelectedDay(day);
    setRegisterModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };
  
  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle form submission to a backend
    alert('Registration successful! A confirmation email will be sent shortly.');
    closeRegisterModal();
  };
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      {/* Registration Modal */}
      <ModalOverlay isOpen={registerModalOpen} onClick={closeRegisterModal}>
        <ModalContent isOpen={registerModalOpen} onClick={e => e.stopPropagation()}>
          <ModalCloseButton onClick={closeRegisterModal}>✕</ModalCloseButton>
          <ModalTitle>Register for THAT Summit</ModalTitle>
          <Form onSubmit={handleRegisterSubmit}>
            <FormGroup>
              <FormLabel htmlFor="ticket-type">Ticket Type</FormLabel>
              <FormSelect 
                id="ticket-type" 
                value={selectedTicketType}
                onChange={e => setSelectedTicketType(e.target.value)}
              >
                <option value="student">Student Pass</option>
                <option value="academic">Academic Pass</option>
                <option value="general">General Pass</option>
                <option value="vip">VIP All-Access</option>
              </FormSelect>
            </FormGroup>
            
            {showSingleDay && (
              <FormGroup>
                <FormLabel htmlFor="day-select">Day</FormLabel>
                <FormSelect 
                  id="day-select" 
                  value={selectedDay}
                  onChange={e => setSelectedDay(e.target.value)}
                >
                  <option value="day1">Day 1: Algorithmic Innovation</option>
                  <option value="day2">Day 2: AI Safety & Enterprise</option>
                  <option value="day3">Day 3: AI Entrepreneurship</option>
                </FormSelect>
              </FormGroup>
            )}
            
            <FormGroup>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <FormInput id="name" type="text" placeholder="Enter your full name" required />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput id="email" type="email" placeholder="Enter your email address" required />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="organization">Organization</FormLabel>
              <FormInput id="organization" type="text" placeholder="Enter your organization" />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="role">Role</FormLabel>
              <FormInput id="role" type="text" placeholder="Enter your role" />
            </FormGroup>
            
            <FormButton type="submit">
              Complete Registration
            </FormButton>
          </Form>
        </ModalContent>
      </ModalOverlay>
      
      <Header scrolled={scrolled}>
        <Container>
          <Nav>
            <Logo>
              <img src="/images/thatpng.jpg" alt="Thinking About Thinking Logo" />
              <span>THINKING ABOUT THINKING</span>
            </Logo>
            
            <MenuButton onClick={toggleMenu}>
              {menuOpen ? '✕' : '☰'}
            </MenuButton>
            
            <Overlay isOpen={menuOpen} onClick={toggleMenu} />
            
            <NavItems isOpen={menuOpen}>
              <NavLink href="#about" onClick={() => setMenuOpen(false)}>About</NavLink>
              <NavLink href="#speakers" onClick={() => setMenuOpen(false)}>Speakers</NavLink>
              <NavLink href="#schedule" onClick={() => setMenuOpen(false)}>Schedule</NavLink>
              <NavLink href="#" onClick={(e) => {
                e.preventDefault();
                setTicketsPage(true);
                setMenuOpen(false);
              }}>Tickets</NavLink>
              <NavLink href="#venue" onClick={() => setMenuOpen(false)}>Venue</NavLink>
              <NavLink href="#sponsors" onClick={() => setMenuOpen(false)}>Partners & Sponsors</NavLink>
              <RegistrationButton 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setTicketsPage(true);
                }}
              >
                Register Now
              </RegistrationButton>
            </NavItems>
          </Nav>
        </Container>
      </Header>
      
      <main>
        {ticketsPage ? (
          <Section style={{ backgroundColor: "#000", color: "#fff", paddingTop: "100px" }}>
            <Container>
              <SectionTitle style={{ color: 'white' }}>Get Your Tickets</SectionTitle>
              <SectionSubtitle style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Join us for an unforgettable event featuring world-class speakers and networking opportunities
              </SectionSubtitle>
              
              <TicketsTabs>
                <TicketsTab 
                  active={showSingleDay} 
                  onClick={() => toggleTicketView(true)}
                  position="left"
                >
                  Single Day
                </TicketsTab>
                <TicketsTab 
                  active={!showSingleDay} 
                  onClick={() => toggleTicketView(false)}
                  position="right"
                >
                  Full Event
                </TicketsTab>
              </TicketsTabs>
              
              <DayTabsContainer>
                <DayTab 
                  active={selectedTicketType === 'general'} 
                  onClick={() => setSelectedTicketType('general')}
                >
                  General Admission
                </DayTab>
                <DayTab 
                  active={selectedTicketType === 'premium'} 
                  onClick={() => setSelectedTicketType('premium')}
                >
                  Premium Access
                </DayTab>
                <DayTab 
                  active={selectedTicketType === 'vip'} 
                  onClick={() => setSelectedTicketType('vip')}
                >
                  VIP Experience
                </DayTab>
              </DayTabsContainer>
              
              <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
                  {['day1', 'day2', 'day3'].map((day) => (
                    <div key={day} style={{ 
                      background: "white", 
                      borderRadius: "12px", 
                      overflow: "hidden",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                      transform: day === 'day1' ? 'rotate(-2deg)' : day === 'day2' ? 'rotate(0deg)' : 'rotate(2deg)',
                      zIndex: day === 'day2' ? '3' : '2',
                      padding: "30px"
                    }}>
                      <h3 style={{ fontSize: "24px", marginBottom: "10px", color: "#000" }}>
                        {day === 'day1' ? 'Day 1: Algorithmic Innovation' : 
                         day === 'day2' ? 'Day 2: AI Safety & Enterprise' : 
                         'Day 3: AI Entrepreneurship'}
                      </h3>
                      <p style={{ fontWeight: "600", fontSize: "32px", margin: "20px 0", color: "#000" }}>
                        {selectedTicketType === 'general' ? '£199' : 
                         selectedTicketType === 'premium' ? '£399' : 
                         '£799'}
                      </p>
                      <div style={{ textAlign: "left", margin: "20px 0", color: "#000" }}>
                        <p style={{ margin: "10px 0" }}>✓ All talks and panels</p>
                        <p style={{ margin: "10px 0" }}>✓ Digital content access</p>
                        {selectedTicketType !== 'general' && <p style={{ margin: "10px 0" }}>✓ Priority seating</p>}
                        {selectedTicketType !== 'general' && <p style={{ margin: "10px 0" }}>✓ Workshop access</p>}
                        {selectedTicketType === 'vip' && <p style={{ margin: "10px 0" }}>✓ Private networking dinner</p>}
                        {selectedTicketType === 'vip' && <p style={{ margin: "10px 0" }}>✓ 1:1 speaker sessions</p>}
                      </div>
                      <button style={{ 
                        background: "black", 
                        color: "white", 
                        border: "none", 
                        padding: "15px 30px", 
                        borderRadius: "30px",
                        width: "100%",
                        fontWeight: "600",
                        marginTop: "20px",
                        cursor: "pointer"
                      }}>
                        Select Ticket
                      </button>
                    </div>
                  ))}
                </div>
                
                <div style={{ 
                  background: "linear-gradient(to right, #333, #000)", 
                  color: "white", 
                  borderRadius: "12px", 
                  padding: "40px", 
                  margin: "50px 0", 
                  textAlign: "center"
                }}>
                  <h3 style={{ fontSize: "28px", marginBottom: "20px" }}>Full Event Access</h3>
                  <p style={{ fontSize: "18px", marginBottom: "30px" }}>Get access to all three days and save up to 20%</p>
                  <p style={{ fontWeight: "700", fontSize: "42px", marginBottom: "30px" }}>
                    {selectedTicketType === 'general' ? '£199' : 
                     selectedTicketType === 'premium' ? '£399' : 
                     '£799'}
                  </p>
                  <button style={{ 
                    background: "white", 
                    color: "black", 
                    border: "none", 
                    padding: "15px 40px", 
                    borderRadius: "30px",
                    fontWeight: "600",
                    fontSize: "18px",
                    cursor: "pointer"
                  }}>
                    Purchase Full Access
                  </button>
                </div>
              </div>
            </Container>
          </Section>
        ) : (
          <>
            <HeroSection
              ref={heroRef}
              onMouseMove={(e) => {
                if (heroRef.current) {
                  const rect = heroRef.current.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  heroRef.current.style.setProperty('--mouse-x', `${x}%`);
                  heroRef.current.style.setProperty('--mouse-y', `${y}%`);
                }
              }}
            >
              <Container>
                <HeroContent>
                  <p style={{ marginBottom: "15px", fontWeight: "600", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: "0.9" }}>Algorithmic Innovation and Entrepreneurship</p>
                  <HeroTitle style={{ fontSize: "4rem", lineHeight: "1.15", marginBottom: "25px" }}>Global Summit on<br />Open Problems for AI</HeroTitle>
                  <HeroSubtitle style={{ marginTop: "10px", fontSize: "1.35rem", maxWidth: "650px" }}>
                    How can Britain leverage AI research breakthroughs safely to drive productivity and growth?
                  </HeroSubtitle>
                  <p style={{ marginTop: "20px", fontWeight: "500", fontSize: "1.1rem", letterSpacing: "0.01em", color: "rgba(255, 255, 255, 0.7)" }}>October 28-30, 2025 · London, UK</p>
                  <HeroActions>
                    <RegistrationButton 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setTicketsPage(true);
                      }}
                    >
                      Register Now
                    </RegistrationButton>
                    <SecondaryButton href="#speakers">View Speakers</SecondaryButton>
                  </HeroActions>
                </HeroContent>
                <HeroLogo>
                  <img src="/images/Asset1.png" alt="THAT Logo" />
                </HeroLogo>
              </Container>
              
              <CountdownSection>
                <Container>
                  <CountdownContainer>
                    <CountdownItem>
                      <CountdownNumber>{countdown.days}</CountdownNumber>
                      <CountdownLabel>Days</CountdownLabel>
                    </CountdownItem>
                    <CountdownItem>
                      <CountdownNumber>{countdown.hours}</CountdownNumber>
                      <CountdownLabel>Hours</CountdownLabel>
                    </CountdownItem>
                    <CountdownItem>
                      <CountdownNumber>{countdown.minutes}</CountdownNumber>
                      <CountdownLabel>Minutes</CountdownLabel>
                    </CountdownItem>
                    <CountdownItem>
                      <CountdownNumber>{countdown.seconds}</CountdownNumber>
                      <CountdownLabel>Seconds</CountdownLabel>
                    </CountdownItem>
                  </CountdownContainer>
                </Container>
              </CountdownSection>
            </HeroSection>
            
            <MarqueeContainer>
              <MarqueeContent>
                <MarqueeItem>London, UK • <strong>October 28-30, 2025</strong></MarqueeItem>
                <MarqueeItem>World-class speakers from <strong>DeepMind, Meta, Harvard, Oxford</strong></MarqueeItem>
                <MarqueeItem>Global Summit on <strong>Open Problems for AI</strong></MarqueeItem>
                <MarqueeItem>Tickets available <strong>August 1st</strong></MarqueeItem>
                <MarqueeItem>Early bird pricing <strong>£399</strong></MarqueeItem>
                <MarqueeItem>VIP tickets include <strong>private networking dinner</strong></MarqueeItem>
              </MarqueeContent>
              <MarqueeContent delay="-15s">
                <MarqueeItem>London, UK • <strong>October 28-30, 2025</strong></MarqueeItem>
                <MarqueeItem>World-class speakers from <strong>DeepMind, Meta, Harvard, Oxford</strong></MarqueeItem>
                <MarqueeItem>Global Summit on <strong>Open Problems for AI</strong></MarqueeItem>
                <MarqueeItem>Tickets available <strong>August 1st</strong></MarqueeItem>
                <MarqueeItem>Early bird pricing <strong>£399</strong></MarqueeItem>
                <MarqueeItem>VIP tickets include <strong>private networking dinner</strong></MarqueeItem>
              </MarqueeContent>
            </MarqueeContainer>
            
            <SpeakersSection id="speakers">
              <Container style={{ textAlign: "center" }}>
                <SectionTitle>World-Class Speakers</SectionTitle>
                <SectionSubtitle>
                  Leading experts in AI research, policy, and entrepreneurship from the UK's top institutions
                </SectionSubtitle>
                
                <DayTabsContainer>
                  <DayTab 
                    active={activeDay === 'day1'} 
                    onClick={() => setActiveDay('day1')}
                  >
                    Day 1: Algorithmic Innovation
                  </DayTab>
                  <DayTab 
                    active={activeDay === 'day2'} 
                    onClick={() => setActiveDay('day2')}
                  >
                    Day 2: AI Safety & Enterprise
                  </DayTab>
                  <DayTab 
                    active={activeDay === 'day3'} 
                    onClick={() => setActiveDay('day3')}
                  >
                    Day 3: AI Entrepreneurship
                  </DayTab>
                </DayTabsContainer>
                
                <ConferenceInfo>
                  <DayHeading>
                    {activeDay === 'day1' ? 'Day 1: Oct 28th' : 
                     activeDay === 'day2' ? 'Day 2: Oct 29th' : 
                     'Day 3: Oct 30th'}
                  </DayHeading>
                  <DaySubheading>
                    {activeDay === 'day1' ? 'New Algorithmic Breakthroughs and AI Infrastructure' : 
                     activeDay === 'day2' ? 'AI Safety, and AI in Enterprise & Society' : 
                     'AI Entrepreneurship & Application'}
                  </DaySubheading>
                </ConferenceInfo>
                
                <TabsContainer>
                  {['day1', 'day2', 'day3'].map((day) => (
                    <TabContent key={day} active={activeDay === day} absolute>
                      <FeaturedSpeakers>
                        <SpeakersGrid>
                          {speakersData[day].map((speaker, index) => (
                            <SpeakerCard key={index} index={index}>
                              <SpeakerPhoto index={index}>
                                <img src={speaker.image} alt={speaker.name} />
                                <SpeakerBioOverlay>
                                  <SpeakerBioText>
                                    {speaker.bio || `${speaker.name} is a leading expert in AI research at ${speaker.company}.`}
                                  </SpeakerBioText>
                                  <SpeakerBioButton>Full Profile</SpeakerBioButton>
                                </SpeakerBioOverlay>
                              </SpeakerPhoto>
                              <SpeakerName>{speaker.name}</SpeakerName>
                              <SpeakerRole>{speaker.role}</SpeakerRole>
                              <SpeakerCompany>{speaker.company}</SpeakerCompany>
                              {speaker.company2 && <SpeakerCompany>{speaker.company2}</SpeakerCompany>}
                              <SpeakerSocial>
                                <SocialIcon href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                                  in
                                </SocialIcon>
                                <SocialIcon href={speaker.twitter} target="_blank" rel="noopener noreferrer">
                                  𝕏
                                </SocialIcon>
                              </SpeakerSocial>
                            </SpeakerCard>
                          ))}
                        </SpeakersGrid>
                      </FeaturedSpeakers>
                    </TabContent>
                  ))}
                </TabsContainer>
                
                {/* Extra spacer for mobile */}
                <div style={{ height: '60px', display: 'block', width: '100%' }}></div>
              </Container>
            </SpeakersSection>
            
            {/* Clear separator between sections */}
            <div style={{ height: '120px', background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)', display: 'block', clear: 'both' }}></div>
            
            <SponsorsSection id="sponsors" padding="80px 0 60px" margin="60px 0 40px">
              <Container>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <SectionTitle>Our Partners & Sponsors</SectionTitle>
                  <SectionSubtitle>
                    Supporting organizations that make this event possible
                  </SectionSubtitle>
                </div>
              
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: '600', 
                  marginBottom: '30px', 
                  textAlign: 'center',
                  position: 'relative',
                  paddingBottom: '15px'
                }}>
                  Gold Sponsors
                  <span style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    width: '60px', 
                    height: '3px', 
                    backgroundColor: '#000', 
                    borderRadius: '10px' 
                  }}></span>
                </h3>
                
                <div style={{ marginBottom: '60px' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '30px', 
                    justifyItems: 'center',
                    alignItems: 'center'
                  }}>
                    <div style={{ 
                      height: '120px', 
                      backgroundColor: 'white', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <img src="/images/sponsors/gold_sponsors/XTX_Markets.png" alt="XTX Markets" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)' }} />
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '60px' }}>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '600', 
                    marginBottom: '30px', 
                    textAlign: 'center',
                    position: 'relative',
                    paddingBottom: '15px'
                  }}>
                    Silver Sponsors
                    <span style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      width: '60px', 
                      height: '3px', 
                      backgroundColor: '#000', 
                      borderRadius: '10px' 
                    }}></span>
                  </h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '30px', 
                    justifyItems: 'center',
                    alignItems: 'center'
                  }}>
                    <div style={{ 
                      height: '120px', 
                      backgroundColor: 'white', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <img src="/images/sponsors/silver_sponsors/HSBC-Logo.png" alt="HSBC" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)' }} />
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '60px' }}>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '600', 
                    marginBottom: '30px', 
                    textAlign: 'center',
                    position: 'relative',
                    paddingBottom: '15px'
                  }}>
                    Partners
                    <span style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      width: '60px', 
                      height: '3px', 
                      backgroundColor: '#000', 
                      borderRadius: '10px' 
                    }}></span>
                  </h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '30px', 
                    justifyItems: 'center',
                    alignItems: 'center'
                  }}>
                    <div style={{ 
                      height: '120px', 
                      backgroundColor: 'white', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <img src="/images/sponsors/partners/download.png" alt="Innovate UK" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)' }} />
                    </div>
                    <div style={{ 
                      height: '120px', 
                      backgroundColor: 'white', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <img src="/images/sponsors/partners/tony_blair.webp" alt="Tony Blair Institute" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)' }} />
                    </div>
                    <div style={{ 
                      height: '120px', 
                      backgroundColor: 'white', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <img src="/images/sponsors/partners/download.png" alt="Innovate UK" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)' }} />
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '60px', 
                  backgroundColor: 'white', 
                  padding: '40px 20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>Want to become a sponsor?</h3>
                  <a href="mailto:webmaster@thinkingaboutthinking.org" style={{
                    display: 'inline-block',
                    padding: '15px 30px',
                    background: '#000',
                    color: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }}>Contact us</a>
                </div>
              </Container>
            </SponsorsSection>

            
            <Section style={{ padding: '70px 0 40px', background: 'white', margin: '20px 0' }}>
              <Container>
                <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                  <SectionTitle>AI Industry Leaders</SectionTitle>
                  <SectionSubtitle>
                    Connect with innovators and experts at the forefront of AI development
                  </SectionSubtitle>
                </div>
              </Container>
            </Section>
            
            <LogoMarqueeContainer style={{ background: 'linear-gradient(135deg, #f8f8f8, #ffffff)', padding: '50px 0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <LogoMarqueeContent>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/partners/download.png" 
                      alt="Innovate UK" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/partners/download.png" 
                      alt="Innovate UK" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/partners/tony_blair.webp" 
                      alt="Tony Blair Institute" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/gold_sponsors/XTX_Markets.png" 
                      alt="XTX Markets" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/silver_sponsors/HSBC-Logo.png" 
                      alt="HSBC" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
              </LogoMarqueeContent>
              <LogoMarqueeContent delay="-5s">
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/partners/download.png" 
                      alt="Innovate UK" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/partners/download.png" 
                      alt="Innovate UK" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/partners/tony_blair.webp" 
                      alt="Tony Blair Institute" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/gold_sponsors/XTX_Markets.png" 
                      alt="XTX Markets" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
                <LogoMarqueeItem>
                  <div style={{ 
                    height: '50px', 
                    width: '160px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/images/sponsors/silver_sponsors/HSBC-Logo.png" 
                      alt="HSBC" 
                      style={{ 
                        height: '100%', 
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)'
                      }} 
                    />
                  </div>
                </LogoMarqueeItem>
              </LogoMarqueeContent>
            </LogoMarqueeContainer>
            
            <Section style={{ padding: '100px 0 80px', background: 'linear-gradient(135deg, #f5f5f5, #ffffff)' }}>
              <Container>
                <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                  <h3 style={{ 
                    fontSize: '2.2rem', 
                    fontWeight: '600', 
                    marginBottom: '30px',
                    position: 'relative',
                    display: 'inline-block',
                    paddingBottom: '15px'
                  }}>
                    Join hundreds of like-minded researchers, policy makers, and entrepreneurs
                    <span style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      width: '80px', 
                      height: '3px', 
                      backgroundColor: '#000', 
                      borderRadius: '10px' 
                    }}></span>
                  </h3>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                    gap: '30px', 
                    margin: '40px 0'
                  }}>
                    <div style={{ 
                      padding: '35px 25px', 
                      background: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 12px 28px rgba(0,0,0,0.07), 0 4px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      transform: 'translateY(0)',
                      cursor: 'pointer',
                      border: '1px solid #f0f0f0'
                    }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '5px', 
                        background: 'linear-gradient(135deg, #f8f8f8, #e8e8e8)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '25px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #eaeaea'
                      }}>♪</div>
                      <h4 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.03em' }}>KEYNOTE TALKS</h4>
                      <p style={{ lineHeight: '1.6', color: '#555' }}>Learn from world-leading experts in AI research and applications</p>
                    </div>
                    <div style={{ 
                      padding: '35px 25px', 
                      background: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 12px 28px rgba(0,0,0,0.07), 0 4px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      transform: 'translateY(0)',
                      cursor: 'pointer',
                      border: '1px solid #f0f0f0'
                    }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '5px', 
                        background: 'linear-gradient(135deg, #f8f8f8, #e8e8e8)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '25px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #eaeaea'
                      }}>◎</div>
                      <h4 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.03em' }}>PANELS</h4>
                      <p style={{ lineHeight: '1.6', color: '#555' }}>Engage with diverse perspectives from industry leaders and academics</p>
                    </div>
                    <div style={{ 
                      padding: '35px 25px', 
                      background: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 12px 28px rgba(0,0,0,0.07), 0 4px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      transform: 'translateY(0)',
                      cursor: 'pointer',
                      border: '1px solid #f0f0f0'
                    }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '5px', 
                        background: 'linear-gradient(135deg, #f8f8f8, #e8e8e8)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '25px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #eaeaea'
                      }}>⊕</div>
                      <h4 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.03em' }}>BREAKOUT SESSIONS</h4>
                      <p style={{ lineHeight: '1.6', color: '#555' }}>Collaborate on specific topics in smaller, focused discussion groups</p>
                    </div>
                    <div style={{ 
                      padding: '35px 25px', 
                      background: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 12px 28px rgba(0,0,0,0.07), 0 4px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      transform: 'translateY(0)',
                      cursor: 'pointer',
                      border: '1px solid #f0f0f0'
                    }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '5px', 
                        background: 'linear-gradient(135deg, #f8f8f8, #e8e8e8)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '25px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #eaeaea'
                      }}>↗</div>
                      <h4 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.03em' }}>EXPO HALL</h4>
                      <p style={{ lineHeight: '1.6', color: '#555' }}>Discover cutting-edge innovations and network with industry pioneers</p>
                    </div>
                  </div>
                </div>
              </Container>
            </Section>
            
            
            
            
            <div style={{ height: '40px', background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)' }}></div>
<Section style={{ padding: '60px 0', background: '#ffffff', margin: '20px 0' }} id="breakout-rooms">
              <Container>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <SectionTitle>BREAKOUT ROOMS</SectionTitle>
                  <SectionSubtitle>
                    Collaborate with experts in specialized discussion groups
                  </SectionSubtitle>
                </div>
                
                <LogoMarqueeContainer style={{ background: 'linear-gradient(135deg, #f8f8f8, #ffffff)', padding: '30px 0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                  <LogoMarqueeContent>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/download copy 2.png" 
                          alt="Breakout Room 1" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.37.png" 
                          alt="Breakout Room 2" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.48.png" 
                          alt="Breakout Room 3" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.59.png" 
                          alt="Breakout Room 4" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.24.png" 
                          alt="Breakout Room 5" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                  </LogoMarqueeContent>
                  <LogoMarqueeContent delay="-5s">
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/download copy 2.png" 
                          alt="Breakout Room 1" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.37.png" 
                          alt="Breakout Room 2" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.48.png" 
                          alt="Breakout Room 3" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.59.png" 
                          alt="Breakout Room 4" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                    <LogoMarqueeItem>
                      <div style={{ 
                        height: '50px', 
                        width: '160px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <img 
                          src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.24.png" 
                          alt="Breakout Room 5" 
                          style={{ 
                            height: '100%', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'grayscale(100%)'
                          }} 
                        />
                      </div>
                    </LogoMarqueeItem>
                  </LogoMarqueeContent>
                </LogoMarqueeContainer>
              </Container>
            </Section>
          </>
        )}
      </main>
      
      <div style={{ height: '40px', background: 'linear-gradient(to bottom, #f8f8f8, #ffffff)' }}></div>
<Section style={{ padding: '60px 0', background: 'white', margin: '20px 0' }} id="sponsors-logo-wall">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <SectionTitle>Our Partners & Sponsors</SectionTitle>
            <SectionSubtitle>
              Supported by leading organizations committed to advancing AI research and applications
            </SectionSubtitle>
          </div>
          
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              top: '-15px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              backgroundColor: 'rgba(255,255,255,0.95)', 
              padding: '8px 16px', 
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
              zIndex: 2,
              fontSize: '0.8rem',
              fontWeight: '600',
              color: '#444',
              letterSpacing: '0.03em'
            }}>
              All logos displayed in grayscale
            </div>
            <img src="/images/logo_wall.png" alt="ThAT Conference Partners and Sponsors" style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px', 
              boxShadow: '0 12px 30px rgba(0,0,0,0.08)', 
              filter: 'grayscale(100%)',
              border: '1px solid #eaeaea'
            }} />
          </div>
        </Container>
      </Section>
      
      <Section style={{ padding: '100px 0', background: 'linear-gradient(135deg, #000000, #333333)', marginTop: '0', color: '#fff' }} id="tickets">
        <Container>
          {(() => {
            const [showSingleDay, setShowSingleDay] = useState(true);
            
            return (
              <>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                  <SectionTitle style={{ color: '#fff' }}>Tickets</SectionTitle>
                  <SectionSubtitle style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Select the ticket type that best suits your needs. Early bird pricing available until September 1st.
                  </SectionSubtitle>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginBottom: '40px',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <button 
                    onClick={() => setShowSingleDay(true)}
                    style={{ 
                      padding: '12px 24px',
                      fontSize: '1rem',
                      backgroundColor: showSingleDay ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                      color: showSingleDay ? '#000' : '#fff',
                      border: showSingleDay ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '4px 0 0 4px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}>
                    Single Day
                  </button>
                  <button 
                    onClick={() => setShowSingleDay(false)}
                    style={{ 
                      padding: '12px 24px',
                      fontSize: '1rem',
                      backgroundColor: !showSingleDay ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                      color: !showSingleDay ? '#000' : '#fff',
                      border: !showSingleDay ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '0 4px 4px 0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}>
                    3-Day Pass
                  </button>
                </div>
                
                {showSingleDay ? (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '25px', 
                    maxWidth: '1200px', 
                    margin: '0 auto' 
                  }}>
            {/* Student Ticket */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              zIndex: '1'
            }}>
              <div style={{ 
                position: 'absolute',
                top: '0',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: '600',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Student
              </div>
              
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '8px',
                marginTop: '20px'
              }}>
                Student Pass
              </h3>
              
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                margin: '16px 0 8px'
              }}>
                £60
              </div>
              
              <div style={{ 
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px'
              }}>
                Per day
              </div>
              
              <div style={{ 
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                Valid student ID required
              </div>
              
              <div style={{ 
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                margin: '8px 0 24px'
              }}></div>
              
              <ul style={{ 
                listStyle: 'none',
                margin: '0 0 32px',
                padding: '0',
                flex: '1'
              }}>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Access to all talks on chosen day
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Lunch and refreshments
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Expo access
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Digital access to slides
                </li>
              </ul>
              
              <a href="#" style={{ 
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                padding: '12px 24px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: '500',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}>
                Register Now
              </a>
            </div>
            
            {/* Academic Ticket */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              zIndex: '1'
            }}>
              <div style={{ 
                position: 'absolute',
                top: '0',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: '600',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Academic
              </div>
              
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '8px',
                marginTop: '20px'
              }}>
                Academic Pass
              </h3>
              
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                margin: '16px 0 8px'
              }}>
                £139
              </div>
              
              <div style={{ 
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px'
              }}>
                Per day
              </div>
              
              <div style={{ 
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                Institutional affiliation required
              </div>
              
              <div style={{ 
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                margin: '8px 0 24px'
              }}></div>
              
              <ul style={{ 
                listStyle: 'none',
                margin: '0 0 32px',
                padding: '0',
                flex: '1'
              }}>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Access to all talks on chosen day
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Lunch and refreshments
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Expo access
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Digital access to slides
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Speaker networking event
                </li>
              </ul>
              
              <a href="#" style={{ 
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                padding: '12px 24px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: '500',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}>
                Register Now
              </a>
            </div>
            
            {/* General Ticket */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              zIndex: '1'
            }}>
              <div style={{ 
                position: 'absolute',
                top: '0',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: '600',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                General
              </div>
              
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '8px',
                marginTop: '20px'
              }}>
                General Pass
              </h3>
              
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                margin: '16px 0 8px'
              }}>
                £199
              </div>
              
              <div style={{ 
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px'
              }}>
                Per day
              </div>
              
              <div style={{ 
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                Limited availability
              </div>
              
              <div style={{ 
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                margin: '8px 0 24px'
              }}></div>
              
              <ul style={{ 
                listStyle: 'none',
                margin: '0 0 32px',
                padding: '0',
                flex: '1'
              }}>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Access to all talks on chosen day
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Lunch and refreshments
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Expo access
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Digital access to slides
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Speaker networking event
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Priority seating
                </li>
              </ul>
              
              <a href="#" style={{ 
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                padding: '12px 24px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: '500',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}>
                Register Now
              </a>
            </div>
            
            {/* VIP Ticket */}
            <div style={{ 
              background: 'linear-gradient(135deg, #111111, #000000)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              zIndex: '1'
            }}>
              <div style={{ 
                position: 'absolute',
                top: '0',
                right: '24px',
                background: 'linear-gradient(135deg, #FFFFFF, #DDDDDD)',
                color: '#000',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: '600',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                VIP
              </div>
              
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '8px',
                marginTop: '20px'
              }}>
                VIP All-Access
              </h3>
              
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                margin: '16px 0 8px'
              }}>
                £799
              </div>
              
              <div style={{ 
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px'
              }}>
                Per day
              </div>
              
              <div style={{ 
                fontSize: '0.85rem',
                color: '#FFFFFF',
                fontWeight: '600',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                Very limited availability
              </div>
              
              <div style={{ 
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                margin: '8px 0 24px'
              }}></div>
              
              <ul style={{ 
                listStyle: 'none',
                margin: '0 0 32px',
                padding: '0',
                flex: '1'
              }}>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Access to all talks on chosen day
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Premium lunch and refreshments
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Expo access with VIP lounge
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Digital access to all content
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Private speaker dinner
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> Premium seating
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ marginRight: '8px' }}>✓</span> 1:1 meetings with speakers
                </li>
              </ul>
              
              <a href="#" style={{ 
                display: 'inline-block',
                background: 'linear-gradient(135deg, #FFFFFF, #DDDDDD)',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 24px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}>
                Register Now
              </a>
            </div>
          </div>
                ) : (
                  <>
                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                      <div style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: '600', 
                        marginBottom: '10px', 
                        color: 'rgba(255,255,255,0.9)' 
                      }}>
                        3-Day Passes
                      </div>
                      <p style={{ 
                        fontSize: '1.1rem', 
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '800px',
                        margin: '0 auto 30px'
                      }}>
                        Save with our discounted multi-day passes:
                      </p>
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '30px',
                        maxWidth: '900px',
                        margin: '0 auto'
                      }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '200px'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>Student 3-Day</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>£150</div>
                <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>(Save £30)</div>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '200px'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>Academic 3-Day</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>£359</div>
                <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>(Save £58)</div>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '200px'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>General 3-Day</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>£499</div>
                <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>(Save £98)</div>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.2)',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '200px'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>VIP 3-Day</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>£1,999</div>
                <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>(Save £398)</div>
              </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            );
          })()}
        </Container>
      </Section>
      
      <div style={{ height: '40px', background: 'linear-gradient(to bottom, #333333, #f8f8f8)' }}></div>
<Section style={{ padding: '80px 0', background: '#f8f8f8', margin: '20px 0' }} id="venue">
        <Container>
          <div style={{ textAlign: 'center' }}>
            <SectionTitle>Venue</SectionTitle>
            <SectionSubtitle>
              Join us at the iconic Friend's House in central London
            </SectionSubtitle>
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '40px', 
              marginTop: '40px'
            }}>
              <div>
                <div style={{ width: '100%', height: '300px', border: '2px solid black', overflow: 'hidden', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                  <img src="/images/friends_house.jpg" alt="Friend's House" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ width: '100%', height: '300px', border: '2px solid black', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                  <iframe 
                    title="Friend's House Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.4952695456103!2d-0.13910492392386794!3d51.52580297181142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b2f69173579%3A0xd8e8146c17e0dd9!2sFriends%20House!5e0!3m2!1sen!2sus!4v1709901294448!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 'none' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '15px' }}>Friend's House</h3>
                <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>173-177 Euston Road, London, NW1 2BJ</p>
                
                <div style={{ marginTop: '30px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '10px' }}>Getting there</h4>
                  <p style={{ lineHeight: '1.6' }}>Walking distance from Euston, Euston Square, and King's Cross. No on-site parking available.</p>
                </div>
                
                <div style={{ marginTop: '40px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '10px' }}>Inquiries</h4>
                  <p>webmaster@thinkingaboutthinking.org</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      <Footer>
        <Container>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px', 
            marginBottom: '60px'
          }}>
            <div>
              <div style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <img src="/images/thatpng.jpg" alt="THAT Logo" style={{ height: '30px', marginRight: '10px' }} />
                THAT
              </div>
              <p style={{ 
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '24px',
                opacity: '0.8',
                maxWidth: '300px'
              }}>
                A premier summit bringing together researchers, entrepreneurs, and policymakers to address critical challenges in AI.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: '1rem',
                  opacity: '0.7',
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}>
                  YT
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: '1rem',
                  opacity: '0.7',
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}>
                  in
                </a>
                <a href="https://www.algopreneurship.org/" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: '1rem',
                  opacity: '0.7',
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}>
                  🌐
                </a>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '24px' }}>Summit</h4>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#speakers" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Speakers
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#schedule" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Schedule
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#tickets" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Tickets
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#venue" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Venue
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#sponsors" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Partners & Sponsors
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '24px' }}>Information</h4>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Registration
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    FAQs
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Travel
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Accommodations
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '24px' }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="mailto:webmaster@thinkingaboutthinking.org" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Email Us
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Sponsorship
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Media
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.95rem', opacity: '0.7', transition: 'opacity 0.3s ease', display: 'inline-block', paddingLeft: '0', position: 'relative' }}>
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <p style={{ fontSize: '0.875rem', opacity: '0.6' }}>
              © {new Date().getFullYear()} THAT. All rights reserved.
            </p>
            
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.875rem', opacity: '0.6', transition: 'opacity 0.3s ease' }}>
                Privacy Policy
              </a>
              <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.875rem', opacity: '0.6', transition: 'opacity 0.3s ease' }}>
                Terms of Service
              </a>
              <a href="https://www.algopreneurship.org/" style={{ fontSize: '0.875rem', opacity: '0.6', transition: 'opacity 0.3s ease' }}>
                Cookie Policy
              </a>
            </div>
          </div>
        </Container>
      </Footer>
    </ThemeProvider>
  );
}

export default App;
