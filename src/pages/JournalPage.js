import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SharedLayout, Container, glassEffect } from '../components/SharedLayout';

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  padding: 2rem;
  border-radius: 12px;
  ${props => props.theme.isDark ? glassEffect : `
    background-color: #F9F9F9;
    border: 1px solid #EEEEEE;
  `}
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #DDDDDD'};
  background: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF'};
  color: ${props => props.theme.isDark ? '#FFFFFF' : '#333333'};
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: ${props => props.theme.isDark ? 'inset 0 1px 3px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 3px rgba(0, 0, 0, 0.05)'};
  
  &::placeholder {
    color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.3)' : '#999999'};
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.isDark ? 'rgba(16, 163, 127, 0.2)' : 'rgba(16, 163, 127, 0.1)'};
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
`;

const FormPrivacyText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.5)' : '#888888'};
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0;
`;

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

const FeaturedTopicsContainer = styled.div`
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#F9F9F9'};
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE'};
  max-width: 800px;
`;

const TopicsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  
  li {
    padding: 0.75rem 1rem;
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#EEEEEE'};
    border-radius: 8px;
    font-size: 0.9375rem;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 1.5rem;
    
    &::before {
      content: '';
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background-color: ${props => props.theme.colors.accent};
      border-radius: 50%;
    }
  }
`;

const JournalPage = () => {
  return (
    <SharedLayout activePath="/journal">
      <Section>
        <Container>
          <h1 style={{ 
            fontSize: '3.75rem', 
            fontWeight: '700', 
            marginBottom: '1rem', 
            letterSpacing: '-0.03em',
            textAlign: 'center'
          }}>
            Research Journal
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '3rem', 
            maxWidth: '800px',
            textAlign: 'center',
            margin: '0 auto 3rem'
          }}>
            Insights, analyses, and discoveries from the frontiers of AI research
          </p>
          <ComingSoonContainer>
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            <ComingSoonText>
              Our research journal will feature in-depth analyses, papers, and thought pieces from leading AI researchers, THAT Summit speakers, and distinguished guest contributors. Join our mailing list to be notified when new articles are published.
            </ComingSoonText>
            
            <ButtonGroup>
              <Button as={Link} to="/tickets" primary>
                Get Tickets
              </Button>
              <Button as={Link} to="/speakers">
                Meet Our Speakers
              </Button>
            </ButtonGroup>
          </ComingSoonContainer>
          
          <FeaturedTopicsContainer>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Research Domains & Focus Areas</h3>
            
            <TopicsList>
              <li>Theoretical AI Foundations</li>
              <li>Algorithmic Innovation</li>
              <li>AI Safety & Alignment</li>
              <li>AI Ethics & Governance</li>
              <li>Policy & Regulation</li>
              <li>Multi-agent Systems</li>
              <li>Cognitive Science & AI</li>
              <li>AI & Complex Systems</li>
            </TopicsList>
          </FeaturedTopicsContainer>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Subscribe for Updates</h3>
            
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
                    Subscribe to Journal
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
    </SharedLayout>
  );
};

export default JournalPage;