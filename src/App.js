import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  :root {
    --black: #000000;
    --white: #FFFFFF;
    --light-gray: #F5F5F5;
    --medium-gray: #AAAAAA;
    --dark-gray: #333333;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--white);
    color: var(--black);
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
    0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
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
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
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
    color: var(--black);
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
    background-color: var(--white);
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
    background-color: var(--black);
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
  background-color: var(--black);
  color: var(--white);
  padding: 12px 32px;
  border-radius: 2px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--dark-gray);
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
  color: var(--black);
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 32px;
  color: var(--black);
  
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
  color: var(--black);
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroLogo = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 250px;
  height: 250px;
  opacity: 0.1;
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

// Day Section
const DaySection = styled(Section)`
  padding: 100px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const DayHeader = styled.div`
  margin-bottom: 60px;
`;

const DayTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DaySubtitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
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
`;

const SpeakerPhoto = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 24px;
  
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
    width: 150px;
    height: 150px;
  }
`;

const SpeakerName = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const SpeakerRole = styled.p`
  font-size: 1rem;
  margin-bottom: 4px;
  color: var(--dark-gray);
`;

const SpeakerCompany = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

// Features Section
const FeaturesSection = styled(Section)`
  background-color: var(--light-gray);
  padding: 100px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
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
  background-color: ${props => props.dark ? 'var(--black)' : 'var(--white)'};
  color: ${props => props.dark ? 'var(--white)' : 'var(--black)'};
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
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
  }
`;

// Sponsors Section
const SponsorsSection = styled(Section)`
  background-color: var(--light-gray);
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
  background-color: var(--black);
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

// Main App Component
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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
  
  return (
    <>
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
              <RegistrationButton href="#register">Registration Coming Soon</RegistrationButton>
            </HeroContent>
            <HeroLogo>
              <img src="/images/Asset1.png" alt="THAT Logo" />
            </HeroLogo>
          </Container>
        </HeroSection>
        
        <DaySection id="speakers">
          <Container>
            <DayHeader>
              <DayTitle>Day 1: Oct 28th</DayTitle>
              <DaySubtitle>New Algorithmic Breakthroughs and AI Infrastructure</DaySubtitle>
            </DayHeader>
            
            <SpeakersGrid>
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrDavidSilver.jpg" alt="Dr David Silver" />
                </SpeakerPhoto>
                <SpeakerName>Dr David Silver</SpeakerName>
                <SpeakerRole>Principal Research Scientist</SpeakerRole>
                <SpeakerCompany>DeepMind</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrRaiaHadsell.jpg" alt="Dr Raia Hadsell" />
                </SpeakerPhoto>
                <SpeakerName>Dr Raia Hadsell</SpeakerName>
                <SpeakerRole>VP of Research</SpeakerRole>
                <SpeakerCompany>DeepMind</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/Prof_Jakob Foerster.jpg" alt="Prof. Jakob Foerster" />
                </SpeakerPhoto>
                <SpeakerName>Prof. Jakob Foerster</SpeakerName>
                <SpeakerRole>Senior Tech Lead</SpeakerRole>
                <SpeakerCompany>Meta & Oxford</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrJonathanRichardSchwarz.jpg" alt="Dr Jonathan Richard Schwarz" />
                </SpeakerPhoto>
                <SpeakerName>Dr Jonathan Richard Schwarz</SpeakerName>
                <SpeakerRole>Head of AI Research</SpeakerRole>
                <SpeakerCompany>Thomson Reuters</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrLionSchulz.jpg" alt="Dr Lion Schulz" />
                </SpeakerPhoto>
                <SpeakerName>Dr Lion Schulz</SpeakerName>
                <SpeakerRole>Head of Machine Learning</SpeakerRole>
                <SpeakerCompany>Bertelsmann</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/MaxBeverton_Palmer.jpg" alt="Max Beverton-Palmer" />
                </SpeakerPhoto>
                <SpeakerName>Max Beverton-Palmer</SpeakerName>
                <SpeakerRole>Head of Public Policy</SpeakerRole>
                <SpeakerCompany>NVIDIA</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/KarlHavard.jpg" alt="Karl Havard" />
                </SpeakerPhoto>
                <SpeakerName>Karl Havard</SpeakerName>
                <SpeakerRole>CCO</SpeakerRole>
                <SpeakerCompany>NSCALE</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/MarkBjornsgaard.jpg" alt="Mark Bjornsgaard" />
                </SpeakerPhoto>
                <SpeakerName>Mark Bjornsgaard</SpeakerName>
                <SpeakerRole>Founder & CIO</SpeakerRole>
                <SpeakerCompany>DeepGreen</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrJoshuaTan.jpg" alt="Dr Joshua Tan" />
                </SpeakerPhoto>
                <SpeakerName>Dr Joshua Tan</SpeakerName>
                <SpeakerRole>Head of Policy</SpeakerRole>
                <SpeakerCompany>Public AI</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrJamesWhittington.jpg" alt="Dr James Whittington" />
                </SpeakerPhoto>
                <SpeakerName>Dr James Whittington</SpeakerName>
                <SpeakerRole>Vice-President & Research Scientist</SpeakerRole>
                <SpeakerCompany>Thinking About Thinking</SpeakerCompany>
                <SpeakerCompany>Stanford & Oxford</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrRuairidhMcLennanBattleday.jpg" alt="Dr Ruairidh McLennan Battleday" />
                </SpeakerPhoto>
                <SpeakerName>Dr Ruairidh McLennan Battleday</SpeakerName>
                <SpeakerRole>President & Research Scientist</SpeakerRole>
                <SpeakerCompany>Thinking About Thinking</SpeakerCompany>
                <SpeakerCompany>Harvard & MIT</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrFelixSosa.jpg" alt="Dr Felix Sosa" />
                </SpeakerPhoto>
                <SpeakerName>Dr Felix Sosa</SpeakerName>
                <SpeakerRole>Research Scientist</SpeakerRole>
                <SpeakerCompany>Harvard & MIT</SpeakerCompany>
              </SpeakerCard>
            </SpeakersGrid>
          </Container>
        </DaySection>
        
        <DaySection style={{ backgroundColor: 'var(--light-gray)' }}>
          <Container>
            <DayHeader>
              <DayTitle>Day 2: Oct 29th</DayTitle>
              <DaySubtitle>AI Safety, and AI in Enterprise & Society</DaySubtitle>
            </DayHeader>
            
            <SpeakersGrid>
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/ProfChrisSummerfield.webp" alt="Prof. Chris Summerfield" />
                </SpeakerPhoto>
                <SpeakerName>Prof. Chris Summerfield</SpeakerName>
                <SpeakerRole>Research Director & Professor</SpeakerRole>
                <SpeakerCompany>AISI & Oxford</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrSamuelBell.jpg" alt="Dr Samuel Bell" />
                </SpeakerPhoto>
                <SpeakerName>Dr Samuel Bell</SpeakerName>
                <SpeakerRole>AI Research Scientist</SpeakerRole>
                <SpeakerCompany>Meta</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/ProfSkylerWang.jpg" alt="Prof. Skyler Wang" />
                </SpeakerPhoto>
                <SpeakerName>Prof. Skyler Wang</SpeakerName>
                <SpeakerRole>Assistant Professor & Research Scientist</SpeakerRole>
                <SpeakerCompany>McGill & Meta</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrMariusHobbhahn.jpg" alt="Dr Marius Hobbhahn" />
                </SpeakerPhoto>
                <SpeakerName>Dr Marius Hobbhahn</SpeakerName>
                <SpeakerRole>Director & Co-Founder</SpeakerRole>
                <SpeakerCompany>Apollo Research</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DavidSully.jpg" alt="David Sully" />
                </SpeakerPhoto>
                <SpeakerName>David Sully</SpeakerName>
                <SpeakerRole>CEO & Co-Founder</SpeakerRole>
                <SpeakerCompany>ADVAI</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/AshleyRamrachia.jpg" alt="Ashley Ramrachia" />
                </SpeakerPhoto>
                <SpeakerName>Ashley Ramrachia</SpeakerName>
                <SpeakerRole>Founder and CEO</SpeakerRole>
                <SpeakerCompany>Academy</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrJakobMökander.jpg" alt="Dr Jakob Mökander" />
                </SpeakerPhoto>
                <SpeakerName>Dr Jakob Mökander</SpeakerName>
                <SpeakerRole>Director</SpeakerRole>
                <SpeakerCompany>Tony Blair Institute</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/JulianVonNehammer.jpg" alt="Julian Von Nehammer" />
                </SpeakerPhoto>
                <SpeakerName>Julian Von Nehammer</SpeakerName>
                <SpeakerRole>Director</SpeakerRole>
                <SpeakerCompany>Lilt</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/EsraDemir.jpg" alt="Esra Demir" />
                </SpeakerPhoto>
                <SpeakerName>Esra Demir</SpeakerName>
                <SpeakerRole>Group Digital Partner Director</SpeakerRole>
                <SpeakerCompany>HSBC</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrKevinLoiHeng.jpg" alt="Dr Kevin Loi-Heng" />
                </SpeakerPhoto>
                <SpeakerName>Dr Kevin Loi-Heng</SpeakerName>
                <SpeakerRole>Co-Founder & CEO</SpeakerRole>
                <SpeakerCompany>Avalon Insights</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/NicolayHagen.jpg" alt="Nicolay Hagen" />
                </SpeakerPhoto>
                <SpeakerName>Nicolay Hagen</SpeakerName>
                <SpeakerRole>Lecturer</SpeakerRole>
                <SpeakerCompany>NTNU</SpeakerCompany>
              </SpeakerCard>
            </SpeakersGrid>
          </Container>
        </DaySection>
        
        <DaySection>
          <Container>
            <DayHeader>
              <DayTitle>Day 3: Oct 30th</DayTitle>
              <DaySubtitle>AI Entrepreneurship & Application</DaySubtitle>
            </DayHeader>
            
            <SpeakersGrid>
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrIrinaJurenka.jpg" alt="Dr Irina Jurenka" />
                </SpeakerPhoto>
                <SpeakerName>Dr Irina Jurenka</SpeakerName>
                <SpeakerRole>Research Lead</SpeakerRole>
                <SpeakerCompany>DeepMind</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/PeteHIll.jpg" alt="Pete Hill" />
                </SpeakerPhoto>
                <SpeakerName>Pete Hill</SpeakerName>
                <SpeakerRole>Co-Founder</SpeakerRole>
                <SpeakerCompany>Cudo</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrTriasGkikopoulos.jpg" alt="Dr Trias Gkikopoulos" />
                </SpeakerPhoto>
                <SpeakerName>Dr Trias Gkikopoulos</SpeakerName>
                <SpeakerRole>Innovation Lead - Robotics & AI</SpeakerRole>
                <SpeakerCompany>Innovate UK</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/ErwannLeLannou.jpg" alt="Erwann Le Lannou" />
                </SpeakerPhoto>
                <SpeakerName>Erwann Le Lannou</SpeakerName>
                <SpeakerRole>Ventures</SpeakerRole>
                <SpeakerCompany>XTX Markets</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/TimoHannay.jpg" alt="Timo Hannay" />
                </SpeakerPhoto>
                <SpeakerName>Timo Hannay</SpeakerName>
                <SpeakerRole>Entrepreneur</SpeakerRole>
                <SpeakerCompany>Project X</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/DrLucindaScharff.jpg" alt="Dr Lucinda Scharff" />
                </SpeakerPhoto>
                <SpeakerName>Dr Lucinda Scharff</SpeakerName>
                <SpeakerRole>Staff Clinical Specialist</SpeakerRole>
                <SpeakerCompany>Google Health</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/LiLianAng.jpg" alt="Li-Lian Ang" />
                </SpeakerPhoto>
                <SpeakerName>Li-Lian Ang</SpeakerName>
                <SpeakerRole>Product Manager</SpeakerRole>
                <SpeakerCompany>BlueDot Impact</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/RehanaAlSoltane.jpg" alt="Rehana Al-Soltane" />
                </SpeakerPhoto>
                <SpeakerName>Rehana Al-Soltane</SpeakerName>
                <SpeakerRole>Learning Manager</SpeakerRole>
                <SpeakerCompany>Raspberry Pi Foundation</SpeakerCompany>
              </SpeakerCard>
              
              <SpeakerCard>
                <SpeakerPhoto>
                  <img src="/images/speakers/ProfDanNicolauJr.jpg" alt="Prof. Dan Nicolau Jr" />
                </SpeakerPhoto>
                <SpeakerName>Prof. Dan Nicolau Jr</SpeakerName>
                <SpeakerRole>Professor</SpeakerRole>
                <SpeakerCompany>KCL</SpeakerCompany>
              </SpeakerCard>
            </SpeakersGrid>
          </Container>
        </DaySection>
        
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
    </>
  );
}

export default App;