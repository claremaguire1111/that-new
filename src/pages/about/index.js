import React from 'react';
import styled, { css } from 'styled-components';
import { SharedLayout, Container, glassEffect } from '../../components/SharedLayout';
import { Link } from 'react-router-dom';

// Styling
const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const AboutSection = styled.div`
  margin-bottom: 4rem;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.div`
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 300px;
  }
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

const MissionStatement = styled.div`
  padding: 3rem;
  border-radius: 16px;
  margin: 3rem 0;
  text-align: center;
  
  ${props => props.theme.isDark ? glassEffect : css`
    background-color: #F9F9F9;
    border: 1px solid #EEEEEE;
  `}
  
  h3 {
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 1rem;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      left: 25%;
      right: 25%;
      bottom: 0;
      height: 2px;
      background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.2)' : '#DDDDDD'};
    }
  }
  
  p {
    font-size: 1.25rem;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
    font-style: italic;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  
  ${props => props.theme.isDark ? glassEffect : css`
    background-color: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  `}
  
  &:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
  
  .icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 0.9375rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0;
  }
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

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const AboutPage = () => {
  return (
    <SharedLayout activePath="/about">
      <Section>
        <Container>
          <h1 style={{ 
            fontSize: '3.75rem', 
            fontWeight: '700', 
            marginBottom: '1rem', 
            letterSpacing: '-0.03em' 
          }}>
            About THAT Summit
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '3rem', 
            maxWidth: '800px' 
          }}>
            Our mission, team, and the story behind Thinking About Thinking
          </p>
          <AboutSection>
            <AboutGrid>
              <div>
                <SectionHeading>Our Story</SectionHeading>
                <p>
                  THAT Summit began in 2021 as a small gathering of AI researchers and entrepreneurs who wanted to address the open problems in artificial intelligence research and application. What started as an informal meetup has grown into one of the UK's leading AI conferences.
                </p>
                <p>
                  Our focus has always been on fostering meaningful dialogue between academia, industry, and policy makers. We believe that by bringing together diverse perspectives, we can accelerate progress in AI while ensuring it develops in ways that benefit humanity.
                </p>
                <p>
                  Today, THAT Summit attracts participants from around the world who share our commitment to thoughtful, responsible AI innovation. We're proud to create a space where cutting-edge research meets real-world application, and where the most pressing questions about AI's future can be explored.
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}>
                <div style={{
                  backgroundColor: '#F9F9F9',
                  borderRadius: '50%',
                  padding: '2rem',
                  width: '280px',
                  height: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
                }}>
                  <img 
                    src="/images/misc/thatpng.jpg" 
                    alt="THAT Logo" 
                    style={{
                      width: '220px',
                      height: '220px',
                      objectFit: 'contain',
                      filter: 'contrast(1.1)',
                      transform: 'scale(1.2)'
                    }} 
                  />
                </div>
                <h3 style={{
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  fontSize: '1.5rem',
                  textAlign: 'center'
                }}>
                  Thinking About Thinking
                </h3>
                <p style={{
                  fontSize: '1rem',
                  opacity: '0.8',
                  textAlign: 'center'
                }}>
                  Est. 2018 • 501(c)3 Nonprofit
                </p>
              </div>
            </AboutGrid>
          </AboutSection>
          
          <MissionStatement>
            <h3>Our Mission</h3>
            <p>
              "To advance the field of AI through open dialogue, diverse collaboration, and a focus on addressing the most important unsolved problems that will shape our collective future."
            </p>
          </MissionStatement>
          
          <AboutSection>
            <SectionHeading>Our Values</SectionHeading>
            
            <ValuesGrid>
              <ValueCard>
                <h3>Scientific Rigor</h3>
                <p>
                  We believe in evidence-based approaches and rigorous scientific methods. Our content and discussions are grounded in solid research and data.
                </p>
              </ValueCard>
              
              <ValueCard>
                <h3>Responsible Innovation</h3>
                <p>
                  We promote AI development that considers ethical implications, societal impact, and long-term consequences for humanity.
                </p>
              </ValueCard>
              
              <ValueCard>
                <h3>Inclusive Collaboration</h3>
                <p>
                  We bring together diverse perspectives from academia, industry, and policy to address complex challenges through collective intelligence.
                </p>
              </ValueCard>
            </ValuesGrid>
          </AboutSection>
          
          <AboutSection>
            <SectionHeading>About Thinking About Thinking, Inc.</SectionHeading>
            
            <p>
              THAT Summit is organized by Thinking About Thinking, Inc., a 501(c)3 nonprofit organization dedicated to advancing public understanding of artificial intelligence and cognitive science. Founded in 2018, our organization supports research, education, and public discourse on topics related to human and artificial intelligence.
            </p>
            <p>
              In addition to the annual THAT Summit, we run educational programs, publish research, and collaborate with academic and industry partners on projects that explore the frontiers of AI and its implications for society.
            </p>
            
            <ButtonContainer>
              <Button as={Link} to="/about/team" primary>
                Meet Our Team
              </Button>
              <Button as={Link} to="/media">
                Partner With Us
              </Button>
            </ButtonContainer>
          </AboutSection>
          
          <AboutSection>
            <SectionHeading>Summit Structure</SectionHeading>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>AE Global Summit on Open Problems for AI (Oct 28-30th, London)</h3>
            
            <p style={{ marginBottom: '2rem' }}>
              The THAT Summit is structured over three days, each with a distinct focus that together provides a comprehensive view of the AI landscape:
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Day 1: AI Research Breakthroughs</h4>
              <p>
                The first day showcases cutting-edge research and technological breakthroughs in the field of AI. Leading researchers and scientists present their latest findings, methodologies, and innovations.
              </p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Day 2: AI Safety, Enterprise, and Society</h4>
              <p>
                The second day addresses how AI can be safely and effectively implemented in enterprise settings. While Days 1 and 3 focus on research breakthroughs and startups, Day 2 explores how the 97% of people who use AI in enterprise contexts can leverage these technologies.
              </p>
              <p>
                Despite widespread news about AI's potential for enterprise, adoption has not yet generated the widespread value it promises. This stems from a lack of understanding of its capabilities and how to capitalize on them in real-world business settings while mitigating risks.
              </p>
              <p>
                Day 2 discussions focus on how businesses can identify promising AI products, properly assess associated risks, and develop tech transformation strategies to substantially increase productivity and open new areas for development.
              </p>
              
              <div style={{ marginLeft: '1.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
                <p><strong>Session 1: AI Security</strong> - Featuring insights from the UK's world-leading AI security institutions on managing AI risks in enterprise settings.</p>
                <p><strong>Session 2: AI Enterprise Opportunities</strong> - Exploring current AI systems and products for enterprise deployment, addressing pain points, and preparing the workforce for adaptation.</p>
                <p><strong>Session 3: AI & Human Flourishing</strong> - Examining how AI can shape society for the better, sharing success stories, and identifying potential pitfalls to avoid.</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Day 3: AI Entrepreneurship & Application</h4>
              <p>
                The final day profiles world-changing new startups leveraging AI research to create innovative solutions. It showcases practical applications of AI technologies and the entrepreneurial ecosystem driving AI innovation forward.
              </p>
            </div>
          </AboutSection>
        </Container>
      </Section>
    </SharedLayout>
  );
};

export default AboutPage;