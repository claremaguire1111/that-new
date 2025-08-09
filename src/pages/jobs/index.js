import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SharedLayout, Container, glassEffect } from '../../components/SharedLayout';
import { Link } from 'react-router-dom';

// Styling
const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const JobsHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const SearchSection = styled.div`
  margin-bottom: 3rem;
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#F9F9F9'};
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE'};
  border-radius: 16px;
  padding: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const SearchInput = styled.input`
  flex-grow: 1;
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
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.isDark ? 'rgba(16, 163, 127, 0.2)' : 'rgba(16, 163, 127, 0.1)'};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const FilterSelect = styled.select`
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #DDDDDD'};
  background: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF'};
  color: ${props => props.theme.isDark ? '#FFFFFF' : '#333333'};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  outline: none;
  min-width: 150px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${props => props.theme.isDark ? 'FFFFFF' : '444444'}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;
  padding-right: 2.5rem;
  cursor: pointer;
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
  }
`;

const FilterTag = styled.button`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background-color: ${props => props.theme.isDark ? 'rgba(68, 70, 84, 0.2)' : 'rgba(68, 70, 84, 0.1)'};
  color: ${props => props.theme.isDark ? '#444654' : '#444654'};
  border: 1px solid ${props => props.theme.isDark ? 'rgba(68, 70, 84, 0.3)' : 'rgba(68, 70, 84, 0.2)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.isDark ? 'rgba(68, 70, 84, 0.3)' : 'rgba(68, 70, 84, 0.2)'};
  }
  
  .close {
    margin-left: 0.4rem;
    font-size: 0.7rem;
  }
`;

const ClearFiltersButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.accent};
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const JobsTable = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${props => props.theme.isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.05)'};
  margin-bottom: 3rem;
`;

const JobsTableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 0.8fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.5)' : '#F0F0F0'};
  font-weight: 600;
  border-bottom: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#E0E0E0'};
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const JobCard = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 0.8fr;
  gap: 1rem;
  padding: 1.5rem;
  align-items: center;
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#FFFFFF'};
  border-bottom: 1px solid ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : '#EEEEEE'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.4)' : '#F9F9F9'};
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    
    .label {
      display: inline-block;
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`;

const Role = styled.div`
  font-weight: 600;
  color: ${props => props.theme.isDark ? '#FFFFFF' : '#333333'};
  
  @media (max-width: 900px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`;

const Company = styled.div`
  @media (max-width: 900px) {
    .label {
      display: inline-block;
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`;

const Location = styled.div`
  @media (max-width: 900px) {
    .label {
      display: inline-block;
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`;

const JobType = styled.div`
  @media (max-width: 900px) {
    .label {
      display: inline-block;
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`;

const ApplyButton = styled.a`
  display: inline-block;
  padding: 0.6rem 1rem;
  background-color: ${props => props.theme.isDark ? 'rgba(68, 70, 84, 0.2)' : 'rgba(68, 70, 84, 0.1)'};
  color: ${props => props.theme.isDark ? '#444654' : '#444654'};
  border: 1px solid ${props => props.theme.isDark ? 'rgba(68, 70, 84, 0.3)' : 'rgba(68, 70, 84, 0.2)'};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.isDark ? 'rgba(68, 70, 84, 0.3)' : 'rgba(68, 70, 84, 0.2)'};
    transform: translateY(-2px);
  }
  
  @media (max-width: 900px) {
    display: block;
    margin-top: 0.5rem;
    text-align: center;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  border: 1px solid ${props => props.active 
    ? props.theme.colors.accent 
    : props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : '#DDDDDD'
  };
  background-color: ${props => props.active 
    ? props.theme.isDark ? 'rgba(16, 163, 127, 0.2)' : 'rgba(16, 163, 127, 0.1)'
    : props.theme.isDark ? 'transparent' : 'transparent'
  };
  color: ${props => props.active
    ? props.theme.colors.accent
    : props.theme.colors.text
  };
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
    background-color: ${props => props.theme.isDark ? 'rgba(16, 163, 127, 0.1)' : 'rgba(16, 163, 127, 0.05)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PostJobCard = styled.div`
  background-color: ${props => props.theme.isDark ? 'rgba(60, 62, 68, 0.3)' : '#F9F9F9'};
  border: ${props => props.theme.isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #EEEEEE'};
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  margin-top: 4rem;
`;

const PostJobHeading = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const PostJobText = styled.p`
  max-width: 600px;
  margin: 0 auto 2rem auto;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
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

// Sample job data
const sampleJobs = [
  {
    id: 1,
    role: "Research Scientist, Quantum ML",
    company: "QuantumAI Research",
    location: "Cambridge, MA",
    type: "Full-time",
    category: "AI Research",
    url: "#"
  },
  {
    id: 2,
    role: "Data Scientist, NLP",
    company: "OpenAI",
    location: "San Francisco, CA",
    type: "Full-time",
    category: "Data Science",
    url: "#"
  },
  {
    id: 3,
    role: "Machine Learning Engineer",
    company: "DeepMind",
    location: "London, UK",
    type: "Full-time",
    category: "Machine Learning",
    url: "#"
  },
  {
    id: 4,
    role: "Applied Mathematician",
    company: "Jane Street",
    location: "New York, NY",
    type: "Full-time",
    category: "Mathematics",
    url: "#"
  },
  {
    id: 5,
    role: "Computational Biologist",
    company: "Genentech",
    location: "South San Francisco, CA",
    type: "Full-time",
    category: "Biology",
    url: "#"
  },
  {
    id: 6,
    role: "Theoretical Physics Postdoc",
    company: "MIT",
    location: "Cambridge, MA",
    type: "Contract",
    category: "Physics",
    url: "#"
  },
  {
    id: 7,
    role: "AI Ethics Researcher",
    company: "Stanford HAI",
    location: "Stanford, CA",
    type: "Full-time",
    category: "AI Research",
    url: "#"
  },
  {
    id: 8,
    role: "Quantum Computing Researcher",
    company: "IBM Research",
    location: "Yorktown Heights, NY",
    type: "Full-time",
    category: "Quantum Computing",
    url: "#"
  },
  {
    id: 9,
    role: "Robotics Engineer",
    company: "Boston Dynamics",
    location: "Waltham, MA",
    type: "Full-time",
    category: "Robotics",
    url: "#"
  },
  {
    id: 10,
    role: "Statistical Geneticist",
    company: "23andMe",
    location: "Sunnyvale, CA",
    type: "Full-time",
    category: "Genetics",
    url: "#"
  },
  {
    id: 11,
    role: "Computer Vision Researcher",
    company: "NVIDIA",
    location: "Santa Clara, CA",
    type: "Full-time",
    category: "Computer Vision",
    url: "#"
  },
  {
    id: 12,
    role: "Computational Neuroscientist",
    company: "Allen Institute",
    location: "Seattle, WA",
    type: "Full-time",
    category: "Neuroscience",
    url: "#"
  }
];

// Get unique values for filters
const getUniqueValues = (jobs, key) => {
  return [...new Set(jobs.map(job => job[key]))];
};

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  
  // Get unique values for filters
  const companies = getUniqueValues(sampleJobs, 'company');
  const locations = getUniqueValues(sampleJobs, 'location');
  const types = getUniqueValues(sampleJobs, 'type');
  const categories = getUniqueValues(sampleJobs, 'category');
  
  // Filter jobs based on search and filters
  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = 
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = selectedCompany ? job.company === selectedCompany : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    const matchesType = selectedType ? job.type === selectedType : true;
    const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
    
    return matchesSearch && matchesCompany && matchesLocation && matchesType && matchesCategory;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCompany('');
    setSelectedLocation('');
    setSelectedType('');
    setSelectedCategory('');
    setCurrentPage(1);
  };
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCompany, selectedLocation, selectedType, selectedCategory]);

  return (
    <SharedLayout activePath="/jobs">
      <Section>
        <Container>
          <JobsHeader>
            <h1 style={{ 
              fontSize: '3.75rem', 
              fontWeight: '700', 
              marginBottom: '1rem', 
              letterSpacing: '-0.03em' 
            }}>
              Science, Math & AI Jobs
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '1rem', 
              maxWidth: '800px',
              margin: '0 auto' 
            }}>
              Find opportunities in cutting-edge research, science, mathematics, and artificial intelligence
            </p>
          </JobsHeader>
          
          <SearchSection>
            <SearchContainer>
              <SearchInput 
                type="text" 
                placeholder="Search jobs by title, company, or category..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
            
            <FilterContainer>
              <FilterSelect 
                value={selectedCompany} 
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">All Companies</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </FilterSelect>
              
              <FilterSelect 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </FilterSelect>
              
              <FilterSelect 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Job Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </FilterSelect>
              
              <FilterSelect 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </FilterSelect>
              
              {(searchTerm || selectedCompany || selectedLocation || selectedType || selectedCategory) && (
                <ClearFiltersButton onClick={clearFilters}>
                  Clear Filters
                </ClearFiltersButton>
              )}
            </FilterContainer>
            
            {/* Active filters tags */}
            {(selectedCompany || selectedLocation || selectedType || selectedCategory) && (
              <FilterContainer>
                {selectedCompany && (
                  <FilterTag onClick={() => setSelectedCompany('')}>
                    Company: {selectedCompany}
                    <span className="close">✕</span>
                  </FilterTag>
                )}
                
                {selectedLocation && (
                  <FilterTag onClick={() => setSelectedLocation('')}>
                    Location: {selectedLocation}
                    <span className="close">✕</span>
                  </FilterTag>
                )}
                
                {selectedType && (
                  <FilterTag onClick={() => setSelectedType('')}>
                    Type: {selectedType}
                    <span className="close">✕</span>
                  </FilterTag>
                )}
                
                {selectedCategory && (
                  <FilterTag onClick={() => setSelectedCategory('')}>
                    Category: {selectedCategory}
                    <span className="close">✕</span>
                  </FilterTag>
                )}
              </FilterContainer>
            )}
          </SearchSection>
          
          <h3 style={{ marginBottom: '1.5rem' }}>
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
          </h3>
          
          <JobsTable>
            <JobsTableHeader>
              <div>Role</div>
              <div>Company</div>
              <div>Location</div>
              <div>Type</div>
              <div></div>
            </JobsTableHeader>
            
            {currentJobs.length > 0 ? (
              currentJobs.map(job => (
                <JobCard key={job.id}>
                  <Role>{job.role}</Role>
                  <Company>
                    <span className="label">Company:</span> {job.company}
                  </Company>
                  <Location>
                    <span className="label">Location:</span> {job.location}
                  </Location>
                  <JobType>
                    <span className="label">Type:</span> {job.type}
                  </JobType>
                  <div>
                    <ApplyButton href={job.url} target="_blank" rel="noopener noreferrer">
                      Apply
                    </ApplyButton>
                  </div>
                </JobCard>
              ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>No jobs found matching your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </JobsTable>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </PageButton>
              
              {[...Array(totalPages)].map((_, i) => (
                <PageButton
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PageButton>
              ))}
              
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </PageButton>
            </Pagination>
          )}
          
          <PostJobCard>
            <PostJobHeading>Are You Hiring?</PostJobHeading>
            <PostJobText>
              Post your job openings to reach top talent in science, mathematics, and AI fields. 
              Connect with researchers, data scientists, engineers, and more from leading institutions.
            </PostJobText>
            <Button as="a" href="mailto:clare@thinkingaboutthinking.org" primary>
              Post a Job
            </Button>
          </PostJobCard>
        </Container>
      </Section>
    </SharedLayout>
  );
};

export default JobsPage;