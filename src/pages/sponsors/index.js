import React from 'react';
import styled, { css } from 'styled-components';
import { SharedLayout, Container, glassEffect } from '../../components/SharedLayout';
import { Link } from 'react-router-dom';

// Styling
const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.primary 
    ? props.theme.isDark ? 'rgba(255, 255, 255, 0.9)' : '#202123'
    : props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#F1F1F1'
  };
  color: ${props => props.primary
    ? props.theme.isDark ? '#000000' : '#FFFFFF'
    : props.theme.colors.text
  };
  border: 1px solid ${props => props.primary
    ? 'transparent'
    : props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#E5E5E5'
  };
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, ${props => props.theme.isDark ? 0.2 : 0.1});
    background-color: ${props => props.primary
      ? props.theme.isDark ? '#FFFFFF' : '#333333'
      : props.theme.isDark ? 'rgba(255, 255, 255, 0.15)' : '#E5E5E5'
    };
  }
`;
const SponsorCategory = styled.div`
  margin-bottom: 5rem;
  padding: 2rem;
  border-radius: 16px;
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#F9F9F9'};
  
  ${props => props.theme.isDark && glassEffect}
  
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

const SponsorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  grid-gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SponsorLogo = styled.div`
  height: 120px;
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#FFFFFF'};
  border-radius: ${props => props.theme.radii.md};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#EEEEEE'};
  
  ${props => props.theme.isDark && glassEffect}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, ${props => props.theme.isDark ? 0.2 : 0.05});
    
    img {
      opacity: 1;
      filter: grayscale(0%);
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

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  ${props => props.theme.isDark ? glassEffect : css`
    border: 1px solid ${props.theme.colors.border};
    background-color: #FFFFFF;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, ${props => props.theme.isDark ? 0.3 : 0.1});
  }
`;

const PackageHeader = styled.div`
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : props.theme.colors.border};
`;

const PackageTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const PackagePrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  
  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const PackageContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PackageFeatures = styled.ul`
  list-style-type: none;
  margin-bottom: 2rem;
  flex-grow: 1;
  
  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${props => props.theme.colors.accent};
      font-weight: bold;
    }
  }
`;


const ContactBox = styled.div`
  background-color: ${props => props.theme.isDark ? 'rgba(16, 163, 127, 0.1)' : 'rgba(16, 163, 127, 0.05)'};
  padding: 2rem;
  border-radius: 16px;
  margin-top: 3rem;
  text-align: center;
  
  h3 {
    margin-bottom: 1rem;
  }
  
  p {
    max-width: 600px;
    margin: 0 auto 1.5rem auto;
  }
`;

// Sponsors data
const sponsors = {
  gold: [
    { name: "XTX Markets", logo: "/images/sponsors/gold/XTX_Markets.png" }
  ],
  silver: [
    { name: "HSBC", logo: "/images/sponsors/silver/HSBC-Logo.png" }
  ],
  partners: [
    { name: "Tony Blair Institute", logo: "/images/sponsors/tony_blair copy.webp" },
    { name: "Public AI", logo: "/images/sponsors/public-ai-logo-large.png" },
    { name: "Multiverse", logo: "/images/sponsors/multiverse_logo_transparent.png" }
  ]
};

const SponsorsPage = () => {
  return (
    <SharedLayout activePath="/sponsors">
      <Section>
        <Container>
          <h1 style={{ 
            fontSize: '3.75rem', 
            fontWeight: '700', 
            marginBottom: '1rem', 
            letterSpacing: '-0.03em' 
          }}>
            Sponsors & Partners
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '3rem', 
            maxWidth: '800px' 
          }}>
            Meet the organizations helping make THAT Summit possible
          </p>
          {/* Gold Sponsors */}
          <SponsorCategory>
            <SponsorCategoryTitle>Gold Sponsor</SponsorCategoryTitle>
            <SponsorGrid columns={1}>
              {sponsors.gold.map((sponsor, index) => (
                <SponsorLogo key={index} style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <img src={sponsor.logo} alt={sponsor.name} />
                </SponsorLogo>
              ))}
            </SponsorGrid>
          </SponsorCategory>
          
          {/* Silver Sponsors */}
          <SponsorCategory>
            <SponsorCategoryTitle>Silver Sponsor</SponsorCategoryTitle>
            <SponsorGrid columns={1}>
              {sponsors.silver.map((sponsor, index) => (
                <SponsorLogo key={index} style={{ maxWidth: '350px', margin: '0 auto' }}>
                  <img src={sponsor.logo} alt={sponsor.name} />
                </SponsorLogo>
              ))}
            </SponsorGrid>
          </SponsorCategory>
          
          {/* Partners */}
          <SponsorCategory>
            <SponsorCategoryTitle>Partners</SponsorCategoryTitle>
            <SponsorGrid columns={3}>
              {sponsors.partners.map((sponsor, index) => (
                <SponsorLogo key={index}>
                  <img src={sponsor.logo} alt={sponsor.name} />
                </SponsorLogo>
              ))}
            </SponsorGrid>
          </SponsorCategory>
        </Container>
      </Section>
      
      <Section style={{ backgroundColor: 'rgba(16, 163, 127, 0.03)' }}>
        <Container>
          <SectionHeading>Interested in Sponsoring?</SectionHeading>
          <p style={{ 
            textAlign: 'center', 
            maxWidth: '700px', 
            margin: '0 auto 2rem',
            fontSize: '1.125rem',
            lineHeight: '1.6'
          }}>
            Partner with THAT Summit to connect with a focused audience of AI researchers, entrepreneurs, and policy makers. 
            We offer various sponsorship options tailored to your specific goals and budget.
          </p>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button as="a" href="mailto:sponsorship@thinkingaboutthinking.org" primary style={{ padding: '0.9rem 2rem', fontSize: '1.1rem' }}>
              Contact Us About Sponsorship
            </Button>
          </div>
        </Container>
      </Section>
    </SharedLayout>
  );
};

export default SponsorsPage;