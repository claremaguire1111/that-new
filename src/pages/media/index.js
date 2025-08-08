import React from 'react';
import styled, { css } from 'styled-components';
import { PageLayout, Section, Container } from '../../components/PageLayout';
import { Link } from 'react-router-dom';

// Styling
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
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-image: ${props => props.theme.colors.glassGradient};
    border: 1px solid ${props => props.theme.colors.glassBorder};
    box-shadow: ${props => props.theme.colors.glassShadow};
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

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
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
  background-color: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.3)' : '#F9F9F9'};
  
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

const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 1.25rem;
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
  margin: 0 0.5rem 1rem 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, ${props => props.theme.isDark ? 0.2 : 0.1});
    background-color: ${props => props.primary
      ? props.theme.isDark ? '#FFFFFF' : '#333333'
      : props.theme.isDark ? 'rgba(255, 255, 255, 0.15)' : '#E5E5E5'
    };
  }
`;

// Form styling
const FormContainer = styled.div`
  max-width: 800px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
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
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${props => props.theme.isDark ? 'FFFFFF' : '444444'}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;
  padding-right: 2.5rem;
`;

const FormTextarea = styled.textarea`
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
  min-height: 150px;
  resize: vertical;
  
  &::placeholder {
    color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.3)' : '#999999'};
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.isDark ? 'rgba(16, 163, 127, 0.2)' : 'rgba(16, 163, 127, 0.1)'};
  }
`;

const FormPrivacyText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.5)' : '#888888'};
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0;
`;

const MediaPage = () => {
  return (
    <PageLayout 
      title="Media & Community" 
      subtitle="Press resources, media contacts, and partnership opportunities" 
      activePath="/media"
    >
      <Section>
        <Container>
          <MediaSection>
            <SectionHeading>Press & Media Resources</SectionHeading>
            
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
                  
                  <Button as="a" href="mailto:media@thinkingaboutthinking.org" primary>
                    Request Media Pass
                  </Button>
                </div>
              </MediaCard>
            </MediaGrid>
          </MediaSection>
          
          <MediaSection>
            <SectionHeading>Community Partnership</SectionHeading>
            <p>Join our community of partners helping to shape the future of AI. We collaborate with research institutions, industry groups, academic communities, and more.</p>
            
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
              
              <div>
                <Button as="a" href="mailto:partnerships@thinkingaboutthinking.org" primary>
                  Contact Our Partnership Team
                </Button>
                <Button as={Link} to="/sponsors">
                  View Sponsorship Packages
                </Button>
              </div>
            </ContactBox>
          </MediaSection>
          
          <MediaSection>
            <SectionHeading>Partnership Inquiry Form</SectionHeading>
            
            <FormContainer>
              <form action="https://formspree.io/f/mvgqvezg" method="POST">
                <FormRow>
                  <FormGroup>
                    <FormLabel>Organization Name</FormLabel>
                    <FormInput 
                      type="text" 
                      name="organization" 
                      required
                      placeholder="Your organization or community name"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Contact Person</FormLabel>
                    <FormInput 
                      type="text" 
                      name="name" 
                      required
                      placeholder="Full name of primary contact"
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel>Email Address</FormLabel>
                    <FormInput 
                      type="email" 
                      name="email" 
                      required
                      placeholder="Your business email"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Phone Number</FormLabel>
                    <FormInput 
                      type="tel" 
                      name="phone" 
                      placeholder="Your phone number (optional)"
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel>Organization Type</FormLabel>
                    <FormSelect name="org_type">
                      <option value="media">Media Outlet</option>
                      <option value="academic">Academic Institution</option>
                      <option value="community">Community Group</option>
                      <option value="industry">Industry Association</option>
                      <option value="nonprofit">Non-profit Organization</option>
                      <option value="other">Other</option>
                    </FormSelect>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Partnership Interest</FormLabel>
                    <FormSelect name="interest">
                      <option value="media_partner">Media Partnership</option>
                      <option value="community_partner">Community Partnership</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="speaking">Speaking Opportunity</option>
                      <option value="other">Other</option>
                    </FormSelect>
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <FormLabel>Message</FormLabel>
                  <FormTextarea 
                    name="message" 
                    placeholder="Tell us about your organization and how you'd like to partner with THAT Summit"
                  ></FormTextarea>
                </FormGroup>
                
                <div style={{ textAlign: 'center' }}>
                  <Button as="button" type="submit" primary>
                    Submit Inquiry
                  </Button>
                </div>
                
                <FormPrivacyText>
                  We respect your privacy and will never share your information with third parties.
                </FormPrivacyText>
              </form>
            </FormContainer>
          </MediaSection>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default MediaPage;