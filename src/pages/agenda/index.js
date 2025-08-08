import React from 'react';
import styled from 'styled-components';
import { PageLayout, Section, Container } from '../../components/PageLayout';

// Styling
const ComingSoonContainer = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem auto;
`;

const ComingSoonHeading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const ComingSoonText = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
`;

// Form styling
const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2.5rem;
  border-radius: 16px;
  background: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.4)' : '#F9F9F9'};
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE'};
  box-shadow: ${props => props.theme.isDark ? '0 15px 40px rgba(0, 0, 0, 0.4)' : '0 15px 40px rgba(0, 0, 0, 0.05)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
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
  margin-bottom: 1.5rem;
  
  &::placeholder {
    color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.3)' : '#999999'};
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.isDark ? 'rgba(16, 163, 127, 0.2)' : 'rgba(16, 163, 127, 0.1)'};
  }
`;

const FormSelect = styled.select`
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
  margin-bottom: 1.5rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${props => props.theme.isDark ? 'FFFFFF' : '444444'}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;
  padding-right: 2.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
`;

const FormButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.9rem;
  background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.9)' : '#202123'};
  color: ${props => props.theme.isDark ? '#000000' : '#FFFFFF'};
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.isDark ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.theme.isDark ? '#FFFFFF' : '#333333'};
    box-shadow: ${props => props.theme.isDark ? '0 12px 20px rgba(0, 0, 0, 0.4)' : '0 12px 20px rgba(0, 0, 0, 0.15)'};
  }
`;

const FormPrivacyText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.5)' : '#888888'};
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0;
`;

const AgendaPage = () => {
  return (
    <PageLayout 
      title="Event Agenda" 
      subtitle="Discover our comprehensive program of keynotes, panels, and workshops" 
      activePath="/agenda"
    >
      <Section>
        <Container>
          <ComingSoonContainer>
            <ComingSoonHeading>Coming Soon</ComingSoonHeading>
            <ComingSoonText>
              Our detailed agenda is being finalized and will be published soon. Sign up below to be notified when the full program is released, including session times, topics, and speaker information.
            </ComingSoonText>
          </ComingSoonContainer>
          
          <FormContainer>
            <form action="https://formspree.io/f/mvgqvezg" method="POST">
              <FormLabel>Full Name</FormLabel>
              <FormInput 
                type="text" 
                name="name" 
                placeholder="Enter your full name" 
                required 
              />
              
              <FormLabel>Email Address</FormLabel>
              <FormInput 
                type="email" 
                name="email" 
                placeholder="your.email@example.com" 
                required 
              />
              
              <FormLabel>I'm Interested In</FormLabel>
              <FormSelect name="interest">
                <option value="all">All Sessions</option>
                <option value="ai_research">AI Research</option>
                <option value="industry">Industry Applications</option>
                <option value="ai_safety">AI Safety & Ethics</option>
                <option value="entrepreneurship">Entrepreneurship</option>
                <option value="policy">Policy & Regulation</option>
              </FormSelect>
              
              <FormButton type="submit">
                Get Agenda Updates
              </FormButton>
              
              <FormPrivacyText>
                We respect your privacy and will never share your information with third parties.
              </FormPrivacyText>
            </form>
          </FormContainer>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default AgendaPage;