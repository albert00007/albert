import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders the MicroStateDev brand name', () => {
    render(<Header />);
    // MicroState is split with a span
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('icro')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Service').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThan(0);
  });

  it('renders the CTA button with text Contact', () => {
    render(<Header />);
    expect(screen.getAllByText("Contact")[0]).toBeInTheDocument();
  });

  it('has navigation links pointing to correct anchor sections', () => {
    render(<Header />);
    const aboutLink = screen.getAllByText('About')[0].closest('a');
    expect(aboutLink).toHaveAttribute('href', '/#about');
  });

  it('CTA button links to contact section', () => {
    render(<Header />);
    const cta = screen.getAllByText("Contact")[0].closest('a');
    // Mobile button points to /#contact
    expect(cta).toHaveAttribute('href', '/#contact');
  });

  it('toggles aria-expanded when hamburger is clicked', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /Open navigation/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-label', 'Close navigation');
  });
});
