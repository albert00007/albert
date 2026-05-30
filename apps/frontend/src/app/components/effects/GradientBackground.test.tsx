import { render } from '@testing-library/react';
import GradientBackground from './GradientBackground';
import '@testing-library/jest-dom';

describe('GradientBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<GradientBackground />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('renders with aria-hidden attribute', () => {
    const { container } = render(<GradientBackground />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders gradient orbs', () => {
    const { container } = render(<GradientBackground />);
    const orbs = container.querySelectorAll('.bg-gradient-to-tr');
    expect(orbs.length).toBeGreaterThan(0);
  });
});
