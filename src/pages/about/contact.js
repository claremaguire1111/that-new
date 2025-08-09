import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { SharedLayout, Container, glassEffect } from '../../components/SharedLayout';

// Styling
const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    margin-bottom: 2rem;
    font-size: 1.125rem;
    line-height: 1.6;
  }
`;

const ContactMethod = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  a {
    color: ${props => props.theme.colors.accent};
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2.5rem;
`;

const SocialIcon = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#F0F0F0'};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    transform: translateY(-3px);
    background-color: ${props => props.theme.colors.accent};
    color: #FFFFFF;
  }
`;

const ContactForm = styled.form`
  padding: 3rem;
  border-radius: 16px;
  ${props => props.theme.isDark ? glassEffect : css`
    background-color: #F9F9F9;
    border: 1px solid #EEEEEE;
  `}
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#E0E0E0'};
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF'};
    color: ${props => props.theme.colors.text};
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.accent};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.accent}30;
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #202123, #444654);
  color: #FFFFFF;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #444654, #202123);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Submit form to Formspree
    const form = e.target;
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/xovlyvpr', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setSubmitting(false);
        setSubmitted(true);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error(error);
      setSubmitting(false);
      alert('There was a problem submitting your form. Please try again.');
    });
  };
  
  return (
    <SharedLayout activePath="/about/contact">
      <Section>
        <Container>
          <h1 style={{ 
            fontSize: '3.75rem', 
            fontWeight: '700', 
            marginBottom: '1rem', 
            letterSpacing: '-0.03em',
            textAlign: 'center'
          }}>
            Contact Us
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '4rem', 
            maxWidth: '800px',
            textAlign: 'center',
            margin: '0 auto 4rem'
          }}>
            Get in touch with the Thinking About Thinking team
          </p>
          
          <ContactWrapper>
            <ContactInfo>
              <h3>Get In Touch</h3>
              <p>
                Whether you have questions about the summit, sponsorship opportunities, 
                or just want to connect with our team, we're here to help.
              </p>
              
              <ContactMethod>
                <h4>Email Us</h4>
                <a href="mailto:hello@thinkingaboutthinking.org">hello@thinkingaboutthinking.org</a>
              </ContactMethod>
              
              <ContactMethod>
                <h4>Visit Us</h4>
                <p>
                  Thinking About Thinking<br />
                  The Strand<br />
                  London, UK
                </p>
              </ContactMethod>
              
              <SocialLinks>
                <SocialIcon href="https://x.com/thought_channel" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/thoughts_channel" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://www.linkedin.com/company/thinking-about-thinking-inc/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </SocialIcon>
              </SocialLinks>
            </ContactInfo>
            
            <ContactForm onSubmit={handleSubmit} action="https://formspree.io/f/xovlyvpr" method="POST">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Thank you!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <FormGroup>
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formState.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formState.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label htmlFor="subject">Subject</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formState.subject} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Sponsorship">Sponsorship Opportunities</option>
                      <option value="Speaker Application">Speaker Application</option>
                      <option value="Press">Press Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormGroup>
                  
                  <FormGroup>
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formState.message} 
                      onChange={handleChange} 
                      required
                    />
                  </FormGroup>
                  
                  {/* Honeypot field to prevent spam */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} />
                  
                  <SubmitButton type="submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </SubmitButton>
                </>
              )}
            </ContactForm>
          </ContactWrapper>
        </Container>
      </Section>
    </SharedLayout>
  );
};

export default ContactPage;