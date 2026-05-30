// @ts-nocheck
import { render, screen, act } from '@testing-library/react';
import BlogPage from './page';
import '@testing-library/jest-dom';

describe('Blog Listing Page', () => {
  it('renders the blog header', async () => {
    await act(async () => {
      // @ts-ignore
      render(await BlogPage());
    });
    const heading = screen.getByRole('heading', { name: /Our Blog/i });
    expect(heading).toBeInTheDocument();
  });
});
