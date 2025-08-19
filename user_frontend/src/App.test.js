import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app container', () => {
  render(<App />);
  const el = screen.getByText(/Sign in/i);
  expect(el).toBeInTheDocument();
});
