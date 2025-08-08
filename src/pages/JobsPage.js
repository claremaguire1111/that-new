import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  PageTemplate,
  Section,
  Container,
  Button,
  ButtonGroup,
  FormContainer,
  FormInput,
  FormLabel,
  FormPrivacyText,
  glassEffect
} from '../components/PageTemplate';

const ComingSoonContainer = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem auto;
`;

const ComingSoonTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ComingSoonText = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const InfoBox = styled.div`
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  
  ${props => props.theme.isDark ? css`
    ${glassEffect}
    border: 1px solid rgba(255, 255, 255, 0.05);
  ` : css`
    background-color: #F9F9F9;
    border: 1px solid #EEEEEE;
  `}
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FeatureItem = styled.div`
  text-align: center;
  
  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  h4 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9375rem;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const JobsPage = () => {
  return (
    <PageTemplate 
      title="AI Jobs Board" 
      subtitle="Connect with leading AI organizations and find your next career opportunity"
      activePage="/jobs"
    >
      <Section>
        <Container>
          <ComingSoonContainer>
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            <ComingSoonText>
              We're building a curated jobs board featuring opportunities from leading AI research labs, tech companies, startups, and academic institutions. Sign up to be notified when we launch.
            </ComingSoonText>
            
            <ButtonGroup>
              <Button as={Link} to="/tickets" primary>
                Get Tickets
              </Button>
              <Button as={Link} to="/media">
                Partner With Us
              </Button>
            </ButtonGroup>
          </ComingSoonContainer>
          
          <InfoBox>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Why List Your Jobs on THAT Jobs Board?</h3>
            
            <FeaturesList>
              <FeatureItem>
                <div className="icon">👥</div>
                <h4>Targeted Reach</h4>
                <p>Connect with a focused audience of AI specialists and researchers.</p>
              </FeatureItem>
              
              <FeatureItem>
                <div className="icon">🔍</div>
                <h4>Quality Candidates</h4>
                <p>Attract professionals from top institutions and companies.</p>
              </FeatureItem>
              
              <FeatureItem>
                <div className="icon">📈</div>
                <h4>Industry Visibility</h4>
                <p>Showcase your organization to the wider AI community.</p>
              </FeatureItem>
            </FeaturesList>
          </InfoBox>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Be the First to Know</h3>
            
            <FormContainer>
              <form action="https://formspree.io/f/mvgqvezg" method="POST">
                <div style={{ marginBottom: '2rem' }}>
                  <FormLabel>Your Name</FormLabel>
                  <FormInput 
                    type="text" 
                    name="name" 
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <FormLabel>Email Address</FormLabel>
                  <FormInput 
                    type="email" 
                    name="email" 
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <FormLabel>I am interested in</FormLabel>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input 
                        type="checkbox" 
                        name="interest" 
                        value="finding_jobs" 
                        style={{ marginRight: '0.5rem' }}
                      />
                      Finding job opportunities
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input 
                        type="checkbox" 
                        name="interest" 
                        value="posting_jobs" 
                        style={{ marginRight: '0.5rem' }}
                      />
                      Posting job listings
                    </label>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <Button 
                    as="button" 
                    type="submit" 
                    primary
                    style={{
                      padding: '0.9rem 2.5rem',
                      fontSize: '1rem',
                      borderRadius: '10px',
                      fontWeight: '600',
                      letterSpacing: '0.01em',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    Join Jobs Waitlist
                  </Button>
                </div>
                
                <FormPrivacyText>
                  We respect your privacy and will never share your information.
                </FormPrivacyText>
              </form>
            </FormContainer>
          </div>
        </Container>
      </Section>
    </PageTemplate>
  );
};

export default JobsPage;