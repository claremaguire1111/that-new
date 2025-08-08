import React from 'react';
import styled from 'styled-components';
import { PageLayout, Section, Container } from '../../components/PageLayout';
import { Link } from 'react-router-dom';

// Styling
const ComingSoonContainer = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem auto;
`;

const ComingSoonHeading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const ComingSoonText = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.125rem;
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

const TopicsContainer = styled.div`
  background-color: ${props => props.theme.isDark ? 'rgba(32, 33, 35, 0.3)' : '#F9F9F9'};
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 4rem;
`;

const TopicsTitle = styled.h3`
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TopicCard = styled.div`
  background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF'};
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, ${props => props.theme.isDark ? 0.2 : 0.05});
  }
  
  h4 {
    margin-bottom: 0.75rem;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9375rem;
  }
`;

// Form styling
const FormContainer = styled.div`
  max-width: 600px;
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
`;

const FormPrivacyText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.5)' : '#888888'};
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0;
`;

// Topics data
const blogTopics = [
  {
    title: "AI Research",
    description: "In-depth analysis of the latest breakthroughs in artificial intelligence research."
  },
  {
    title: "Industry Applications",
    description: "How AI is transforming industries from healthcare to finance and beyond."
  },
  {
    title: "AI Safety & Ethics",
    description: "Exploring the ethical implications and safety challenges of advanced AI systems."
  },
  {
    title: "Entrepreneurship",
    description: "Stories and insights from founders building AI-powered startups."
  },
  {
    title: "Policy & Regulation",
    description: "Updates on the evolving regulatory landscape for AI technologies."
  },
  {
    title: "Future of Work",
    description: "How AI is reshaping the workplace and creating new opportunities."
  }
];

const BlogPage = () => {
  return (
    <PageLayout 
      title="THAT Blog" 
      subtitle="Insights, news, and trends from the world of AI research and innovation" 
      activePath="/blog"
    >
      <Section>
        <Container>
          <ComingSoonContainer>
            <ComingSoonHeading>Coming Soon</ComingSoonHeading>
            <ComingSoonText>
              We're launching our blog soon with exclusive insights from THAT Summit speakers, partners, and AI industry experts. Join our mailing list to be notified when new content is published.
            </ComingSoonText>
            
            <div>
              <Button as={Link} to="/tickets" primary>
                Get Tickets
              </Button>
              <Button as={Link} to="/speakers">
                Meet Our Speakers
              </Button>
            </div>
          </ComingSoonContainer>
          
          <TopicsContainer>
            <TopicsTitle>Featured Topics We'll Cover</TopicsTitle>
            
            <TopicsGrid>
              {blogTopics.map((topic, index) => (
                <TopicCard key={index}>
                  <h4>{topic.title}</h4>
                  <p>{topic.description}</p>
                </TopicCard>
              ))}
            </TopicsGrid>
          </TopicsContainer>
          
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Subscribe for Updates</h3>
          
          <FormContainer>
            <form action="https://formspree.io/f/mvgqvezg" method="POST">
              <FormGroup>
                <FormLabel>Full Name</FormLabel>
                <FormInput 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormInput 
                  type="email" 
                  name="email" 
                  placeholder="your.email@example.com" 
                  required 
                />
              </FormGroup>
              
              <div style={{ textAlign: 'center' }}>
                <Button as="button" type="submit" primary>
                  Subscribe to Blog
                </Button>
              </div>
              
              <FormPrivacyText>
                We respect your privacy and will never share your information with third parties.
              </FormPrivacyText>
            </form>
          </FormContainer>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default BlogPage;