import { render, screen, act } from '@testing-library/react';
import About from './About';
import '@testing-library/jest-dom';

describe('About Component', () => {
  it('renders the about section', async () => {
    await act(async () => {
      render(<About />);
    });
    const heading = screen.getAllByText(/Excellence/i)[0];
    expect(heading).toBeInTheDocument();
  });
});
