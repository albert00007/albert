import { render, screen } from '@testing-library/react';
import Contact from './Contact';
import '@testing-library/jest-dom';

describe('Contact', () => {
  it('renders the contact section', () => {
    render(<Contact />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders the introductory paragraph', () => {
    render(<Contact />);
    expect(screen.getByText(/We architect digital solutions for the future/i)).toBeInTheDocument();
  });

  it('renders the email address', () => {
    render(<Contact />);
    expect(screen.getByText('tech@microstatedev.com')).toBeInTheDocument();
  });

  it('renders the phone number', () => {
    render(<Contact />);
    expect(screen.getByText('+374 41 355 605')).toBeInTheDocument();
  });

  it('contains mailto and tel links', () => {
    render(<Contact />);
    expect(screen.getByText('tech@microstatedev.com').closest('a')).toHaveAttribute('href', 'mailto:tech@microstatedev.com');
    expect(screen.getByText('+374 41 355 605').closest('a')).toHaveAttribute('href', 'tel:+37441355605');
  });
});
