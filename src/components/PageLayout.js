import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Navigation from './Navigation';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Layout Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding-top: 70px; /* Account for fixed header */
`;

const Section = styled.section`
  padding: 6rem 0;
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 4rem 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 3rem 0;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 1.5rem;
  }
`;

// Hero Section Components
const HeroSection = styled(Section)`
  min-height: 40vh;
  display: flex;
  align-items: center;
  padding-top: 8rem;
  padding-bottom: 4rem;
  overflow: hidden;
  position: relative;
  
  ${props => props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at 50% 30%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.01) 20%,
        transparent 60%
      );
      pointer-events: none;
    }
  `}
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-out;
`;

const SmallHeading = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.875rem;
  }
`;

const MainHeading = styled.h1`
  font-size: 3.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
  background: ${props => props.theme.isDark ? 'linear-gradient(135deg, #FFFFFF 0%, #AAAAAA 100%)' : 'none'};
  -webkit-background-clip: ${props => props.theme.isDark ? 'text' : 'none'};
  -webkit-text-fill-color: ${props => props.theme.isDark ? 'transparent' : 'inherit'};
  position: relative;
  
  ${props => props.theme.isDark && css`
    &::after {
      content: attr(data-text);
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: blur(8px);
      opacity: 0.6;
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const SubHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

// Footer Components
const Footer = styled.footer`
  background-color: ${props => props.theme.isDark ? 'rgba(13, 13, 19, 0.5)' : '#F1F1F1'};
  color: ${props => props.theme.colors.text};
  padding: 3rem 0;
  position: relative;
  
  ${props => props.theme.isDark && css`
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  `}
`;

const FooterText = styled.p`
  margin-bottom: 1.5rem;
  max-width: 400px;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9375rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#E5E5E5'};
  margin-top: 2rem;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  color: ${props => props.theme.colors.textSecondary};
  
  &:hover {
    color: ${props => props.theme.colors.text};
    opacity: 1;
    transform: translateY(-2px);
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.textSecondary};
`;

// Stars background for dark mode
const StarsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  display: ${props => props.theme.isDark ? 'block' : 'none'};
`;

const Star = styled.div`
  position: absolute;
  background-color: #ffffff;
  width: ${props => props.size || '2px'};
  height: ${props => props.size || '2px'};
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  opacity: ${props => props.opacity || 0.5};
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 70%);
    opacity: 0.3;
  }
`;

// Generate stars for dark mode
const generateStars = (count) => {
  const stars = [];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 1 + 'px';
    stars.push(
      <Star 
        key={`star-${i}`}
        size={size}
        top={`${Math.random() * 100}%`}
        left={`${Math.random() * 100}%`}
        opacity={Math.random() * 0.5 + 0.2}
      />
    );
  }
  
  return stars;
};

const PageLayout = ({ 
  children, 
  title, 
  subtitle, 
  activePath,
  smallHeading = "October 28-30, 2025"
}) => {
  return (
    <PageContainer>
      {/* Stars Background for Dark Mode */}
      <StarsContainer>
        {generateStars(200)}
      </StarsContainer>
      
      <Navigation activePath={activePath} />
      
      <Main>
        <HeroSection>
          <Container>
            <HeroContent>
              <SmallHeading>{smallHeading}</SmallHeading>
              <MainHeading data-text={title}>{title}</MainHeading>
              <SubHeading>{subtitle}</SubHeading>
            </HeroContent>
          </Container>
        </HeroSection>
        
        {children}
      </Main>
      
      <Footer>
        <Container>
          <FooterText>Brought to you by Thinking About Thinking, Inc.<br />A 501(c)3 Nonprofit Company in the State of New Jersey.<br /><br />28 Spring Street, Unit 156, Princeton, NJ, USA, 08540</FooterText>
          
          <FooterBottom>
            <Copyright>© 2025 THAT. All rights reserved.</Copyright>
            
            <SocialLinks>
              <SocialLink href="https://www.youtube.com/@ThoughtChannel" target="_blank" rel="noopener noreferrer">YouTube</SocialLink>
              <SocialLink href="https://www.linkedin.com/company/thinking-about-thinking-inc/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
              <SocialLink href="https://x.com/thought_channel" target="_blank" rel="noopener noreferrer">Twitter</SocialLink>
              <SocialLink href="https://www.instagram.com/thoughts_channel" target="_blank" rel="noopener noreferrer">Instagram</SocialLink>
            </SocialLinks>
          </FooterBottom>
        </Container>
      </Footer>
    </PageContainer>
  );
};

export { PageLayout, Section, Container, SmallHeading, MainHeading, SubHeading };