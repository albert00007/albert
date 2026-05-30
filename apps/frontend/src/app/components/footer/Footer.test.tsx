import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    // Use getAllByText and grab the first one because 'MicroState' exists in both the brand logo and copyright text
    const elements = screen.getAllByText(/MicroState/i);
    expect(elements[0]).toBeInTheDocument();
  });

  it('renders footer description', () => {
    render(<Footer />);
    expect(screen.getByText(/Engineering the future of digital products/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders newsletter subscription', () => {
    render(<Footer />);
    expect(
      screen.getByText('Insights on tech and architecture.')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Join')).toBeInTheDocument();
  });

  it('renders the copyright notice with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`${currentYear}.*MicroStateDev.*All rights reserved`))
    ).toBeInTheDocument();
  });
});
