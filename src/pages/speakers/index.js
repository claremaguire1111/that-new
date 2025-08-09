import React from 'react';
import styled, { css } from 'styled-components';
import { PageLayout, Section, Container } from '../../components/PageLayout';
import { Link } from 'react-router-dom';

// Glass effect styling from App.js
const glassEffect = css`
  background: ${props => props.theme.colors.glassEffect};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-image: ${props => props.theme.colors.glassGradient};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  box-shadow: ${props => props.theme.colors.glassShadow};
  position: relative;
  overflow: hidden;
`;

// Styling
const SpeakersHero = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto 4rem;
`;

const HeroDescription = styled.div`
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
`;

const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;

const SpeakerCard = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.radii.md};
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#EEEEEE'};
  
  ${props => props.theme.isDark && css`
    ${glassEffect}
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px ${props => props.theme.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
    
    ${props => `
      & > div:first-child {
        filter: ${props.theme.isDark ? 'none' : 'grayscale(70%)'};
      }
    `}
  }
`;

const SpeakerImage = styled.div`
  height: 200px;
  background-color: ${props => props.theme.isDark ? '#16161D' : '#F5F5F5'};
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
  filter: ${props => props.theme.isDark ? 'none' : 'grayscale(100%)'};
  transition: filter 0.3s ease;
`;

const SpeakerInfo = styled.div`
  padding: 1.25rem;
`;

const SpeakerName = styled.h3`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const SpeakerTitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.25rem;
  line-height: 1.4;
`;

const SpeakerCompany = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 2px;
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.2)' : '#DDDDDD'};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

const DayTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const DaySubtitle = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

// Speaker data
const day1Speakers = [
  {
    name: "Dr David Silver",
    title: "Principal Research Scientist",
    company: "DeepMind",
    image: "/images/speakers/DrDavidSilver.jpg"
  },
  {
    name: "Dr Raia Hadsell",
    title: "VP of Research",
    company: "DeepMind",
    image: "/images/speakers/DrRaiaHadsell.jpg"
  },
  {
    name: "Prof. Jakob Foerster",
    title: "Senior Tech Lead",
    company: "Meta & Oxford",
    image: "/images/speakers/ProfJakobFoerster.jpg"
  },
  {
    name: "Dr Jonathan Richard Schwarz",
    title: "Head of AI Research",
    company: "Thomson Reuters",
    image: "/images/speakers/DrJonathanRichardSchwarz.jpg"
  },
  {
    name: "Dr Lion Schulz",
    title: "Head of Machine Learning",
    company: "Bertelsmann",
    image: "/images/speakers/DrLionSchulz.jpg"
  },
  {
    name: "Max Beverton-Palmer",
    title: "Head of Public Policy",
    company: "NVIDIA",
    image: "/images/speakers/MaxBeverton_Palmer.jpg"
  },
  {
    name: "Karl Havard",
    title: "CCO",
    company: "NSCALE",
    image: "/images/speakers/KarlHavard.jpg"
  },
  {
    name: "Mark Bjornsgaard",
    title: "Founder & CIO",
    company: "DeepGreen",
    image: "/images/speakers/MarkBjornsgaard.jpg"
  },
  {
    name: "Dr Joshua Tan",
    title: "Head of Policy",
    company: "Public AI",
    image: "/images/speakers/DrJoshuaTan.jpg"
  },
  {
    name: "Dr James Whittington",
    title: "Vice-President & Research Scientist",
    company: "Thinking About Thinking",
    company2: "Stanford & Oxford",
    image: "/images/speakers/DrJamesWhittington.jpg"
  },
  {
    name: "Dr Ruairidh McLennan Battleday",
    title: "President & Research Scientist",
    company: "Thinking About Thinking",
    company2: "Harvard & MIT",
    image: "/images/speakers/DrRuairidhMcLennanBattleday.jpg"
  },
  {
    name: "Dr Felix Sosa",
    title: "Research Scientist",
    company: "Harvard & MIT",
    image: "/images/speakers/DrFelixSosa.jpg"
  }
];

const day2Speakers = [
  {
    name: "Prof. Chris Summerfield",
    title: "Research Director & Professor",
    company: "AISI & Oxford",
    image: "/images/speakers/ProfChrisSummerfield.webp"
  },
  {
    name: "Dr Samuel Bell",
    title: "AI Research Scientist",
    company: "Meta",
    image: "/images/speakers/DrSamuelBell.jpg"
  },
  {
    name: "Prof. Skyler Wang",
    title: "Assistant Professor & Research Scientist",
    company: "McGill & Meta",
    image: "/images/speakers/ProfSkylerWang.jpg"
  },
  {
    name: "Dr Marius Hobbhahn",
    title: "Director & Co-Founder",
    company: "Apollo Research",
    image: "/images/speakers/DrMariusHobbhahn.jpg"
  },
  {
    name: "David Sully",
    title: "CEO & Co-Founder",
    company: "ADVAI",
    image: "/images/speakers/DavidSully.jpg"
  },
  {
    name: "Ashley Ramrachia",
    title: "Founder and CEO",
    company: "Academy",
    image: "/images/speakers/AshleyRamrachia.jpg"
  },
  {
    name: "Dr Jakob Mökander",
    title: "Director",
    company: "Tony Blair Institute",
    image: "/images/speakers/DrJakobMökander.jpg"
  },
  {
    name: "Julian Von Nehammer",
    title: "Director",
    company: "Lilt",
    image: "/images/speakers/JulianVonNehammer.jpg"
  },
  {
    name: "Dr Kevin Loi-Heng",
    title: "Co-Founder & CEO",
    company: "Avalon Insights",
    image: "/images/speakers/DrKevinLoiHeng.jpg"
  },
  {
    name: "Nicolay Hagen",
    title: "Lecturer",
    company: "NTNU",
    image: "/images/speakers/NicolayHagen.jpg"
  }
];

const day3Speakers = [
  {
    name: "Dr Irina Jurenka",
    title: "Research Lead",
    company: "DeepMind",
    image: "/images/speakers/DrIrinaJurenka.jpg"
  },
  {
    name: "Pete Hill",
    title: "Co-Founder",
    company: "Cudo",
    image: "/images/speakers/PeteHIll.jpg"
  },
  {
    name: "Dr Trias Gkikopoulos",
    title: "Innovation Lead - Robotics & AI",
    company: "Innovate UK",
    image: "/images/speakers/DrTriasGkikopoulos.jpg"
  },
  {
    name: "Erwann Le Lannou",
    title: "Ventures",
    company: "XTX Markets",
    image: "/images/speakers/ErwannLeLannou.jpg"
  },
  {
    name: "Timo Hannay",
    title: "Entrepreneur",
    company: "Project X",
    image: "/images/speakers/TimoHannay.jpg"
  },
  {
    name: "Dr Lucinda Scharff",
    title: "Staff Clinical Specialist",
    company: "Google Health",
    image: "/images/speakers/DrLucindaScharff.jpg"
  },
  {
    name: "Li-Lian Ang",
    title: "Product Manager",
    company: "BlueDot Impact",
    image: "/images/speakers/LiLianAng.jpg"
  },
  {
    name: "Rehana Al-Soltane",
    title: "Learning Manager",
    company: "Raspberry Pi Foundation",
    image: "/images/speakers/RehanaAlSoltane.jpg"
  },
  {
    name: "Prof. Dan Nicolau Jr",
    title: "Professor",
    company: "KCL",
    image: "/images/speakers/ProfDanNicolauJr.jpg"
  }
];

const SpeakersPage = () => {
  return (
    <PageLayout 
      title="Speakers" 
      subtitle="Meet the brilliant minds shaping the future of AI" 
      activePath="/speakers"
    >
      <Section>
        <Container>
          <SpeakersHero>
            <HeroDescription>
              From pioneering researchers to visionary protofounders, we bring the most influential minds in AI to the stage.
              <br /><br />
              In 2025, we're raising the bar — with a lineup that could define the decade.
              <br /><br />
              Meet the thinkers, builders, and leaders shaping the future of artificial intelligence.
            </HeroDescription>
          </SpeakersHero>

          <div>
            <DayTitle>Day 1: Oct 28th</DayTitle>
            <DaySubtitle>New Algorithmic Breakthroughs and AI Infrastructure</DaySubtitle>
            <SpeakersGrid>
              {day1Speakers.map((speaker, index) => (
                <SpeakerCard key={index}>
                  <SpeakerImage src={speaker.image} />
                  <SpeakerInfo>
                    <SpeakerName>{speaker.name}</SpeakerName>
                    <SpeakerTitle>{speaker.title}</SpeakerTitle>
                    <SpeakerCompany>{speaker.company}</SpeakerCompany>
                    {speaker.company2 && <SpeakerCompany>{speaker.company2}</SpeakerCompany>}
                  </SpeakerInfo>
                </SpeakerCard>
              ))}
            </SpeakersGrid>
          </div>
          
          <div style={{ marginTop: '4rem' }}>
            <DayTitle>Day 2: Oct 29th</DayTitle>
            <DaySubtitle>AI Safety, and AI in Enterprise & Society</DaySubtitle>
            <SpeakersGrid>
              {day2Speakers.map((speaker, index) => (
                <SpeakerCard key={index}>
                  <SpeakerImage src={speaker.image} />
                  <SpeakerInfo>
                    <SpeakerName>{speaker.name}</SpeakerName>
                    <SpeakerTitle>{speaker.title}</SpeakerTitle>
                    <SpeakerCompany>{speaker.company}</SpeakerCompany>
                    {speaker.company2 && <SpeakerCompany>{speaker.company2}</SpeakerCompany>}
                  </SpeakerInfo>
                </SpeakerCard>
              ))}
            </SpeakersGrid>
          </div>
          
          <div style={{ marginTop: '4rem' }}>
            <DayTitle>Day 3: Oct 30th</DayTitle>
            <DaySubtitle>AI Entrepreneurship & Application</DaySubtitle>
            <SpeakersGrid>
              {day3Speakers.map((speaker, index) => (
                <SpeakerCard key={index}>
                  <SpeakerImage src={speaker.image} />
                  <SpeakerInfo>
                    <SpeakerName>{speaker.name}</SpeakerName>
                    <SpeakerTitle>{speaker.title}</SpeakerTitle>
                    <SpeakerCompany>{speaker.company}</SpeakerCompany>
                    {speaker.company2 && <SpeakerCompany>{speaker.company2}</SpeakerCompany>}
                  </SpeakerInfo>
                </SpeakerCard>
              ))}
            </SpeakersGrid>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default SpeakersPage;