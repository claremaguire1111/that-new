import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  PageTemplate, 
  Section, 
  Container,
  Button as TemplateButton,
  glassEffect
} from '../components/PageTemplate';

// Use the imported glassEffect from PageTemplate

// Use the imported Button as TemplateButton
const Button = TemplateButton;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`;

// Ticket Card Styles
const TicketsGrid = styled.div`
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

const TicketCard = styled.div`
  border-radius: ${props => props.theme.radii.lg};
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
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
  
  ${props => props.featured && css`
    border: 2px solid ${props.theme.colors.accent};
    
    &::before {
      content: 'MOST POPULAR';
      position: absolute;
      top: 0;
      right: 0;
      background-color: ${props.theme.colors.accent};
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 1rem;
      border-bottom-left-radius: 8px;
      letter-spacing: 0.5px;
    }
  `}
`;

const TicketHeader = styled.div`
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : props.theme.colors.border};
`;

const TicketCategory = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const TicketTier = styled.div`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  
  span {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: ${props => props.theme.radii.sm};
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#F5F5F5'};
  }
`;

const TicketPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  
  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const TicketContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TicketFeatures = styled.ul`
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

const DailyPricing = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : props.theme.colors.border};
  
  strong {
    color: ${props => props.theme.colors.text};
  }
`;

// Info Section
const InfoSection = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  border-radius: ${props => props.theme.radii.lg};
  
  ${props => props.theme.isDark ? css`
    ${glassEffect}
  ` : css`
    border: 1px solid ${props.theme.colors.border};
    background-color: #F9F9F9;
  `}
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9375rem;
    margin-bottom: 0.5rem;
  }
`;



const TicketsPage = () => {
  return (
    <PageTemplate
      title="Ticket Options"
      subtitle="Choose the perfect pass for your THAT experience"
      activePath="/tickets"
    >
      
      {/* Tickets Section */}
      <Section>
        <Container>
          <TicketsGrid>
            {/* Student Ticket */}
            <TicketCard>
              <TicketHeader>
                <TicketCategory>Student</TicketCategory>
                <TicketTier><span>Early Bird</span></TicketTier>
                <TicketPrice>£99 <span>/ 3 days</span></TicketPrice>
              </TicketHeader>
              
              <TicketContent>
                <TicketFeatures>
                  <li>Full 3-day access to all keynotes</li>
                  <li>Access to breakout sessions</li>
                  <li>Event materials</li>
                  <li>Coffee breaks & refreshments</li>
                  <li>Networking opportunities</li>
                </TicketFeatures>
                
                <DailyPricing>
                  <strong>1-day option:</strong> £39
                </DailyPricing>
                
                <Button as="a" href="https://buy.stripe.com/test_00g5na70o5D7eIg145" target="_blank" rel="noopener" primary>Buy Student Pass</Button>
              </TicketContent>
            </TicketCard>
            
            {/* Academic Ticket - Featured */}
            <TicketCard featured>
              <TicketHeader>
                <TicketCategory>Academic / Researcher</TicketCategory>
                <TicketTier><span>Early Bird</span></TicketTier>
                <TicketPrice>£139 <span>/ 3 days</span></TicketPrice>
              </TicketHeader>
              
              <TicketContent>
                <TicketFeatures>
                  <li>Full 3-day access to all keynotes</li>
                  <li>Access to breakout sessions</li>
                  <li>Event materials</li>
                  <li>Coffee breaks & refreshments</li>
                  <li>Networking opportunities</li>
                  <li>Access to research workshops</li>
                  <li>Digital proceedings access</li>
                </TicketFeatures>
                
                <DailyPricing>
                  <strong>1-day option:</strong> £55
                </DailyPricing>
                
                <Button as="a" href="https://buy.stripe.com/test_00g5na70o5D7eIg145" target="_blank" rel="noopener" primary>Buy Academic Pass</Button>
              </TicketContent>
            </TicketCard>
            
            {/* General Ticket */}
            <TicketCard>
              <TicketHeader>
                <TicketCategory>General</TicketCategory>
                <TicketTier><span>Early Bird</span></TicketTier>
                <TicketPrice>£249 <span>/ 3 days</span></TicketPrice>
              </TicketHeader>
              
              <TicketContent>
                <TicketFeatures>
                  <li>Full 3-day access to all keynotes</li>
                  <li>Access to breakout sessions</li>
                  <li>Event materials</li>
                  <li>Coffee breaks & refreshments</li>
                  <li>Networking opportunities</li>
                  <li>Invitation to evening social events</li>
                  <li>Exhibition access</li>
                </TicketFeatures>
                
                <DailyPricing>
                  <strong>1-day option:</strong> £95
                </DailyPricing>
                
                <Button as="a" href="https://buy.stripe.com/test_00g5na70o5D7eIg145" target="_blank" rel="noopener" primary>Buy General Pass</Button>
              </TicketContent>
            </TicketCard>
          </TicketsGrid>
          
          <TicketsGrid style={{ marginTop: '3rem' }}>
            {/* Pro Pass */}
            <TicketCard>
              <TicketHeader>
                <TicketCategory>Pro Pass</TicketCategory>
                <TicketTier><span>Limited Availability</span></TicketTier>
                <TicketPrice>£349 <span>/ 3 days</span></TicketPrice>
              </TicketHeader>
              
              <TicketContent>
                <TicketFeatures>
                  <li>All General pass features</li>
                  <li>THAT merchandise bundle</li>
                  <li>Priority seating in keynotes</li>
                  <li>Fast-track registration</li>
                  <li>Exclusive lounges access</li>
                  <li>Speaker networking session</li>
                </TicketFeatures>
                
                <Button as="a" href="https://buy.stripe.com/test_00g5na70o5D7eIg145" target="_blank" rel="noopener" primary>Buy Pro Pass</Button>
              </TicketContent>
            </TicketCard>
            
            {/* VIP Ticket */}
            <TicketCard>
              <TicketHeader>
                <TicketCategory>VIP</TicketCategory>
                <TicketTier><span>Very Limited</span></TicketTier>
                <TicketPrice>£795 <span>/ 3 days</span></TicketPrice>
              </TicketHeader>
              
              <TicketContent>
                <TicketFeatures>
                  <li>All Pro pass features</li>
                  <li>Invitation to speaker dinner</li>
                  <li>Private meeting room access</li>
                  <li>Premium lounge access</li>
                  <li>Personalized event concierge</li>
                  <li>Exclusive VIP events</li>
                  <li>Post-event recordings</li>
                </TicketFeatures>
                
                <Button as="a" href="https://buy.stripe.com/test_00g5na70o5D7eIg145" target="_blank" rel="noopener" primary>Buy VIP Pass</Button>
              </TicketContent>
            </TicketCard>
            
            {/* Digital Pass */}
            <TicketCard>
              <TicketHeader>
                <TicketCategory>Digital</TicketCategory>
                <TicketTier><span>Remote Access</span></TicketTier>
                <TicketPrice>£49</TicketPrice>
              </TicketHeader>
              
              <TicketContent>
                <TicketFeatures>
                  <li>Livestream of all keynotes</li>
                  <li>Access to session recordings</li>
                  <li>Digital event materials</li>
                  <li>Online Q&A participation</li>
                  <li>Digital networking opportunities</li>
                </TicketFeatures>
                
                <Button as="a" href="https://buy.stripe.com/test_00g5na70o5D7eIg145" target="_blank" rel="noopener" primary>Buy Digital Pass</Button>
              </TicketContent>
            </TicketCard>
          </TicketsGrid>
          
          <InfoSection>
            <InfoTitle>Additional Information</InfoTitle>
            <InfoGrid>
              <InfoItem>
                <h4>Group Discounts</h4>
                <p>Groups of 5+ receive a 10% discount on the total price. Contact us for custom group packages.</p>
                <p><a href="mailto:tickets@thinkingaboutthinking.org">tickets@thinkingaboutthinking.org</a></p>
              </InfoItem>
              
              <InfoItem>
                <h4>Student Verification</h4>
                <p>Valid student ID will be required at check-in for student tickets.</p>
              </InfoItem>
              
              <InfoItem>
                <h4>Refund Policy</h4>
                <p>Full refunds available up to 30 days before the event. 50% refund up to 14 days before. No refunds after that, but tickets are transferable.</p>
              </InfoItem>
              
              <InfoItem>
                <h4>Tax & Invoicing</h4>
                <p>All prices include VAT. Invoices available upon request for business purchases.</p>
              </InfoItem>
            </InfoGrid>
          </InfoSection>
          
          <ButtonGroup style={{ marginTop: '3rem' }}>
            <Button as="a" href="mailto:tickets@thinkingaboutthinking.org">
              Group Booking Inquiries
            </Button>
            <Button as="a" href="https://formspree.io/f/mvgqvezg" target="_blank" rel="noopener">
              Sign Up for Updates
            </Button>
            <Button as={Link} to="/" primary>
              Back to Homepage
            </Button>
          </ButtonGroup>
        </Container>
      </Section>
      
    </PageTemplate>
  );
};

export default TicketsPage;