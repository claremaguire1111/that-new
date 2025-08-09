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
  FormSelect,
  FormLabel,
  FormPrivacyText,
  glassEffect
} from '../components/PageTemplate';

const MediaSection = styled.div`
  margin-bottom: 5rem;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const MediaCard = styled.div`
  padding: 2rem;
  border-radius: 16px;
  height: 100%;
  
  ${props => props.theme.isDark ? css`
    ${glassEffect}
    border: 1px solid rgba(255, 255, 255, 0.05);
  ` : css`
    background-color: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  `}
  
  h3 {
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.75rem;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.2)' : '#DDDDDD'};
    }
  }
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#EEEEEE'};
  }
  
  .icon {
    font-size: 1.5rem;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#F9F9F9'};
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE'};
  
  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
  
  h4 {
    margin-bottom: 0.75rem;
  }
  
  p {
    font-size: 0.9375rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0;
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

const MediaPage = () => {
  return (
    <PageTemplate 
      title="Media & Community" 
      subtitle="Press resources, media contacts, and partnership opportunities"
      activePage="/media"
    >
      <Section>
        <Container>
          <MediaSection>
            <h2 style={{ marginBottom: '2rem' }}>Press & Media Resources</h2>
            
            <MediaGrid>
              <MediaCard>
                <h3>Press Kit</h3>
                <p>Download our press kit for logos, speaker photos, and key event information. For high-resolution images and custom materials, please contact our media team.</p>
                
                <div style={{ marginTop: '2rem' }}>
                  <DownloadLink href="#" download>
                    <span className="icon">📁</span>
                    THAT Summit Press Kit (ZIP)
                  </DownloadLink>
                  <br />
                  <DownloadLink href="#" download>
                    <span className="icon">🖼️</span>
                    Logo Package (PNG/SVG)
                  </DownloadLink>
                  <br />
                  <DownloadLink href="#" download>
                    <span className="icon">📄</span>
                    Press Release (PDF)
                  </DownloadLink>
                </div>
              </MediaCard>
              
              <MediaCard>
                <h3>Media Inquiries</h3>
                <p>For press passes, interview requests, or general media inquiries, please contact our press team. We're happy to facilitate interviews with speakers and organizers.</p>
                
                <div style={{ marginTop: '2rem' }}>
                  <strong>Media Contact</strong>
                  <p>Sarah Johnson<br />
                  Press Relations Manager<br />
                  <a href="mailto:media@thinkingaboutthinking.org">media@thinkingaboutthinking.org</a><br />
                  +44 20 1234 5678</p>
                  
                  <Button as="a" href="mailto:media@thinkingaboutthinking.org" primary style={{ marginTop: '1rem' }}>
                    Request Media Pass
                  </Button>
                </div>
              </MediaCard>
            </MediaGrid>
          </MediaSection>
          
          <MediaSection>
            <h2 style={{ marginBottom: '2rem' }}>Community Partnership</h2>
            <p style={{ maxWidth: '800px', marginBottom: '2rem' }}>
              Join our community of partners helping to shape the future of AI. We collaborate with research institutions, industry groups, academic communities, and more.
            </p>
            
            <BenefitsGrid>
              <BenefitCard>
                <div className="icon">🎯</div>
                <h4>Targeted Reach</h4>
                <p>Connect with a focused audience of AI researchers, entrepreneurs, and decision-makers.</p>
              </BenefitCard>
              
              <BenefitCard>
                <div className="icon">🔄</div>
                <h4>Cross Promotion</h4>
                <p>Mutual promotion across our channels and networks for maximum visibility.</p>
              </BenefitCard>
              
              <BenefitCard>
                <div className="icon">🎟️</div>
                <h4>Event Passes</h4>
                <p>Complimentary passes to THAT Summit for your team or community members.</p>
              </BenefitCard>
            </BenefitsGrid>
            
            <ContactBox>
              <h3>Become a Partner</h3>
              <p>We're looking for media outlets, communities, organizations, and networks who want to support algorithmic innovation and entrepreneurship.</p>
              
              <ButtonGroup>
                <Button as="a" href="mailto:partnerships@thinkingaboutthinking.org" primary>
                  Contact Our Partnership Team
                </Button>
                <Button as={Link} to="/sponsors">
                  View Sponsorship Packages
                </Button>
              </ButtonGroup>
            </ContactBox>
          </MediaSection>
          
          <MediaSection>
            <h2 style={{ marginBottom: '2rem' }}>Partnership Inquiry Form</h2>
            
            <FormContainer>
              <form action="https://formspree.io/f/mvgqvezg" method="POST">
                <div style={{ marginBottom: '1.5rem' }}>
                  <FormLabel>Organization Name</FormLabel>
                  <FormInput 
                    type="text" 
                    name="organization" 
                    required
                    placeholder="Your organization or community name"
                  />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <FormLabel>Contact Person</FormLabel>
                  <FormInput 
                    type="text" 
                    name="name" 
                    required
                    placeholder="Full name of primary contact"
                  />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <FormLabel>Email Address</FormLabel>
                  <FormInput 
                    type="email" 
                    name="email" 
                    required
                    placeholder="Your business email"
                  />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <FormLabel>Organization Type</FormLabel>
                  <FormSelect name="org_type">
                    <option value="media">Media Outlet</option>
                    <option value="academic">Academic Institution</option>
                    <option value="community">Community Group</option>
                    <option value="industry">Industry Association</option>
                    <option value="nonprofit">Non-profit Organization</option>
                    <option value="other">Other</option>
                  </FormSelect>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <FormLabel>Partnership Interest</FormLabel>
                  <FormSelect name="interest">
                    <option value="media_partner">Media Partnership</option>
                    <option value="community_partner">Community Partnership</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="speaking">Speaking Opportunity</option>
                    <option value="other">Other</option>
                  </FormSelect>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <FormLabel>Message</FormLabel>
                  <textarea 
                    name="message" 
                    placeholder="Tell us about your organization and how you'd like to partner with THAT Summit"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#FFFFFF',
                      fontSize: '1rem',
                      minHeight: '150px',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <Button 
                    as="button" 
                    type="submit" 
                    primary
                    style={{
                      padding: '0.9rem 2.5rem',
                      fontSize: '1rem'
                    }}
                  >
                    Submit Inquiry
                  </Button>
                </div>
                
                <FormPrivacyText>
                  We respect your privacy and will never share your information.
                </FormPrivacyText>
              </form>
            </FormContainer>
          </MediaSection>
        </Container>
      </Section>
    </PageTemplate>
  );
};

export default MediaPage;