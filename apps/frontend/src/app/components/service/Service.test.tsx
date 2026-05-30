import { render, screen, act } from '@testing-library/react';
import Service from './Service';
import '@testing-library/jest-dom';

// Mock framer-motion to prevent animation issues in jest
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: require('react').forwardRef((props: any, ref: any) => {
        const { initial, whileInView, viewport, transition, ...rest } = props;
        return <div ref={ref} {...rest} />;
      }),
    },
  };
});

describe('Service Component', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<Service />);
    });
    expect(screen.getByText('Next-Generation Web Development')).toBeInTheDocument();
  });
});
