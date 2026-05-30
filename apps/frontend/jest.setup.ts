import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: {} }),
    ok: true,
    status: 200,
    statusText: 'OK',
  })
) as jest.Mock;

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
});
