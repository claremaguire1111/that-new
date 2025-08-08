import React from 'react';
import styled from 'styled-components';
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

const FeaturedTopicsContainer = styled.div`
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.3)' : '#F9F9F9'};
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
    
    &::before {
      content: '✓';
      margin-right: 8px;
      color: ${props => props.theme.colors.accent};
      font-weight: bold;
    }
  }
`;

const BlogPage = () => {
  return (
    <PageTemplate 
      title="THAT Blog" 
      subtitle="Insights, news, and trends from the world of AI research and application"
      activePage="/blog"
    >
      <Section>
        <Container>
          <ComingSoonContainer>
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            <ComingSoonText>
              We're launching our blog soon with exclusive insights from THAT Summit speakers, partners, and AI industry experts. Join our mailing list to be notified when new content is published.
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
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Featured Topics We'll Cover</h3>
            
            <TopicsList>
              <li>AI Research Breakthroughs</li>
              <li>Algorithmic Innovation</li>
              <li>AI Safety & Ethics</li>
              <li>Enterprise AI Applications</li>
              <li>Policy & Regulation</li>
              <li>AI Entrepreneurship</li>
              <li>Future of Work</li>
              <li>AI for Social Good</li>
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
                    Subscribe to Blog
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

export default BlogPage;