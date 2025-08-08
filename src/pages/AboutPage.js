import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  PageTemplate,
  Section,
  Container,
  Button,
  ButtonGroup,
  glassEffect
} from '../components/PageTemplate';

const AboutSection = styled.div`
  margin-bottom: 5rem;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
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
`;

const MissionStatement = styled.div`
  padding: 2.5rem;
  border-radius: 16px;
  margin: 3rem 0;
  text-align: center;
  
  ${props => props.theme.isDark ? css`
    ${glassEffect}
    border: 1px solid rgba(255, 255, 255, 0.05);
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  text-align: center;
  
  .photo {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 1.5rem auto;
    filter: ${props => props.theme.isDark ? 'none' : 'grayscale(100%)'};
    transition: filter 0.3s ease;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  
  &:hover {
    .photo {
      filter: none;
      
      img {
        transform: scale(1.05);
      }
    }
  }
  
  h4 {
    margin-bottom: 0.5rem;
  }
  
  .title {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9375rem;
    margin-bottom: 1rem;
  }
  
  .bio {
    font-size: 0.9375rem;
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
    ${glassEffect}
    border: 1px solid rgba(255, 255, 255, 0.05);
  ` : css`
    background-color: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  `}
  
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

// Team members data
const teamMembers = [
  {
    name: "Dr. Jane Smith",
    title: "Executive Director",
    photo: "/images/speakers/DrIrinaJurenka.jpg", // Using speaker images as placeholders
    bio: "Jane has over 15 years of experience in AI research and leads the strategic direction of THAT Summit."
  },
  {
    name: "Michael Johnson",
    title: "Program Director",
    photo: "/images/speakers/DrJonathanRichardSchwarz.jpg",
    bio: "Michael oversees the summit program and speaker selection, ensuring diverse perspectives and cutting-edge content."
  },
  {
    name: "Sarah Williams",
    title: "Partnerships Manager",
    photo: "/images/speakers/DrLucindaScharff.jpg",
    bio: "Sarah builds relationships with sponsors and partners to make THAT Summit possible."
  },
  {
    name: "Dr. David Chen",
    title: "AI Research Advisor",
    photo: "/images/speakers/DrSamuelBell.jpg",
    bio: "David provides technical expertise and helps identify emerging trends and research breakthroughs."
  },
  {
    name: "Emily Rodriguez",
    title: "Community Engagement",
    photo: "/images/speakers/LiLianAng.jpg",
    bio: "Emily leads our efforts to build and nurture the THAT community throughout the year."
  },
  {
    name: "James Wilson",
    title: "Operations Manager",
    photo: "/images/speakers/ErwannLeLannou.jpg",
    bio: "James ensures that all aspects of the summit run smoothly from registration to venue logistics."
  }
];

const AboutPage = () => {
  return (
    <PageTemplate 
      title="About THAT Summit" 
      subtitle="Our mission, team, and the story behind Thinking About Thinking"
      activePage="/about"
    >
      <Section>
        <Container>
          <AboutSection>
            <AboutGrid>
              <div>
                <h2>Our Story</h2>
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
            <h2 style={{ marginBottom: '2.5rem' }}>Our Values</h2>
            
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
            <h2 style={{ marginBottom: '2.5rem' }}>Meet Our Team</h2>
            
            <TeamGrid>
              {teamMembers.map((member, index) => (
                <TeamMember key={index}>
                  <div className="photo">
                    <img src={member.photo} alt={member.name} />
                  </div>
                  <h4>{member.name}</h4>
                  <div className="title">{member.title}</div>
                  <p className="bio">{member.bio}</p>
                </TeamMember>
              ))}
            </TeamGrid>
          </AboutSection>
          
          <AboutSection>
            <h2 style={{ marginBottom: '1.5rem' }}>About Thinking About Thinking, Inc.</h2>
            <p>
              THAT Summit is organized by Thinking About Thinking, Inc., a 501(c)3 nonprofit organization dedicated to advancing public understanding of artificial intelligence and cognitive science. Founded in 2018, our organization supports research, education, and public discourse on topics related to human and artificial intelligence.
            </p>
            <p>
              In addition to the annual THAT Summit, we run educational programs, publish research, and collaborate with academic and industry partners on projects that explore the frontiers of AI and its implications for society.
            </p>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <ButtonGroup>
                <Button as={Link} to="/tickets" primary>
                  Get Tickets
                </Button>
                <Button as={Link} to="/media">
                  Partner With Us
                </Button>
              </ButtonGroup>
            </div>
          </AboutSection>
        </Container>
      </Section>
    </PageTemplate>
  );
};

export default AboutPage;