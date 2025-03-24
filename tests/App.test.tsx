import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App.tsx';

test('renders the heading with TASK', () => {
  render(<App />);
  const headingElement = screen.getByText(/TASK/i);
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveClass('heading');
});
