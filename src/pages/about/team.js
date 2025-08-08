import React from 'react';
import styled, { css } from 'styled-components';
import { PageLayout, Section, Container } from '../../components/PageLayout';

// Styling
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
`;

// Team members data
const executiveTeam = [
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
  }
];

const operationsTeam = [
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

const advisoryBoard = [
  {
    name: "Prof. Lisa Wong",
    title: "Professor of AI Ethics",
    photo: "/images/speakers/RehanaAlSoltane.jpg",
    bio: "Lisa advises on ethical considerations and responsible AI development practices."
  },
  {
    name: "Dr. Robert Miller",
    title: "Chief Scientist",
    photo: "/images/speakers/ProfJakobFoerster.jpg",
    bio: "Robert brings technical expertise from his work at the intersection of academia and industry."
  },
  {
    name: "Amanda Brown",
    title: "Policy Director",
    photo: "/images/speakers/DrRaiaHadsell.jpg",
    bio: "Amanda helps navigate the complex regulatory landscape of AI policy and governance."
  }
];

const TeamPage = () => {
  return (
    <PageLayout 
      title="Our Team" 
      subtitle="Meet the people behind THAT Summit" 
      activePath="/about/team"
      smallHeading="About THAT"
    >
      <Section>
        <Container>
          <TeamSection>
            <SectionHeading>Executive Team</SectionHeading>
            
            <TeamGrid>
              {executiveTeam.map((member, index) => (
                <TeamMember key={index}>
                  <div className="photo">
                    <img src={member.photo} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <div className="title">{member.title}</div>
                  <p className="bio">{member.bio}</p>
                </TeamMember>
              ))}
            </TeamGrid>
          </TeamSection>
          
          <TeamSection>
            <SectionHeading>Operations Team</SectionHeading>
            
            <TeamGrid>
              {operationsTeam.map((member, index) => (
                <TeamMember key={index}>
                  <div className="photo">
                    <img src={member.photo} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <div className="title">{member.title}</div>
                  <p className="bio">{member.bio}</p>
                </TeamMember>
              ))}
            </TeamGrid>
          </TeamSection>
          
          <AdvisoryBoard>
            <SectionHeading>Advisory Board</SectionHeading>
            
            <TeamGrid>
              {advisoryBoard.map((member, index) => (
                <TeamMember key={index}>
                  <div className="photo">
                    <img src={member.photo} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <div className="title">{member.title}</div>
                  <p className="bio">{member.bio}</p>
                </TeamMember>
              ))}
            </TeamGrid>
          </AdvisoryBoard>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ maxWidth: '800px', margin: '0 auto 2rem auto' }}>
              Our team is supported by a dedicated group of volunteers and temporary staff who help make THAT Summit a success each year. We're grateful for their contributions and commitment to our mission.
            </p>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default TeamPage;