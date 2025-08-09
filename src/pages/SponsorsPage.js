import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  PageTemplate,
  Section,
  Container,
  Button,
  glassEffect
} from '../components/PageTemplate';

// Sponsors Section Styles
const SponsorCategory = styled.div`
  margin-bottom: 5rem;
  padding: 2rem;
  border-radius: 16px;
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#F9F9F9'};
  
  ${props => props.theme.isDark && css`
    background: rgba(60, 62, 68, 0.3);
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
  
  ${props => props.theme.isDark && css`
    ${glassEffect}
  `}
  
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

// Package Cards
const PackagesSection = styled(Section)`
  background-color: ${props => props.theme.isDark ? 'transparent' : '#F5F5F5'};
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
  
  ${props => props.theme.isDark ? css`
    ${glassEffect}
  ` : css`
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

// Sponsorship packages
const packages = [
  {
    title: "Gold Sponsor",
    price: "£15,000",
    features: [
      "Prominent logo placement on all event materials",
      "5 VIP tickets to the summit",
      "Premium booth location in exhibition area",
      "Keynote speaking opportunity",
      "Full-page ad in digital program",
      "Logo on stage backdrop",
      "Sponsored session opportunity",
      "Access to attendee list (opt-in)",
      "Sponsor highlight in email campaigns"
    ]
  },
  {
    title: "Silver Sponsor",
    price: "£7,500",
    features: [
      "Logo placement on event website and materials",
      "3 VIP tickets to the summit",
      "Booth in exhibition area",
      "Panel speaking opportunity",
      "Half-page ad in digital program",
      "Logo on digital signage",
      "Mention in press releases",
      "Social media promotion"
    ]
  },
  {
    title: "Bronze Sponsor",
    price: "£3,500",
    features: [
      "Logo on event website",
      "2 General tickets to the summit",
      "Tabletop display in exhibition area",
      "Quarter-page ad in digital program",
      "Logo in email communications",
      "Social media mention"
    ]
  }
];

const SponsorsPage = () => {
  return (
    <PageTemplate 
      title="Sponsors & Partners" 
      subtitle="Meet the organizations helping make THAT Summit possible"
      activePage="/sponsors"
    >
      <Section>
        <Container>
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
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button as={Link} to="/media" primary>
              Become a Sponsor
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* Sponsorship Packages */}
      <PackagesSection>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Sponsorship Packages</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            Partner with THAT Summit to connect with a focused audience of AI researchers, entrepreneurs, and policy makers.
          </p>
          
          <PackageGrid>
            {packages.map((pkg, index) => (
              <PackageCard key={index}>
                <PackageHeader>
                  <PackageTitle>{pkg.title}</PackageTitle>
                  <PackagePrice>{pkg.price}</PackagePrice>
                </PackageHeader>
                
                <PackageContent>
                  <PackageFeatures>
                    {pkg.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </PackageFeatures>
                  
                  <Button as={Link} to="/media" primary>
                    Contact Us
                  </Button>
                </PackageContent>
              </PackageCard>
            ))}
          </PackageGrid>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '3rem',
            padding: '2rem',
            borderRadius: '16px',
            backgroundColor: 'rgba(16, 163, 127, 0.05)'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Custom Packages Available</h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
              Looking for something different? We offer custom sponsorship packages tailored to your specific goals and budget.
            </p>
            <Button as="a" href="mailto:sponsorship@thinkingaboutthinking.org" primary>
              Discuss Custom Options
            </Button>
          </div>
        </Container>
      </PackagesSection>
    </PageTemplate>
  );
};

export default SponsorsPage;