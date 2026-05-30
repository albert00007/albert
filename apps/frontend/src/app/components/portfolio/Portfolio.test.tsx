import { render, screen } from '@testing-library/react';
import Portfolio from './Portfolio';
import '@testing-library/jest-dom';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Portfolio', () => {
  it('renders the portfolio section', () => {
    render(<Portfolio />);
    expect(screen.getByText('Our Portfolio')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Portfolio />);
    expect(
      screen.getByText(/A selection of enterprise projects that showcase our software engineering expertise/i)
    ).toBeInTheDocument();
  });

  it('renders project categories', () => {
    render(<Portfolio />);
    expect(screen.getAllByText('Web Development').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mobile').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Data & Automation/i).length).toBeGreaterThan(0);
  });

  it('renders project titles', () => {
    render(<Portfolio />);
    expect(screen.getByText('Enterprise SaaS Platform')).toBeInTheDocument();
    expect(screen.getByText('Mobile Commerce App')).toBeInTheDocument();
    expect(screen.getByText('Data Analytics Dashboard')).toBeInTheDocument();
  });

  it('renders technology tags', () => {
    render(<Portfolio />);
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0);
    expect(screen.getAllByText('React Native').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
  });
});
