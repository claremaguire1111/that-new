import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// Theme
const theme = {
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    mediumGray: '#AAAAAA',
    darkGray: '#333333',
    accent: '#000000',
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
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    line-height: 1.5;
    overflow-x: hidden;
    font-size: 16px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
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
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
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
  display: flex;
  align-items: center;
  
  img {
    height: 40px;
    margin-right: 10px;
  }
  
  span {
    color: ${props => props.theme.colors.black};
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
    background-color: ${props => props.theme.colors.white};
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
    background-color: ${props => props.theme.colors.black};
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
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 12px 32px;
  border-radius: 2px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.darkGray};
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
  background: linear-gradient(135deg, #ffffff, #f5f5f5);
  
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
  color: ${props => props.theme.colors.black};
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 32px;
  color: ${props => props.theme.colors.black};
  
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
  color: ${props => props.theme.colors.black};
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 20px;
  
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
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  z-index: 5;
  
  @media (max-width: 768px) {
    bottom: 20px;
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
`;

const DayTab = styled.button`
  padding: 16px 32px;
  font-size: 1.25rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? props.theme.colors.black : props.theme.colors.mediumGray};
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.black : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.black};
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 1rem;
  }
`;

// Speakers Section
const SpeakersSection = styled(Section)`
  padding: 100px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 64px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 40px;
  }
`;

const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SpeakerCard = styled.div`
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const SpeakerPhoto = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 24px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }
  
  &:hover img {
    filter: grayscale(70%);
  }
  
  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const SpeakerName = styled.h4`
  font-size: 1.375rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const SpeakerRole = styled.p`
  font-size: 1rem;
  margin-bottom: 4px;
  color: ${props => props.theme.colors.darkGray};
`;

const SpeakerCompany = styled.p`
  font-size: 1rem;
  font-weight: 500;
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
  margin-bottom: 80px;
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
  padding: 100px 0;
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
  }
`;

// Sponsors Section
const SponsorsSection = styled(Section)`
  background-color: ${props => props.theme.colors.lightGray};
  padding: 100px 0;
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
  border-radius: 4px;
  padding: 20px;
  
  &:hover {
    filter: none;
    opacity: 1;
    transform: scale(1.05);
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

// Speakers Data
const speakersData = {
  day1: [
    {
      name: "Dr David Silver",
      role: "Principal Research Scientist",
      company: "DeepMind",
      image: "/images/speakers/DrDavidSilver.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr Raia Hadsell",
      role: "VP of Research",
      company: "DeepMind",
      image: "/images/speakers/DrRaiaHadsell.jpg",
      linkedin: "#",
      twitter: "#"
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDay, setActiveDay] = useState('day1');
  const [showSingleDay, setShowSingleDay] = useState(true);
  const [countdown, setCountdown] = useState({
    days: 183,
    hours: 10,
    minutes: 45,
    seconds: 30
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
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const toggleTicketView = (isSingleDay) => {
    setShowSingleDay(isSingleDay);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      <Header scrolled={scrolled}>
        <Container>
          <Nav>
            <Logo>
              <img src="/images/thatpng.jpg" alt="THAT Logo" />
              <span>THAT</span>
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
          <Container>
            <HeroContent>
              <HeroTagline>Global Summit on</HeroTagline>
              <HeroTitle>Open Problems for AI</HeroTitle>
              <HeroSubtitle>
                How can Britain leverage AI research breakthroughs safely to drive productivity and growth?
              </HeroSubtitle>
              <HeroActions>
                <RegistrationButton href="#tickets">Register Now</RegistrationButton>
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
        
        <SpeakersSection id="speakers">
          <Container>
            <SectionTitle>World-Class Speakers</SectionTitle>
            <SectionSubtitle>
              Leading experts in AI research, policy, and entrepreneurship from around the world
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
            
            {activeDay === 'day1' && (
              <FeaturedSpeakers>
                <SpeakersGrid>
                  {speakersData.day1.slice(0, 6).map((speaker, index) => (
                    <SpeakerCard key={index}>
                      <SpeakerPhoto>
                        <img src={speaker.image} alt={speaker.name} />
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
                
                <div style={{ textAlign: 'center' }}>
                  <SeeAllButton href="#all-speakers">See All Day 1 Speakers</SeeAllButton>
                </div>
              </FeaturedSpeakers>
            )}
            
            {activeDay === 'day2' && (
              <FeaturedSpeakers>
                <SpeakersGrid>
                  {speakersData.day2.slice(0, 6).map((speaker, index) => (
                    <SpeakerCard key={index}>
                      <SpeakerPhoto>
                        <img src={speaker.image} alt={speaker.name} />
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
                
                <div style={{ textAlign: 'center' }}>
                  <SeeAllButton href="#all-speakers">See All Day 2 Speakers</SeeAllButton>
                </div>
              </FeaturedSpeakers>
            )}
            
            {activeDay === 'day3' && (
              <FeaturedSpeakers>
                <SpeakersGrid>
                  {speakersData.day3.slice(0, 6).map((speaker, index) => (
                    <SpeakerCard key={index}>
                      <SpeakerPhoto>
                        <img src={speaker.image} alt={speaker.name} />
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
                
                <div style={{ textAlign: 'center' }}>
                  <SeeAllButton href="#all-speakers">See All Day 3 Speakers</SeeAllButton>
                </div>
              </FeaturedSpeakers>
            )}
          </Container>
        </SpeakersSection>
        
        <FeaturesSection id="schedule">
          <Container>
            <SectionTitle>Summit Highlights</SectionTitle>
            <SectionSubtitle>
              Speakers from the UK's leading institutions discuss the future challenges and opportunities in AI research and application.
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
                <img src="/images/friends_house.jpg" alt="Venue Map" />
              </VenueMap>
            </VenueGrid>
          </Container>
        </VenueSection>
        
        <SponsorsSection id="sponsors">
          <Container>
            <SectionTitle>Partners</SectionTitle>
            <SectionSubtitle>
              The THAT Summit is made possible by the generous support of our partners.
            </SectionSubtitle>
            
            <SponsorsTiers>
              <SponsorsTier>
                <SponsorsTierTitle>Gold Sponsors</SponsorsTierTitle>
                <SponsorsGrid columns={3}>
                  <SponsorLogo height="100px">
                    <img src="/images/Asset1.png" alt="Sponsor 1" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="100px">
                    <img src="/images/Asset1.png" alt="Sponsor 2" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="100px">
                    <img src="/images/Asset1.png" alt="Sponsor 3" />
                  </SponsorLogo>
                </SponsorsGrid>
              </SponsorsTier>
              
              <SponsorsTier>
                <SponsorsTierTitle>Silver Sponsors</SponsorsTierTitle>
                <SponsorsGrid columns={4}>
                  <SponsorLogo height="80px" grayscale>
                    <img src="/images/Asset1.png" alt="Sponsor 4" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="80px" grayscale>
                    <img src="/images/Asset1.png" alt="Sponsor 5" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="80px" grayscale>
                    <img src="/images/Asset1.png" alt="Sponsor 6" />
                  </SponsorLogo>
                  
                  <SponsorLogo height="80px" grayscale>
                    <img src="/images/Asset1.png" alt="Sponsor 7" />
                  </SponsorLogo>
                </SponsorsGrid>
              </SponsorsTier>
            </SponsorsTiers>
            
            <ContactInfo>
              Want to become a sponsor? <a href="mailto:webmaster@thinkingaboutthinking.org" style={{ textDecoration: 'underline' }}>Contact us</a>
            </ContactInfo>
          </Container>
        </SponsorsSection>
        
        <TicketsSection id="tickets">
          <img src="/images/Asset1.png" alt="THAT Logo" className="background-logo" />
          <Container>
            <SectionTitle>Tickets</SectionTitle>
            <SectionSubtitle>
              Secure your place at the premier AI entrepreneurship summit
            </SectionSubtitle>
            
            <TicketsTabs>
              <TicketsTab 
                position="left"
                active={showSingleDay} 
                onClick={() => toggleTicketView(true)}
              >
                Single Day Pass
              </TicketsTab>
              <TicketsTab 
                position="right"
                active={!showSingleDay} 
                onClick={() => toggleTicketView(false)}
              >
                Three Day Pass (Save 15%)
              </TicketsTab>
            </TicketsTabs>
            
            {showSingleDay ? (
              <TicketsGrid>
                <TicketCard>
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

                <TicketCard>
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

                <TicketCard>
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

                <TicketCard premium>
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
              </TicketsGrid>
            ) : (
              <TicketsGrid>
                <TicketCard>
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
                
                <TicketCard>
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
                
                <TicketCard>
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
                
                <TicketCard premium>
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
              </TicketsGrid>
            )}
          </Container>
        </TicketsSection>
        
        <CTASection>
          <Container>
            <CTATitle>Join the conversation</CTATitle>
            <CTADescription>
              Connect with a community of AI researchers, entrepreneurs, and policymakers dedicated to advancing the field.
            </CTADescription>
            <CTAButtonGroup>
              <RegistrationButton href="#register">Register Now</RegistrationButton>
              <SecondaryButton href="#contact">Contact Us</SecondaryButton>
            </CTAButtonGroup>
          </Container>
        </CTASection>
        
        <NewsletterSection>
          <Container>
            <SectionTitle>Stay Updated</SectionTitle>
            <SectionSubtitle>
              Subscribe to our newsletter for the latest updates on speakers, schedule, and more.
            </SectionSubtitle>
            
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="Enter your email" />
              <NewsletterButton>Subscribe</NewsletterButton>
            </NewsletterForm>
          </Container>
        </NewsletterSection>
      </main>
      
      <Footer>
        <Container>
          <FooterGrid>
            <FooterColumn>
              <FooterLogo>
                <img src="/images/thatpng.jpg" alt="THAT Logo" />
                THAT
              </FooterLogo>
              <FooterDescription>
                A premier summit bringing together researchers, entrepreneurs, and policymakers to address critical challenges in AI.
              </FooterDescription>
              <SocialLinks>
                <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  Youtube
                </SocialLink>
                <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </SocialLink>
                <SocialLink href="https://www.algopreneurship.org/" target="_blank" rel="noopener noreferrer">
                  Website
                </SocialLink>
              </SocialLinks>
            </FooterColumn>
            
            <FooterColumn>
              <FooterTitle>Summit</FooterTitle>
              <FooterLinks>
                <FooterLink><a href="#speakers">Speakers</a></FooterLink>
                <FooterLink><a href="#schedule">Schedule</a></FooterLink>
                <FooterLink><a href="#venue">Venue</a></FooterLink>
                <FooterLink><a href="#sponsors">Partners</a></FooterLink>
              </FooterLinks>
            </FooterColumn>
            
            <FooterColumn>
              <FooterTitle>Information</FooterTitle>
              <FooterLinks>
                <FooterLink><a href="https://www.algopreneurship.org/">Registration</a></FooterLink>
                <FooterLink><a href="https://www.algopreneurship.org/">FAQs</a></FooterLink>
                <FooterLink><a href="https://www.algopreneurship.org/">Travel</a></FooterLink>
                <FooterLink><a href="https://www.algopreneurship.org/">Accommodations</a></FooterLink>
              </FooterLinks>
            </FooterColumn>
            
            <FooterColumn>
              <FooterTitle>Contact</FooterTitle>
              <FooterLinks>
                <FooterLink><a href="mailto:webmaster@thinkingaboutthinking.org">Email Us</a></FooterLink>
                <FooterLink><a href="https://www.algopreneurship.org/">Sponsorship</a></FooterLink>
                <FooterLink><a href="https://www.algopreneurship.org/">Media</a></FooterLink>
                <FooterLink><a href="https://www.algopreneurship.org/">Support</a></FooterLink>
              </FooterLinks>
            </FooterColumn>
          </FooterGrid>
          
          <FooterBottom>
            <Copyright>
              © {new Date().getFullYear()} THAT. All rights reserved.
            </Copyright>
            
            <LegalLinks>
              <a href="https://www.algopreneurship.org/">Privacy Policy</a>
              <a href="https://www.algopreneurship.org/">Terms of Service</a>
              <a href="https://www.algopreneurship.org/">Cookie Policy</a>
            </LegalLinks>
          </FooterBottom>
        </Container>
      </Footer>
    </ThemeProvider>
  );
}

export default App;