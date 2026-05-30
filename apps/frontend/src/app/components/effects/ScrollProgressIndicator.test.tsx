import { render, screen, fireEvent } from '@testing-library/react';
import ScrollProgressIndicator from './ScrollProgressIndicator';

describe('ScrollProgressIndicator', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
      configurable: true,
    });
  });

  it('renders the progress bar container with proper role', () => {
    render(<ScrollProgressIndicator />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  it('starts at 0% progress', () => {
    render(<ScrollProgressIndicator />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('updates progress on scroll', () => {
    render(<ScrollProgressIndicator />);

    Object.defineProperty(window, 'scrollY', { value: 600 });
    fireEvent.scroll(window);

    const progressbar = screen.getByRole('progressbar');
    const progressValue = parseInt(progressbar.getAttribute('aria-valuenow') || '0', 10);
    expect(progressValue).toBeGreaterThanOrEqual(49);
    expect(progressValue).toBeLessThanOrEqual(51);
  });

  it('caps progress at 100% when scrolled past bottom', () => {
    render(<ScrollProgressIndicator />);

    Object.defineProperty(window, 'scrollY', { value: 5000 });
    fireEvent.scroll(window);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
  });

  it('shows 0% when at top of page', () => {
    render(<ScrollProgressIndicator />);

    Object.defineProperty(window, 'scrollY', { value: 0 });
    fireEvent.scroll(window);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders inner bar element', () => {
    const { container } = render(<ScrollProgressIndicator />);
    const innerBar = container.querySelector('.scroll-progress__bar');
    expect(innerBar).toBeInTheDocument();
  });

  it('cleans up event listener on unmount', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ScrollProgressIndicator />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
