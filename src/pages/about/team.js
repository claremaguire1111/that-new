import React from 'react';
import styled, { css } from 'styled-components';
import { SharedLayout, Container, glassEffect } from '../../components/SharedLayout';

// Styling
const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  
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
    transition: all 0.3s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    
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
  
  h3 {
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

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.2)' : '#DDDDDD'};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

const TeamSection = styled.div`
  margin-bottom: 5rem;
`;

const AdvisoryBoard = styled.div`
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 4rem;
  
  ${props => props.theme.isDark ? glassEffect : css`
    background-color: #F9F9F9;
    border: 1px solid #EEEEEE;
  `}
`;

// Team members data
const executiveTeam = [
  {
    name: "Dr. Ruairidh McLennan Battleday",
    title: "President & Research Scientist",
    company: "Thinking About Thinking",
    affiliation: "Harvard & MIT",
    photo: "/images/speakers/DrRuairidhMcLennanBattleday.jpg",
    bio: "Dr. Battleday leads Thinking About Thinking with a focus on advancing our understanding of artificial and human intelligence. His research spans computational neuroscience, machine learning, and cognitive science."
  },
  {
    name: "Dr. James Whittington",
    title: "Vice-President & Research Scientist",
    company: "Thinking About Thinking",
    affiliation: "Stanford & Oxford",
    photo: "/images/speakers/DrJamesWhittington.jpg",
    bio: "Dr. Whittington brings expertise in computational neuroscience and AI systems, with particular focus on neural network models of memory and learning. His work bridges theoretical neuroscience and practical AI applications."
  }
];

const TeamPage = () => {
  return (
    <SharedLayout activePath="/about/team">
      <Section>
        <Container>
          <h1 style={{ 
            fontSize: '3.75rem', 
            fontWeight: '700', 
            marginBottom: '1rem', 
            letterSpacing: '-0.03em',
            textAlign: 'center'
          }}>
            Our Team
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '3rem', 
            maxWidth: '800px',
            textAlign: 'center',
            margin: '0 auto 3rem'
          }}>
            Meet the people behind THAT Summit
          </p>
          <TeamSection>
            <SectionHeading>Leadership Team</SectionHeading>
            
            <TeamGrid style={{ maxWidth: '900px', margin: '0 auto' }}>
              {executiveTeam.map((member, index) => (
                <TeamMember key={index}>
                  <div className="photo">
                    <img src={member.photo} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <div className="title">{member.title}</div>
                  <div className="title" style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                    {member.company}
                  </div>
                  <div className="title" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                    {member.affiliation}
                  </div>
                  <p className="bio">{member.bio}</p>
                </TeamMember>
              ))}
            </TeamGrid>
          </TeamSection>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ maxWidth: '800px', margin: '0 auto 2rem auto' }}>
              Thinking About Thinking is an independent research organization and 501(c)3 nonprofit dedicated to advancing our understanding of AI. We organize THAT Summit to bring together leading minds in AI research and application from academia and industry.
            </p>
          </div>
        </Container>
      </Section>
    </SharedLayout>
  );
};

export default TeamPage;