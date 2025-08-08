import React from 'react';
import styled, { css } from 'styled-components';
import { PageLayout, Section, Container } from '../../components/PageLayout';
import { Link } from 'react-router-dom';

// Styling
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
  
  ${props => props.theme.isDark ? css`
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-image: ${props => props.theme.colors.glassGradient};
    border: 1px solid ${props => props.theme.colors.glassBorder};
    box-shadow: ${props => props.theme.colors.glassShadow};
  ` : css`
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
    <PageLayout 
      title="About THAT Summit" 
      subtitle="Our mission, team, and the story behind Thinking About Thinking" 
      activePath="/about"
    >
      <Section>
        <Container>
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
              
              <AboutImage>
                <img src="/images/breakout_rooms/Screenshot 2025-08-03 at 23.27.24.png" alt="THAT Summit venue" />
              </AboutImage>
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
                <div className="icon">🔍</div>
                <h3>Scientific Rigor</h3>
                <p>
                  We believe in evidence-based approaches and rigorous scientific methods. Our content and discussions are grounded in solid research and data.
                </p>
              </ValueCard>
              
              <ValueCard>
                <div className="icon">🌍</div>
                <h3>Responsible Innovation</h3>
                <p>
                  We promote AI development that considers ethical implications, societal impact, and long-term consequences for humanity.
                </p>
              </ValueCard>
              
              <ValueCard>
                <div className="icon">🤝</div>
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
        </Container>
      </Section>
    </PageLayout>
  );
};

export default AboutPage;