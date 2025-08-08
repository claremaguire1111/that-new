import React from 'react';
import styled from 'styled-components';
import {
  PageTemplate,
  Section,
  Container,
  Button,
  FormContainer,
  FormInput,
  FormSelect,
  FormLabel,
  FormPrivacyText
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

const AgendaPage = () => {
  return (
    <PageTemplate 
      title="Event Agenda" 
      subtitle="Discover our comprehensive program of keynotes, panels, and workshops"
      activePage="/agenda"
    >
      <Section>
        <Container>
          <ComingSoonContainer>
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            <ComingSoonText>
              We're finalizing the agenda for THAT Summit 2025. Sign up below to be the first to know when our detailed agenda is released, and to receive updates about speakers and sessions.
            </ComingSoonText>
          </ComingSoonContainer>
          
          <FormContainer>
            {/* Decorative star elements for dark mode */}
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
                <FormLabel>Your Interest</FormLabel>
                <FormSelect name="interests">
                  <option value="general">General Interest</option>
                  <option value="academic">Academic Research</option>
                  <option value="industry">Industry Applications</option>
                  <option value="policy">AI Policy</option>
                  <option value="speaking">Speaking Opportunities</option>
                  <option value="sponsorship">Sponsorship Opportunities</option>
                </FormSelect>
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
                  Get Agenda Updates
                </Button>
              </div>
              
              <FormPrivacyText>
                We respect your privacy and will never share your information.
              </FormPrivacyText>
            </form>
          </FormContainer>
        </Container>
      </Section>
    </PageTemplate>
  );
};

export default AgendaPage;