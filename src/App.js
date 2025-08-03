import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { createGlobalStyle, css } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  :root {
    --cream: #F7F3F0;
    --black: #0A0A0A;
    --charcoal: #1A1A1A;
    --white: #FFFFFF;
    --navy: #0F1B2D;
    --dark-green: #1D3025;
    --grey-100: #F1F1F1;
    --grey-200: #E1E1E1;
    --grey-300: #C4C4C4;
    --grey-400: #8C8C8C;
    --grey-500: #555555;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--cream);
    color: var(--charcoal);
    line-height: 1.5;
    overflow-x: hidden;
    font-size: 16px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
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

  /* Ticket Styles */
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
    0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
  }
`;

// Layout Components
const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (min-width: 768px) {
    padding: 0 48px;
  }
  
  @media (min-width: 1200px) {
    padding: 0 80px;
  }
`;

const Section = styled.section`
  margin: ${props => props.margin || "120px 0"};
  position: relative;
  
  @media (max-width: 768px) {
    margin: ${props => props.mobileMargin || "80px 0"};
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
  backdrop-filter: blur(10px);
  background: ${props => props.scrolled ? 'rgba(247, 243, 240, 0.9)' : 'transparent'};
  box-shadow: ${props => props.scrolled ? '0 2px 20px rgba(0, 0, 0, 0.05)' : 'none'};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  
  span {
    color: var(--navy);
  }
`;

const MenuButton = styled.button`
  display: none;
  
  @media (max-width: 1024px) {
    display: block;
    font-size: 1.5rem;
    z-index: 1002;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 300px;
    height: 100vh;
    background-color: var(--cream);
    padding: 100px 40px;
    flex-direction: column;
    gap: 20px;
    transition: right 0.3s ease;
    z-index: 1001;
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled.a`
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 1px;
    background-color: var(--charcoal);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const RegistrationButton = styled.a`
  background-color: var(--charcoal);
  color: var(--white);
  padding: 12px 32px;
  border-radius: 2px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--black);
    transform: translateY(-2px);
  }
  
  @media (max-width: 1024px) {
    display: inline-block;
    margin-top: 20px;
  }
`;

// Hero Section
const HeroSection = styled.section`
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    min-height: 600px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const HeroTagline = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 48px;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.6) 50%, rgba(10, 10, 10, 0.3) 100%);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Summit Section
const SummitSection = styled(Section)`
  background-color: var(--white);
  padding: 120px 0;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 64px;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 40px;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DayCard = styled.div`
  background-color: var(--cream);
  padding: 40px;
  border-radius: 4px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const DayTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  
  span {
    margin-left: 8px;
    font-weight: 400;
  }
`;

const SpeakersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SpeakerItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const SpeakerInfo = styled.div`
  flex: 1;
`;

const SpeakerName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

const SpeakerRole = styled.p`
  font-size: 0.875rem;
  margin-bottom: 4px;
`;

const SpeakerCompany = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
`;

const SpeakerPhoto = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Features Section
const FeaturesSection = styled(Section)``;

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
  background-color: ${props => props.dark ? 'var(--charcoal)' : 'var(--white)'};
  color: ${props => props.dark ? 'var(--white)' : 'var(--charcoal)'};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
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
  background-color: var(--white);
  padding: 120px 0;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const VenueGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const VenueInfo = styled.div``;

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
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Sponsors Section
const SponsorsSection = styled(Section)``;

// Ticket Section
const SectionHeader = styled.div`
  margin-bottom: 40px;
`;

const TicketToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 40px;
`;

const TicketToggleButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  color: ${props => props.active ? 'var(--black)' : 'var(--white)'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.3)'};
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  
  &:hover {
    background: ${props => props.active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const TicketHelpText = styled.p`
  text-align: center;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  font-style: italic;
`;

const TicketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  position: relative;
  
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
  background: ${props => props.premium ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.premium ? 'var(--black)' : 'var(--white)'};
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
  color: var(--white);
`;

const TicketTypePremium = styled(TicketType)`
  color: #FFD700;
`;

const TicketPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 16px 0 8px;
  color: var(--white);
`;

const TicketPricePerDay = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
`;

const TicketAvailability = styled.div`
  font-size: 0.85rem;
  color: ${props => props.limited ? '#FFD700' : 'rgba(255, 255, 255, 0.6)'};
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
    color: #4CAF50;
    font-weight: bold;
  }
`;

const TicketButton = styled.a`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
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
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: var(--black);
  border: none;
  font-weight: 600;
  animation: pulse 2s infinite;
  
  &:hover {
    background: linear-gradient(135deg, #FFC107, #FF9800);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
    animation: none;
  }
`;

const TicketInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 32px;
  margin-top: 64px;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--white);
  }
  
  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    
    a {
      color: #4CAF50;
      text-decoration: underline;
      transition: color 0.2s ease;
      
      &:hover {
        color: #81C784;
      }
    }
  }
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
  
  &:hover {
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

// Footer
const Footer = styled.footer`
  background-color: var(--charcoal);
  color: var(--white);
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

// Main App Component
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSingleDay, setShowSingleDay] = useState(true);
  
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
  
  const toggleTicketView = (isSingleDay) => {
    setShowSingleDay(isSingleDay);
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <>
      <GlobalStyle />
      
      <Header scrolled={scrolled}>
        <Container>
          <Nav>
            <Logo>
              Algopreneurship<span>.</span>
            </Logo>
            
            <MenuButton onClick={toggleMenu}>
              {menuOpen ? '✕' : '☰'}
            </MenuButton>
            
            <NavItems isOpen={menuOpen}>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#speakers">Speakers</NavLink>
              <NavLink href="#schedule">Schedule</NavLink>
              <NavLink href="#venue">Venue</NavLink>
              <NavLink href="#sponsors">Partners</NavLink>
              <NavLink href="#tickets">Tickets</NavLink>
              <RegistrationButton href="#register">Register Now</RegistrationButton>
            </NavItems>
          </Nav>
        </Container>
      </Header>
      
      <main>
        <HeroSection>
          <HeroBackground>
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="AI Conference" />
          </HeroBackground>
          
          <Container>
            <HeroContent>
              <HeroTagline>Global Summit</HeroTagline>
              <HeroTitle>Open Problems for AI</HeroTitle>
              <HeroSubtitle>
                How can Britain leverage AI research breakthroughs safely to drive productivity and growth?
              </HeroSubtitle>
              <RegistrationButton href="#register">Registration Coming Soon</RegistrationButton>
            </HeroContent>
          </Container>
        </HeroSection>
        
        <SummitSection id="about">
          <Container>
            <SectionTitle>The Future of AI</SectionTitle>
            <SectionSubtitle>
              Join leaders in AI research, policy, and entrepreneurship to discuss critical challenges and opportunities.
            </SectionSubtitle>
            
            <DaysGrid>
              <DayCard>
                <DayTitle>Day 1 <span>Oct 28th</span></DayTitle>
                <h3>New Algorithmic Breakthroughs and AI Infrastructure</h3>
                <SpeakersList>
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Dr David Silver" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Dr David Silver</SpeakerName>
                      <SpeakerRole>Principal Research Scientist</SpeakerRole>
                      <SpeakerCompany>DeepMind</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                  
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Dr Raia Hadsell" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Dr Raia Hadsell</SpeakerName>
                      <SpeakerRole>VP of Research</SpeakerRole>
                      <SpeakerCompany>DeepMind</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                  
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Prof. Jakob Foerster" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Prof. Jakob Foerster</SpeakerName>
                      <SpeakerRole>Senior Tech Lead</SpeakerRole>
                      <SpeakerCompany>Meta & Oxford</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                </SpeakersList>
              </DayCard>
              
              <DayCard>
                <DayTitle>Day 2 <span>Oct 29th</span></DayTitle>
                <h3>AI Safety, and AI in Enterprise & Society</h3>
                <SpeakersList>
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Prof. Chris Summerfield" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Prof. Chris Summerfield</SpeakerName>
                      <SpeakerRole>Research Director & Professor</SpeakerRole>
                      <SpeakerCompany>AISI & Oxford</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                  
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Dr Samuel Bell" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Dr Samuel Bell</SpeakerName>
                      <SpeakerRole>AI Research Scientist</SpeakerRole>
                      <SpeakerCompany>Meta</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                  
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Prof. Skyler Wang" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Prof. Skyler Wang</SpeakerName>
                      <SpeakerRole>Assistant Professor & Research Scientist</SpeakerRole>
                      <SpeakerCompany>McGill & Meta</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                </SpeakersList>
              </DayCard>
              
              <DayCard>
                <DayTitle>Day 3 <span>Oct 30th</span></DayTitle>
                <h3>AI Entrepreneurship & Application</h3>
                <SpeakersList>
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Dr Irina Jurenka" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Dr Irina Jurenka</SpeakerName>
                      <SpeakerRole>Research Lead</SpeakerRole>
                      <SpeakerCompany>DeepMind</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                  
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Pete Hill" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Pete Hill</SpeakerName>
                      <SpeakerRole>Co-Founder</SpeakerRole>
                      <SpeakerCompany>Cudo</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                  
                  <SpeakerItem>
                    <SpeakerPhoto>
                      <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Dr Trias Gkikopoulos" />
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <SpeakerName>Dr Trias Gkikopoulos</SpeakerName>
                      <SpeakerRole>Innovation Lead - Robotics & AI</SpeakerRole>
                      <SpeakerCompany>Innovate UK</SpeakerCompany>
                    </SpeakerInfo>
                  </SpeakerItem>
                </SpeakersList>
              </DayCard>
            </DaysGrid>
          </Container>
        </SummitSection>
        
        <FeaturesSection id="schedule">
          <Container>
            <SectionTitle>Summit Highlights</SectionTitle>
            <SectionSubtitle>
              Immerse yourself in a comprehensive program designed to explore the frontiers of AI research and application.
            </SectionSubtitle>
            
            <FeaturesGrid>
              <FeatureCard>
                <FeatureIcon>🎤</FeatureIcon>
                <FeatureTitle>Keynote Talks</FeatureTitle>
                <FeatureDescription>
                  Visionary perspectives from leaders in AI research, policy, and industry on the future of the field.
                </FeatureDescription>
              </FeatureCard>
              
              <FeatureCard dark>
                <FeatureIcon>👥</FeatureIcon>
                <FeatureTitle>Panels</FeatureTitle>
                <FeatureDescription>
                  Engaging discussions that bring together diverse viewpoints on critical AI challenges and opportunities.
                </FeatureDescription>
              </FeatureCard>
              
              <FeatureCard>
                <FeatureIcon>💬</FeatureIcon>
                <FeatureTitle>Breakout Rooms</FeatureTitle>
                <FeatureDescription>
                  Focused sessions for deeper exploration of specific topics with smaller groups.
                </FeatureDescription>
              </FeatureCard>
              
              <FeatureCard dark>
                <FeatureIcon>🏢</FeatureIcon>
                <FeatureTitle>Expo Hall</FeatureTitle>
                <FeatureDescription>
                  Connect with innovative companies and research labs showcasing cutting-edge AI technologies.
                </FeatureDescription>
              </FeatureCard>
            </FeaturesGrid>
          </Container>
        </FeaturesSection>
        
        <VenueSection id="venue">
          <Container>
            <SectionTitle>Venue</SectionTitle>
            <SectionSubtitle>
              Join us at a premier location in the heart of London.
            </SectionSubtitle>
            
            <VenueGrid>
              <VenueInfo>
                <VenueTitle>Friend's House</VenueTitle>
                <VenueAddress>173-177 Euston Road, London, NW1 2BJ</VenueAddress>
                <VenueDirections>
                  Walking distance from Euston, Euston Square, and King's Cross. No on-site parking available.
                </VenueDirections>
                
                <div>
                  <h4 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Inquiries</h4>
                  <p style={{ marginBottom: '24px', fontSize: '1rem' }}>webmaster@thinkingaboutthinking.org</p>
                  
                  <h4 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Organizer</h4>
                  <p style={{ fontSize: '1rem' }}>
                    Thinking About Thinking, Inc.<br />
                    A 501(c)3 Nonprofit Company in the State of New Jersey.<br />
                    28 Spring Street, Unit 156, Princeton, NJ, USA, 08540
                  </p>
                </div>
              </VenueInfo>
              
              <VenueMap>
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Venue Map" />
              </VenueMap>
            </VenueGrid>
          </Container>
        </VenueSection>
        
        <SponsorsSection id="sponsors">
          <Container>
            <SectionTitle>Partners & Sponsors</SectionTitle>
            <SectionSubtitle>
              The Algopreneurship Summit is made possible by the generous support of our partners.
            </SectionSubtitle>
            
            <SponsorsTiers>
              <SponsorsTier>
                <SponsorsTierTitle>Gold Sponsors</SponsorsTierTitle>
                <SponsorsGrid columns={3}>
                  <SponsorLogo height="100px">
                    <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Sponsor 1" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="100px">
                    <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Sponsor 2" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="100px">
                    <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Sponsor 3" />
                  </SponsorLogo>
                </SponsorsGrid>
              </SponsorsTier>
              
              <SponsorsTier>
                <SponsorsTierTitle>Silver Sponsors</SponsorsTierTitle>
                <SponsorsGrid columns={4}>
                  <SponsorLogo height="80px" grayscale faded>
                    <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Sponsor 4" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="80px" grayscale faded>
                    <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Sponsor 5" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="80px" grayscale faded>
                    <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Sponsor 6" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="80px" grayscale faded>
                    <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Sponsor 7" />
                  </SponsorLogo>
                </SponsorsGrid>
              </SponsorsTier>
            </SponsorsTiers>
            
            <ContactInfo>
              Want to become a sponsor? <a href="mailto:webmaster@thinkingaboutthinking.org" style={{ textDecoration: 'underline' }}>Contact us</a>
            </ContactInfo>
          </Container>
        </SponsorsSection>
      
        <Section id="tickets" style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '120px 0', position: 'relative' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/371/614/original/ai-logo-monogram-with-digital-computer-electronic-concept-for-technology-business-free-vector.jpg" alt="AI Logo" className="background-logo" />
          <Container>
            <SectionHeader style={{ textAlign: 'center' }}>
              <SectionTitle style={{ color: 'var(--white)' }}>Tickets</SectionTitle>
              <SectionSubtitle style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Secure your place at the premier AI entrepreneurship summit
              </SectionSubtitle>
            </SectionHeader>

            <TicketToggle>
              <TicketToggleButton active={showSingleDay} onClick={() => toggleTicketView(true)}>Single Day Pass</TicketToggleButton>
              <TicketToggleButton active={!showSingleDay} onClick={() => toggleTicketView(false)}>Three Day Pass (Save 15%)</TicketToggleButton>
            </TicketToggle>
            
            <TicketHelpText>
              The earlier you book, the more you save. Book now to secure your spot for Algopreneurship 2025.
            </TicketHelpText>
            
            {showSingleDay ? (
              <TicketGrid>
                <TicketCard data-aos="fade-up" data-aos-delay="100">
                  <TicketTypeBadge>Student</TicketTypeBadge>
                  <TicketType>Student Pass</TicketType>
                  <TicketPrice>£60</TicketPrice>
                  <TicketPricePerDay>Single day access</TicketPricePerDay>
                  <TicketAvailability>350 tickets available</TicketAvailability>
                  <TicketDivider />
                  <TicketFeatures>
                    <TicketFeature>Access to all keynotes</TicketFeature>
                    <TicketFeature>Networking opportunities</TicketFeature>
                    <TicketFeature>Workshop participation</TicketFeature>
                    <TicketFeature>Digital conference materials</TicketFeature>
                    <TicketFeature>Lunch and refreshments</TicketFeature>
                  </TicketFeatures>
                  <TicketButton href="#register-form">Select Day & Register</TicketButton>
                </TicketCard>

                <TicketCard data-aos="fade-up" data-aos-delay="200">
                  <TicketTypeBadge>Academic</TicketTypeBadge>
                  <TicketType>Academic Pass</TicketType>
                  <TicketPrice>£139</TicketPrice>
                  <TicketPricePerDay>Single day access</TicketPricePerDay>
                  <TicketAvailability>325 tickets available</TicketAvailability>
                  <TicketDivider />
                  <TicketFeatures>
                    <TicketFeature>Access to all keynotes</TicketFeature>
                    <TicketFeature>Priority networking sessions</TicketFeature>
                    <TicketFeature>Workshop participation</TicketFeature>
                    <TicketFeature>Digital conference materials</TicketFeature>
                    <TicketFeature>Lunch and refreshments</TicketFeature>
                    <TicketFeature>Access to speaker Q&A sessions</TicketFeature>
                  </TicketFeatures>
                  <TicketButton href="#register-form">Select Day & Register</TicketButton>
                </TicketCard>

                <TicketCard data-aos="fade-up" data-aos-delay="300">
                  <TicketTypeBadge>General</TicketTypeBadge>
                  <TicketType>General Pass</TicketType>
                  <TicketPrice>£199</TicketPrice>
                  <TicketPricePerDay>Single day access</TicketPricePerDay>
                  <TicketAvailability>325 tickets available</TicketAvailability>
                  <TicketDivider />
                  <TicketFeatures>
                    <TicketFeature>Access to all keynotes</TicketFeature>
                    <TicketFeature>Premium networking sessions</TicketFeature>
                    <TicketFeature>Workshop participation</TicketFeature>
                    <TicketFeature>Digital conference materials</TicketFeature>
                    <TicketFeature>Lunch and refreshments</TicketFeature>
                    <TicketFeature>Access to speaker Q&A sessions</TicketFeature>
                    <TicketFeature>Conference recordings</TicketFeature>
                  </TicketFeatures>
                  <TicketButton href="#register-form">Select Day & Register</TicketButton>
                </TicketCard>

                <TicketCard premium data-aos="fade-up" data-aos-delay="400">
                  <TicketTypeBadge premium>VIP</TicketTypeBadge>
                  <TicketTypePremium>VIP All-Access</TicketTypePremium>
                  <TicketPrice>£799</TicketPrice>
                  <TicketPricePerDay>Single day access</TicketPricePerDay>
                  <TicketAvailability limited>Only 50 tickets available</TicketAvailability>
                  <TicketDivider />
                  <TicketFeatures>
                    <TicketFeature>All General pass benefits</TicketFeature>
                    <TicketFeature>VIP exclusive reception</TicketFeature>
                    <TicketFeature>Reserved premium seating</TicketFeature>
                    <TicketFeature>Private networking with speakers</TicketFeature>
                    <TicketFeature>Exclusive VIP lounge access</TicketFeature>
                    <TicketFeature>Conference swag package</TicketFeature>
                    <TicketFeature>Priority registration for 2026</TicketFeature>
                    <TicketFeature>Complimentary workshop recordings</TicketFeature>
                  </TicketFeatures>
                  <TicketButtonPremium href="#register-form">Secure VIP Access</TicketButtonPremium>
                </TicketCard>
              </TicketGrid>
            ) : (
              <TicketGrid>
                <TicketCard data-aos="fade-up" data-aos-delay="100">
                  <TicketTypeBadge>Student</TicketTypeBadge>
                  <TicketType>Student Pass</TicketType>
                  <TicketPrice>£153</TicketPrice>
                  <TicketPricePerDay>£51 per day (save 15%)</TicketPricePerDay>
                  <TicketAvailability>350 tickets available</TicketAvailability>
                  <TicketDivider />
                  <TicketFeatures>
                    <TicketFeature>Full 3-day access (Oct 28-30)</TicketFeature>
                    <TicketFeature>Access to all keynotes</TicketFeature>
                    <TicketFeature>Networking opportunities</TicketFeature>
                    <TicketFeature>Workshop participation</TicketFeature>
                    <TicketFeature>Digital conference materials</TicketFeature>
                    <TicketFeature>Lunch and refreshments daily</TicketFeature>
                  </TicketFeatures>
                  <TicketButton href="#register-form">Register Now</TicketButton>
                </TicketCard>
                
                <TicketCard data-aos="fade-up" data-aos-delay="200">
                  <TicketTypeBadge>Academic</TicketTypeBadge>
                  <TicketType>Academic Pass</TicketType>
                  <TicketPrice>£354</TicketPrice>
                  <TicketPricePerDay>£118 per day (save 15%)</TicketPricePerDay>
                  <TicketAvailability>325 tickets available</TicketAvailability>
                  <TicketDivider />
                  <TicketFeatures>
                    <TicketFeature>Full 3-day access (Oct 28-30)</TicketFeature>
                    <TicketFeature>Access to all keynotes</TicketFeature>
                    <TicketFeature>Priority networking sessions</TicketFeature>
                    <TicketFeature>Workshop participation</TicketFeature>
                    <TicketFeature>Digital conference materials</TicketFeature>
                    <TicketFeature>Lunch and refreshments daily</TicketFeature>
                    <TicketFeature>Access to speaker Q&A sessions</TicketFeature>
                  </TicketFeatures>
                  <TicketButton href="#register-form">Register Now</TicketButton>
                </TicketCard>
                
                <TicketCard data-aos="fade-up" data-aos-delay="300">
                  <TicketTypeBadge>General</TicketTypeBadge>
                  <TicketType>General Pass</TicketType>
                  <TicketPrice>£507</TicketPrice>
                  <TicketPricePerDay>£169 per day (save 15%)</TicketPricePerDay>
                  <TicketAvailability>325 tickets available</TicketAvailability>
                  <TicketDivider />
                  <TicketFeatures>
                    <TicketFeature>Full 3-day access (Oct 28-30)</TicketFeature>
                    <TicketFeature>Access to all keynotes</TicketFeature>
                    <TicketFeature>Premium networking sessions</TicketFeature>
                    <TicketFeature>Workshop participation</TicketFeature>
                    <TicketFeature>Digital conference materials</TicketFeature>
                    <TicketFeature>Lunch and refreshments daily</TicketFeature>
                    <TicketFeature>Access to speaker Q&A sessions</TicketFeature>
                    <TicketFeature>Conference recordings</TicketFeature>
                  </TicketFeatures>
                  <TicketButton href="#register-form">Register Now</TicketButton>
                </TicketCard>
                
                <TicketCard premium data-aos="fade-up" data-aos-delay="400">
                  <TicketTypeBadge premium>VIP</TicketTypeBadge>
                  <TicketTypePremium>VIP All-Access</TicketTypePremium>
                  <TicketPrice>£2,037</TicketPrice>
                  <TicketPricePerDay>£679 per day (save 15%)</TicketPricePerDay>
                  <TicketAvailability limited>Only 50 tickets available</TicketAvailability>
                  <TicketDivider />
                  <TicketFeatures>
                    <TicketFeature>Full 3-day access (Oct 28-30)</TicketFeature>
                    <TicketFeature>All General pass benefits</TicketFeature>
                    <TicketFeature>VIP exclusive reception</TicketFeature>
                    <TicketFeature>Reserved premium seating</TicketFeature>
                    <TicketFeature>Private networking with speakers</TicketFeature>
                    <TicketFeature>Exclusive VIP lounge access</TicketFeature>
                    <TicketFeature>Conference swag package</TicketFeature>
                    <TicketFeature>Priority registration for 2026</TicketFeature>
                    <TicketFeature>Complimentary workshop recordings</TicketFeature>
                  </TicketFeatures>
                  <TicketButtonPremium href="#register-form">Secure VIP Access</TicketButtonPremium>
                </TicketCard>
              </TicketGrid>
            )}
            
            <TicketInfo data-aos="fade-up">
              <h3>Group Bookings</h3>
              <p>Looking for 3 or more tickets? Contact us for special group rates at <a href="mailto:groups@algopreneurshipsummit.com">groups@algopreneurshipsummit.com</a></p>
              
              <h3 style={{ marginTop: '30px' }}>Sponsorship Opportunities</h3>
              <p>Want to showcase your company at the event? Email us at <a href="mailto:sponsors@algopreneurshipsummit.com">sponsors@algopreneurshipsummit.com</a> for partnership details.</p>
              
              <h3 style={{ marginTop: '30px' }}>Special Passes</h3>
              <p>We offer special passes for press, startups, and future AI leaders. <a href="#special-passes">Learn more about eligibility</a> or email <a href="mailto:special@algopreneurshipsummit.com">special@algopreneurshipsummit.com</a>.</p>
              
              <h3 style={{ marginTop: '30px' }}>Need Help?</h3>
              <p>Have questions about which ticket is right for you? <a href="#ticket-faq">Check our FAQ</a> or contact us at <a href="mailto:tickets@algopreneurshipsummit.com">tickets@algopreneurshipsummit.com</a>.</p>
            </TicketInfo>
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <a href="/tickets.pdf" style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                color: 'rgba(255, 255, 255, 0.7)', 
                textDecoration: 'underline',
                fontSize: '0.9rem',
                transition: 'color 0.2s ease'
              }}>
                <span style={{ marginRight: '6px' }}>📄</span> Download Ticket Comparison PDF
              </a>
            </div>
          </Container>
        </Section>
      </main>
      
      <Footer>
        <Container>
          <FooterGrid>
            <FooterColumn>
              <FooterLogo>Algopreneurship</FooterLogo>
              <FooterDescription>
                A premier summit bringing together researchers, entrepreneurs, and policymakers to address critical challenges in AI.
              </FooterDescription>
              <SocialLinks>
                <SocialLink href="#">
                  <span>Twitter</span>
                </SocialLink>
                <SocialLink href="#">
                  <span>LinkedIn</span>
                </SocialLink>
                <SocialLink href="#">
                  <span>Instagram</span>
                </SocialLink>
              </SocialLinks>
            </FooterColumn>
            
            <FooterColumn>
              <FooterTitle>Summit</FooterTitle>
              <FooterLinks>
                <FooterLink><a href="#about">About</a></FooterLink>
                <FooterLink><a href="#speakers">Speakers</a></FooterLink>
                <FooterLink><a href="#schedule">Schedule</a></FooterLink>
                <FooterLink><a href="#venue">Venue</a></FooterLink>
                <FooterLink><a href="#sponsors">Partners</a></FooterLink>
              </FooterLinks>
            </FooterColumn>
            
            <FooterColumn>
              <FooterTitle>Information</FooterTitle>
              <FooterLinks>
                <FooterLink><a href="#">Registration</a></FooterLink>
                <FooterLink><a href="#">FAQs</a></FooterLink>
                <FooterLink><a href="#">Travel</a></FooterLink>
                <FooterLink><a href="#">Accommodations</a></FooterLink>
              </FooterLinks>
            </FooterColumn>
            
            <FooterColumn>
              <FooterTitle>Contact</FooterTitle>
              <FooterLinks>
                <FooterLink><a href="mailto:webmaster@thinkingaboutthinking.org">Email Us</a></FooterLink>
                <FooterLink><a href="#">Sponsorship</a></FooterLink>
                <FooterLink><a href="#">Media</a></FooterLink>
                <FooterLink><a href="#">Support</a></FooterLink>
              </FooterLinks>
            </FooterColumn>
          </FooterGrid>
          
          <FooterBottom>
            <Copyright>
              © {new Date().getFullYear()} Algopreneurship. All rights reserved.
            </Copyright>
            
            <LegalLinks>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </LegalLinks>
          </FooterBottom>
        </Container>
      </Footer>
    </>
  );
}

export default App;