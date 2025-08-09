import React from 'react';
import styled, { css } from 'styled-components';
import { SharedLayout, Container, glassEffect } from '../../components/SharedLayout';

// Styling
const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.2)' : '#DDDDDD'};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

const SponsorSection = styled.div`
  margin-bottom: 5rem;
`;

const SponsorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SponsorCard = styled.div`
  padding: 2.5rem;
  border-radius: 12px;
  text-align: center;
  ${props => props.theme.isDark ? glassEffect : css`
    background-color: #F9F9F9;
    border: 1px solid #EEEEEE;
  `}
  
  .logo {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    
    img {
      max-width: 100%;
      max-height: 80px;
      object-fit: contain;
    }
  }
  
  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  
  .tier {
    color: #AAAAAA;
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const SupportingOrgsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OrgLogo = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: ${props => props.theme.isDark ? 'none' : 'grayscale(100%)'};
  transition: all 0.3s ease;
  
  img {
    max-width: 100%;
    max-height: 80px;
    object-fit: contain;
  }
  
  &:hover {
    filter: none;
  }
`;

const CTABox = styled.div`
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  margin-top: 4rem;
  ${props => props.theme.isDark ? glassEffect : css`
    background-color: #F9F9F9;
    border: 1px solid #EEEEEE;
  `}
  
  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
  }
  
  p {
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #202123, #444654);
  color: #FFFFFF;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #444654, #202123);
  }
`;

const PartnersPage = () => {
  return (
    <SharedLayout activePath="/about/partners">
      <Section>
        <Container>
          <h1 style={{ 
            fontSize: '3.75rem', 
            fontWeight: '700', 
            marginBottom: '1rem', 
            letterSpacing: '-0.03em',
            textAlign: 'center'
          }}>
            Our Supporters
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '3rem', 
            maxWidth: '800px',
            textAlign: 'center',
            margin: '0 auto 3rem'
          }}>
            We're grateful to our sponsors and partners who make this summit possible
          </p>
          
          <SponsorSection>
            <SectionHeading>Gold Sponsor</SectionHeading>
            <SponsorGrid style={{ gridTemplateColumns: '1fr' }}>
              <SponsorCard>
                <div className="logo">
                  <img src="/images/sponsors/gold/XTX_Markets.png" alt="XTX Markets" />
                </div>
                <h3>XTX Markets</h3>
                <div className="tier">Gold Sponsor</div>
              </SponsorCard>
            </SponsorGrid>
          </SponsorSection>
          
          <SponsorSection>
            <SectionHeading>Silver Sponsor</SectionHeading>
            <SponsorGrid style={{ gridTemplateColumns: '1fr' }}>
              <SponsorCard>
                <div className="logo">
                  <img src="/images/sponsors/silver/HSBC-Logo.png" alt="HSBC" />
                </div>
                <h3>HSBC</h3>
                <div className="tier">Silver Sponsor</div>
              </SponsorCard>
            </SponsorGrid>
          </SponsorSection>
          
          <SponsorSection>
            <SectionHeading>Partners</SectionHeading>
            <SponsorGrid>
              <SponsorCard>
                <div className="logo">
                  <img src="/images/sponsors/tony_blair.webp" alt="Tony Blair Institute" />
                </div>
                <h3>Tony Blair Institute</h3>
              </SponsorCard>
              <SponsorCard>
                <div className="logo">
                  <img src="/images/sponsors/public-ai-logo-large.png" alt="Public AI" />
                </div>
                <h3>Public AI</h3>
              </SponsorCard>
              <SponsorCard>
                <div className="logo">
                  <img src="/images/sponsors/multiverse_logo_transparent.png" alt="Multiverse" />
                </div>
                <h3>Multiverse</h3>
              </SponsorCard>
            </SponsorGrid>
          </SponsorSection>
          
          <SponsorSection>
            <SectionHeading>Our Community</SectionHeading>
            <p style={{ 
              textAlign: 'center', 
              marginBottom: '3rem',
              maxWidth: '700px',
              margin: '0 auto 3rem'
            }}>
              The AI ecosystem is represented by organizations from across the UK and beyond
            </p>
            
            <SectionHeading>Supporting Organizations</SectionHeading>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '3rem', 
              background: 'rgba(32, 33, 35, 0.4)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <img 
                src="/images/misc/logo_wall.png" 
                alt="Supporting Organizations" 
                style={{ 
                  maxWidth: '100%', 
                  borderRadius: '8px'
                }} 
              />
            </div>
          </SponsorSection>
          
          <CTABox>
            <h3>Want to become a sponsor?</h3>
            <p>
              Join leading organizations supporting the future of AI research and responsible innovation. 
              Contact us today to learn about our sponsorship opportunities.
            </p>
            <Button href="/about/contact">Contact Us</Button>
          </CTABox>
        </Container>
      </Section>
    </SharedLayout>
  );
};

export default PartnersPage;