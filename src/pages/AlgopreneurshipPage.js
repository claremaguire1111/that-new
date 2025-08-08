import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  PageTemplate,
  Section,
  Container,
  Flex,
  Button,
  ButtonGroup,
  SmallHeading,
  MainHeading,
  SubHeading,
  glassEffect
} from '../components/PageTemplate';

// Reusing animations from the existing site
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Section styling
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

// Carousel setup
const carouselImages = [
  "/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.24.png",
  "/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.37.png",
  "/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.48.png",
  "/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.59.png",
  "/images/breakout_rooms/download copy 2.png"
];

// Featured speakers
const featuredSpeakers = [
  {
    name: "Dr David Silver",
    title: "Principal Research Scientist",
    company: "DeepMind",
    image: "/images/speakers/DrDavidSilver.jpg"
  },
  {
    name: "Prof. Chris Summerfield",
    title: "Research Director & Professor",
    company: "AISI & Oxford",
    image: "/images/speakers/ProfChrisSummerfield.webp"
  },
  {
    name: "Dr Raia Hadsell",
    title: "VP of Research",
    company: "DeepMind",
    image: "/images/speakers/DrRaiaHadsell.jpg"
  },
  {
    name: "Dr Jakob Mökander",
    title: "Director",
    company: "Tony Blair Institute",
    image: "/images/speakers/DrJakobMökander.jpg"
  }
];

const AlgopreneurshipPage = () => {
  return (
    <PageTemplate 
      title="Global Summit on Open Problems for AI" 
      subtitle="How can Britain leverage AI research breakthroughs safely to drive productivity and growth?"
      activePage="/"
    >
      {/* Features Section */}
      <FeaturesSection>
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
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }}></span>
            </h3>
            
            {/* Horizontal Carousel */}
            <div style={{ 
              position: 'relative',
              overflow: 'hidden',
              height: '300px',
              marginBottom: '3rem',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
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
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
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
              <Button as={Link} to="/tickets" primary>
                Get Tickets
              </Button>
              <Button as={Link} to="/media">
                Become a Partner
              </Button>
            </ButtonGroup>
          </div>
        </Container>
      </FeaturesSection>
      
      {/* Featured Speakers Section */}
      <Section>
        <Container>
          <SmallHeading>Featured Speakers</SmallHeading>
          <MainHeading>Learn from the Best</MainHeading>
          <SubHeading>Meet some of our distinguished speakers who will be sharing their expertise</SubHeading>
          
          <SpeakersGrid>
            {featuredSpeakers.map((speaker, index) => (
              <SpeakerCard key={index}>
                <SpeakerImage 
                  src={speaker.image}
                  name={speaker.name}
                />
                <SpeakerInfo>
                  <SpeakerName>{speaker.name}</SpeakerName>
                  <SpeakerTitle>{speaker.title}</SpeakerTitle>
                  <SpeakerCompany>{speaker.company}</SpeakerCompany>
                </SpeakerInfo>
              </SpeakerCard>
            ))}
          </SpeakersGrid>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button as={Link} to="/speakers">
              View All Speakers
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* CTA Section */}
      <Section style={{ 
        backgroundColor: 'rgba(16, 163, 127, 0.05)',
        padding: '4rem 0'
      }}>
        <Container>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            textAlign: 'center' 
          }}>
            <MainHeading>Ready to Join Us?</MainHeading>
            <SubHeading>Secure your spot at THAT Summit and be part of the conversation shaping the future of AI</SubHeading>
            <ButtonGroup>
              <Button as={Link} to="/tickets" primary>
                Buy Tickets
              </Button>
              <Button as={Link} to="/agenda">
                View Agenda
              </Button>
            </ButtonGroup>
          </div>
        </Container>
      </Section>
    </PageTemplate>
  );
};

export default AlgopreneurshipPage;