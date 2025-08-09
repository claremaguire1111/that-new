import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  PageTemplate,
  Section,
  Container,
  Flex,
  Button,
  glassEffect
} from '../components/PageTemplate';

// Speakers Grid
const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
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
  
  // Placeholder when image is missing
  ${props => !props.src && css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("/images/misc/speaker_cards.jpg");
    
    &::after {
      content: '${props.name || 'Speaker'}';
      font-weight: 500;
      color: ${props.theme.colors.textSecondary};
      background: rgba(0,0,0,0.7);
      padding: 5px 10px;
      border-radius: 4px;
    }
  `}
`;

const SpeakerInfo = styled.div`
  padding: 1.25rem;
`;

const SpeakerName = styled.h4`
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

const CategoryTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  margin-top: 3rem;
  position: relative;
  padding-bottom: 0.75rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 2px;
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.2)' : '#DDDDDD'};
  }
`;

// Filter components
const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: ${props => props.theme.radii.md};
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#F9F9F9'};
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE'};
  align-items: center;
  justify-content: center;
`;

const FilterTag = styled.button`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.radii.sm};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.active 
    ? props.theme.isDark 
      ? 'rgba(255, 255, 255, 0.2)' 
      : '#202123'
    : props.theme.isDark 
      ? 'rgba(255, 255, 255, 0.05)'
      : '#EEEEEE'
  };
  color: ${props => props.active 
    ? props.theme.isDark 
      ? '#FFFFFF'
      : '#FFFFFF'
    : props.theme.colors.text
  };
  
  &:hover {
    background-color: ${props => props.active 
      ? props.theme.isDark 
        ? 'rgba(255, 255, 255, 0.25)'
        : '#333333' 
      : props.theme.isDark 
        ? 'rgba(255, 255, 255, 0.1)'
        : '#DDDDDD'
    };
  }
`;

// Day 1 Speakers
const day1Speakers = [
  {
    name: "Dr David Silver",
    title: "Principal Research Scientist",
    company: "DeepMind",
    image: "/images/speakers/DrDavidSilver.jpg",
    category: "AI Research"
  },
  {
    name: "Dr Raia Hadsell",
    title: "VP of Research",
    company: "DeepMind",
    image: "/images/speakers/DrRaiaHadsell.jpg",
    category: "AI Research"
  },
  {
    name: "Prof. Jakob Foerster",
    title: "Senior Tech Lead",
    company: "Meta & Oxford",
    image: "/images/speakers/ProfJakobFoerster.jpg",
    category: "AI Research"
  },
  {
    name: "Dr Jonathan Richard Schwarz",
    title: "Head of AI Research",
    company: "Thomson Reuters",
    image: "/images/speakers/DrJonathanRichardSchwarz.jpg",
    category: "Industry"
  },
  {
    name: "Dr Lion Schulz",
    title: "Head of Machine Learning",
    company: "Bertelsmann",
    image: "/images/speakers/DrLionSchulz.jpg",
    category: "Industry"
  },
  {
    name: "Max Beverton-Palmer",
    title: "Head of Public Policy",
    company: "NVIDIA",
    image: "/images/speakers/MaxBeverton_Palmer.jpg",
    category: "Policy"
  },
  {
    name: "Karl Havard",
    title: "CCO",
    company: "NSCALE",
    image: "/images/speakers/KarlHavard.jpg",
    category: "Industry"
  },
  {
    name: "Mark Bjornsgaard",
    title: "Founder & CIO",
    company: "DeepGreen",
    image: "/images/speakers/MarkBjornsgaard.jpg",
    category: "Entrepreneurship"
  }
];

// Day 2 Speakers
const day2Speakers = [
  {
    name: "Prof. Chris Summerfield",
    title: "Research Director & Professor",
    company: "AISI & Oxford",
    image: "/images/speakers/ProfChrisSummerfield.webp",
    category: "AI Research"
  },
  {
    name: "Dr Samuel Bell",
    title: "AI Research Scientist",
    company: "Meta",
    image: "/images/speakers/DrSamuelBell.jpg",
    category: "AI Research"
  },
  {
    name: "Prof. Skyler Wang",
    title: "Assistant Professor & Research Scientist",
    company: "McGill & Meta",
    image: "/images/speakers/ProfSkylerWang.jpg",
    category: "AI Research"
  },
  {
    name: "Dr Marius Hobbhahn",
    title: "Director & Co-Founder",
    company: "Apollo Research",
    image: "/images/speakers/DrMariusHobbhahn.jpg",
    category: "AI Safety"
  },
  {
    name: "David Sully",
    title: "CEO & Co-Founder",
    company: "ADVAI",
    image: "/images/speakers/DavidSully.jpg",
    category: "Entrepreneurship"
  },
  {
    name: "Ashley Ramrachia",
    title: "Founder and CEO",
    company: "Academy",
    image: "/images/speakers/AshleyRamrachia.jpg",
    category: "Entrepreneurship"
  },
  {
    name: "Dr Jakob Mökander",
    title: "Director",
    company: "Tony Blair Institute",
    image: "/images/speakers/DrJakobMökander.jpg",
    category: "Policy"
  },
  {
    name: "Julian Von Nehammer",
    title: "Director",
    company: "Lilt",
    image: "/images/speakers/JulianVonNehammer.jpg",
    category: "Industry"
  }
];

// Day 3 Speakers
const day3Speakers = [
  {
    name: "Dr Irina Jurenka",
    title: "Research Lead",
    company: "DeepMind",
    image: "/images/speakers/DrIrinaJurenka.jpg",
    category: "AI Research"
  },
  {
    name: "Pete Hill",
    title: "Co-Founder",
    company: "Cudo",
    image: "/images/speakers/PeteHIll.jpg",
    category: "Entrepreneurship"
  },
  {
    name: "Dr Trias Gkikopoulos",
    title: "Innovation Lead - Robotics & AI",
    company: "Innovate UK",
    image: "/images/speakers/DrTriasGkikopoulos.jpg",
    category: "Policy"
  },
  {
    name: "Erwann Le Lannou",
    title: "Ventures",
    company: "XTX Markets",
    image: "/images/speakers/ErwannLeLannou.jpg",
    category: "Industry"
  },
  {
    name: "Timo Hannay",
    title: "Entrepreneur",
    company: "Project X",
    image: "/images/speakers/TimoHannay.jpg",
    category: "Entrepreneurship"
  },
  {
    name: "Dr Lucinda Scharff",
    title: "Staff Clinical Specialist",
    company: "Google Health",
    image: "/images/speakers/DrLucindaScharff.jpg",
    category: "Industry"
  },
  {
    name: "Li-Lian Ang",
    title: "Product Manager",
    company: "BlueDot Impact",
    image: "/images/speakers/LiLianAng.jpg",
    category: "AI Safety"
  },
  {
    name: "Rehana Al-Soltane",
    title: "Learning Manager",
    company: "Raspberry Pi Foundation",
    image: "/images/speakers/RehanaAlSoltane.jpg",
    category: "Education"
  }
];

// All categories
const categories = [
  'All', 
  'AI Research', 
  'Industry', 
  'Entrepreneurship', 
  'Policy', 
  'AI Safety',
  'Education'
];

const SpeakersPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filter speakers based on the active category
  const filterSpeakers = (speakers) => {
    if (activeCategory === 'All') {
      return speakers;
    }
    
    return speakers.filter(speaker => speaker.category === activeCategory);
  };
  
  return (
    <PageTemplate 
      title="Speakers" 
      subtitle="Meet our distinguished lineup of speakers from academia, industry, and policy"
      activePage="/speakers"
    >
      <Section>
        <Container>
          {/* Category filters */}
          <FilterBar>
            {categories.map(category => (
              <FilterTag 
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </FilterTag>
            ))}
          </FilterBar>
          
          {/* Day 1 Speakers */}
          <CategoryTitle>Day 1: New Algorithmic Breakthroughs and AI Infrastructure</CategoryTitle>
          <SpeakersGrid>
            {filterSpeakers(day1Speakers).map((speaker, index) => (
              <SpeakerCard key={index}>
                <SpeakerImage 
                  src={speaker.image}
                  name={speaker.name}
                />
                <SpeakerInfo>
                  <SpeakerName>{speaker.name}</SpeakerName>
                  <SpeakerTitle>{speaker.title}</SpeakerTitle>
                  <SpeakerCompany>{speaker.company}</SpeakerCompany>
                </SpeakerInfo>
              </SpeakerCard>
            ))}
          </SpeakersGrid>
          
          {/* Day 2 Speakers */}
          <CategoryTitle>Day 2: AI Safety, and AI in Enterprise & Society</CategoryTitle>
          <SpeakersGrid>
            {filterSpeakers(day2Speakers).map((speaker, index) => (
              <SpeakerCard key={index}>
                <SpeakerImage 
                  src={speaker.image}
                  name={speaker.name}
                />
                <SpeakerInfo>
                  <SpeakerName>{speaker.name}</SpeakerName>
                  <SpeakerTitle>{speaker.title}</SpeakerTitle>
                  <SpeakerCompany>{speaker.company}</SpeakerCompany>
                </SpeakerInfo>
              </SpeakerCard>
            ))}
          </SpeakersGrid>
          
          {/* Day 3 Speakers */}
          <CategoryTitle>Day 3: AI Entrepreneurship & Application</CategoryTitle>
          <SpeakersGrid>
            {filterSpeakers(day3Speakers).map((speaker, index) => (
              <SpeakerCard key={index}>
                <SpeakerImage 
                  src={speaker.image}
                  name={speaker.name}
                />
                <SpeakerInfo>
                  <SpeakerName>{speaker.name}</SpeakerName>
                  <SpeakerTitle>{speaker.title}</SpeakerTitle>
                  <SpeakerCompany>{speaker.company}</SpeakerCompany>
                </SpeakerInfo>
              </SpeakerCard>
            ))}
          </SpeakersGrid>
        </Container>
      </Section>
    </PageTemplate>
  );
};

export default SpeakersPage;