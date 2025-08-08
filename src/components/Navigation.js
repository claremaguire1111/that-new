import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Header Components
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  background-color: ${props => props.scrolled ? props.theme.colors.navBackground : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  
  ${props => props.scrolled && props.theme.isDark && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.03) 0%, 
        rgba(255, 255, 255, 0.02) 50%,
        rgba(255, 255, 255, 0.03) 100%
      );
      pointer-events: none;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
    }
  `}
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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  z-index: 1001;
  letter-spacing: -0.02em;
  
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.colors.navBackground};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1000;
    padding-top: 5rem;
    gap: 1.5rem;
  }
`;

const NavItem = styled.div`
  position: relative;
  
  /* Dropdown styling - we'll handle this with JS now */
  &.has-dropdown {
    position: relative;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  position: relative;
  color: ${props => props.theme.colors.text};
  font-size: 0.9375rem;
  display: inline-block;
  
  &.active {
    font-weight: 600;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: ${props => props.theme.colors.text};
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  /* Dropdown indicator */
  &.dropdown-toggle::after {
    content: "▼";
    font-size: 8px;
    margin-left: 5px;
    vertical-align: middle;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${props => props.theme.isDark ? 'rgba(13, 13, 19, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 0.75rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  min-width: 180px;
  z-index: 1001;
  
  /* Show on class for JavaScript toggle */
  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  /* Mobile styles */
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: static;
    background-color: transparent;
    box-shadow: none;
    padding: 0.5rem 0 0.5rem 1rem;
    margin-top: 0.5rem;
    border-left: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#EEEEEE'};
    opacity: 1;
    visibility: hidden;
    transform: none;
    height: 0;
    overflow: hidden;
    
    &.show {
      visibility: visible;
      height: auto;
      margin-bottom: 0.5rem;
    }
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#F5F5F5'};
    color: ${props => props.theme.colors.accent};
    opacity: 1;
  }
  
  &.active {
    background-color: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#F0F0F0'};
    font-weight: 500;
  }
  
  /* Mobile styles */
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.5rem 0;
    
    &:hover {
      background-color: transparent;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  z-index: 1001;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const Button = styled.button`
  position: relative;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  font-size: 0.9375rem;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;
  line-height: 1.4;
  
  ${props => props.theme.isDark ? css`
    background: ${props.primary ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${props.primary ? '#000000' : '#FFFFFF'};
    border: 1px solid ${props.primary ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.1) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-2px);
      background: ${props.primary ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)'};
      box-shadow: ${props.primary ? '0 8px 16px rgba(0, 0, 0, 0.2)' : 'none'};
      opacity: 1;
      
      &::before {
        opacity: 1;
      }
    }
  ` : css`
    background: ${props.primary ? '#202123' : '#F1F1F1'};
    color: ${props.primary ? '#FFFFFF' : '#202123'};
    border: 1px solid ${props.primary ? 'transparent' : '#E5E5E5'};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.1) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.primary ? '0 6px 12px rgba(0, 0, 0, 0.15)' : 'none'};
      background: ${props.primary ? '#333333' : '#E5E5E5'};
      opacity: 1;
      
      &::before {
        opacity: 1;
      }
    }
  `}
`;

const Navigation = ({ activePath }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleDropdown = (dropdown) => {
    // On mobile, toggle the dropdown
    if (window.innerWidth <= 900) { // md breakpoint
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    } else {
      // On desktop, show the dropdown on click too (for accessibility)
      setActiveDropdown(dropdown);
    }
  };
  
  const closeDropdown = () => {
    // Only on desktop
    if (window.innerWidth > 900) {
      setTimeout(() => {
        setActiveDropdown(null);
      }, 300); // Small delay to prevent immediate closing
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.has-dropdown')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);
  
  // Close menu when clicking on a link on mobile
  const handleMobileLinkClick = () => {
    if (window.innerWidth <= 900) {
      setIsMenuOpen(false);
      setActiveDropdown(null);
    }
  };
  
  return (
    <Header scrolled={scrolled}>
      <Container>
        <Nav>
          <Logo to="/">
            <img 
              src="/images/misc/thatpng.jpg" 
              alt="THAT Logo" 
              style={{
                height: "30px",
                filter: "none"
              }}
            />
          </Logo>
          
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
          
          <NavLinks isOpen={isMenuOpen}>
            {/* Algopreneurship Dropdown */}
            <NavItem 
              className="has-dropdown"
              onMouseLeave={closeDropdown}
            >
              <NavLink 
                to="/" 
                className={`dropdown-toggle ${activePath === '/' ? 'active' : ''}`}
                onClick={(e) => {
                  if (window.innerWidth <= 900) {
                    e.preventDefault();
                    toggleDropdown('algopreneurship');
                  } else {
                    // On desktop, let the link work but also show dropdown
                    toggleDropdown('algopreneurship');
                  }
                }}
                onMouseEnter={() => window.innerWidth > 900 && toggleDropdown('algopreneurship')}
              >
                Algopreneurship
              </NavLink>
              <DropdownMenu className={activeDropdown === 'algopreneurship' ? 'show' : ''}>
                <DropdownItem to="/tickets" className={activePath === '/tickets' ? 'active' : ''} onClick={handleMobileLinkClick}>Tickets</DropdownItem>
                <DropdownItem to="/speakers" className={activePath === '/speakers' ? 'active' : ''} onClick={handleMobileLinkClick}>Speakers</DropdownItem>
                <DropdownItem to="/agenda" className={activePath === '/agenda' ? 'active' : ''} onClick={handleMobileLinkClick}>Agenda</DropdownItem>
                <DropdownItem to="/sponsors" className={activePath === '/sponsors' ? 'active' : ''} onClick={handleMobileLinkClick}>Sponsors & Partners</DropdownItem>
                <DropdownItem to="/media" className={activePath === '/media' ? 'active' : ''} onClick={handleMobileLinkClick}>Media & Community</DropdownItem>
              </DropdownMenu>
            </NavItem>
            
            {/* Resources Dropdown */}
            <NavItem 
              className="has-dropdown"
              onMouseLeave={closeDropdown}
            >
              <NavLink 
                to="/blog" 
                className={`dropdown-toggle ${activePath === '/blog' || activePath === '/jobs' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown('resources');
                }}
                onMouseEnter={() => window.innerWidth > 900 && toggleDropdown('resources')}
              >
                Resources
              </NavLink>
              <DropdownMenu className={activeDropdown === 'resources' ? 'show' : ''}>
                <DropdownItem to="/blog" className={activePath === '/blog' ? 'active' : ''} onClick={handleMobileLinkClick}>Blog</DropdownItem>
                <DropdownItem to="/jobs" className={activePath === '/jobs' ? 'active' : ''} onClick={handleMobileLinkClick}>Jobs Board</DropdownItem>
              </DropdownMenu>
            </NavItem>
            
            {/* About Us Dropdown */}
            <NavItem 
              className="has-dropdown"
              onMouseLeave={closeDropdown}
            >
              <NavLink 
                to="/about" 
                className={`dropdown-toggle ${activePath === '/about' || activePath === '/about/team' ? 'active' : ''}`}
                onClick={(e) => {
                  if (window.innerWidth <= 900) {
                    e.preventDefault();
                    toggleDropdown('about');
                  } else {
                    // On desktop, let the link work but also show dropdown
                    toggleDropdown('about');
                  }
                }}
                onMouseEnter={() => window.innerWidth > 900 && toggleDropdown('about')}
              >
                About Us
              </NavLink>
              <DropdownMenu className={activeDropdown === 'about' ? 'show' : ''}>
                <DropdownItem to="/about/team" className={activePath === '/about/team' ? 'active' : ''} onClick={handleMobileLinkClick}>Team</DropdownItem>
              </DropdownMenu>
            </NavItem>
            
            {/* Buy Tickets Button */}
            <Button as={Link} to="/tickets" primary onClick={handleMobileLinkClick}>
              Buy Tickets
            </Button>
          </NavLinks>
        </Nav>
      </Container>
    </Header>
  );
};

export default Navigation;