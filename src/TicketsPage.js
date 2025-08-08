import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const TicketTypes = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  border: 2px solid black;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const TicketCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  flex: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  border: ${props => props.featured ? '2px solid black' : '1px solid #eaeaea'};
  position: relative;
  
  ${props => props.featured && `
    transform: scale(1.05);
    
    &:before {
      content: 'MOST POPULAR';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background-color: black;
      color: white;
      padding: 0.25rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 1px;
    }
  `}
  
  @media (max-width: 768px) {
    max-width: 100%;
    ${props => props.featured && `
      transform: scale(1);
      margin: 2rem 0;
    `}
  }
`;

const TicketName = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
`;

const TicketPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1.5rem 0;
  
  span {
    font-size: 1rem;
    font-weight: 400;
    color: #666;
  }
`;

const TicketDescription = styled.p`
  margin-bottom: 1.5rem;
  color: #666;
  min-height: 100px;
`;

const TicketFeatures = styled.ul`
  margin-bottom: 2rem;
  padding-left: 1.25rem;
  
  li {
    margin-bottom: 0.75rem;
    position: relative;
  }
`;

const PurchaseButton = styled.a`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.featured ? 'black' : 'white'};
  color: ${props => props.featured ? 'white' : 'black'};
  border: 2px solid black;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FAQSection = styled.div`
  margin-top: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 1.5rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Question = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const Answer = styled.p`
  color: #666;
  line-height: 1.6;
`;

const TicketsPage = () => {
  const [ticketType, setTicketType] = useState('single'); // 'single' or 'threeDay'
  
  const singleDayTickets = [
    {
      name: "Early Bird",
      price: "£199",
      description: "Limited availability single day ticket at our lowest price.",
      features: [
        "Access to all sessions for one day",
        "Lunch and refreshments",
        "Access to networking events",
        "Digital conference materials"
      ],
      featured: false
    },
    {
      name: "Standard",
      price: "£299",
      description: "Our regular single day ticket for professionals and researchers.",
      features: [
        "Access to all sessions for one day",
        "Lunch and refreshments",
        "Access to networking events",
        "Digital conference materials",
        "Post-event recordings access"
      ],
      featured: true
    },
    {
      name: "VIP",
      price: "£499",
      description: "Premium single day experience with exclusive benefits.",
      features: [
        "Access to all sessions for one day",
        "Premium lunch and refreshments",
        "Priority seating",
        "Exclusive speaker meet & greet",
        "VIP networking reception",
        "Post-event recordings access"
      ],
      featured: false
    }
  ];
  
  const threeDayTickets = [
    {
      name: "Early Bird",
      price: "£499",
      description: "Limited availability full conference ticket at our lowest price.",
      features: [
        "Access to all sessions across three days",
        "Lunch and refreshments daily",
        "Access to all networking events",
        "Digital conference materials"
      ],
      featured: false
    },
    {
      name: "Standard",
      price: "£799",
      description: "Our regular full conference ticket for professionals and researchers.",
      features: [
        "Access to all sessions across three days",
        "Lunch and refreshments daily",
        "Access to all networking events",
        "Digital conference materials",
        "Post-event recordings access"
      ],
      featured: true
    },
    {
      name: "VIP",
      price: "£1,299",
      description: "Premium full conference experience with exclusive benefits.",
      features: [
        "Access to all sessions across three days",
        "Premium lunch and refreshments daily",
        "Priority seating",
        "Exclusive speaker meet & greets",
        "VIP networking receptions",
        "Post-event recordings access",
        "Dinner with keynote speakers"
      ],
      featured: false
    }
  ];
  
  const faqs = [
    {
      question: "When will tickets go on sale?",
      answer: "Tickets will be available for purchase starting September 1, 2025. Early bird pricing will be available for a limited time."
    },
    {
      question: "What's included in the ticket price?",
      answer: "All tickets include access to sessions, lunch, and refreshments. Different ticket tiers offer additional benefits as detailed in the ticket descriptions."
    },
    {
      question: "Is there a student discount?",
      answer: "Yes, we offer a 50% discount for full-time students. Please email your valid student ID to tickets@thatevent.org to receive your discount code."
    },
    {
      question: "What is your refund policy?",
      answer: "Tickets are fully refundable up to 30 days before the event. Within 30 days of the event, tickets are non-refundable but transferable to another attendee."
    },
    {
      question: "Can I upgrade my ticket later?",
      answer: "Yes, you can upgrade your ticket at any time before the event by paying the difference between your current ticket and the upgraded ticket price."
    },
    {
      question: "Is there a group discount?",
      answer: "Yes, we offer a 10% discount for groups of 5 or more. Please email group-tickets@thatevent.org for more information."
    }
  ];
  
  return (
    <PageContainer>
      <Container>
        <PageTitle>Registration</PageTitle>
        <PageSubtitle>
          Secure your spot at THAT 2025, the premier AI summit bringing together leading researchers, 
          policymakers, and entrepreneurs to explore the future of AI innovation.
        </PageSubtitle>
        
        <ToggleContainer>
          <ToggleButton 
            active={ticketType === 'single'} 
            onClick={() => setTicketType('single')}
          >
            Single Day
          </ToggleButton>
          <ToggleButton 
            active={ticketType === 'threeDay'} 
            onClick={() => setTicketType('threeDay')}
          >
            Full Conference (3 Days)
          </ToggleButton>
        </ToggleContainer>
        
        <TicketTypes>
          {(ticketType === 'single' ? singleDayTickets : threeDayTickets).map((ticket, index) => (
            <TicketCard key={index} featured={ticket.featured}>
              <TicketName>{ticket.name}</TicketName>
              <TicketPrice>{ticket.price} <span>+ VAT</span></TicketPrice>
              <TicketDescription>{ticket.description}</TicketDescription>
              <TicketFeatures>
                {ticket.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </TicketFeatures>
              <PurchaseButton href="#" featured={ticket.featured}>
                Coming Soon
              </PurchaseButton>
            </TicketCard>
          ))}
        </TicketTypes>
        
        <FAQSection>
          <FAQTitle>Frequently Asked Questions</FAQTitle>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <Question>{faq.question}</Question>
              <Answer>{faq.answer}</Answer>
            </FAQItem>
          ))}
        </FAQSection>
      </Container>
    </PageContainer>
  );
};

export default TicketsPage;