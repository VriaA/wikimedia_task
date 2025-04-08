import { screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import switchToEditMode from './EditorSetUp';

describe('Rendering', () => {
  switchToEditMode();
  it('renders the editor when the app mode is switched to edit', () => {
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('does not render the editor when the app mode is switched to preview', async () => {
    await userEvent.click(screen.getByTestId('mode-btn'));
    act(() => {
      window.scroll({ top: 0 });
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(screen.queryByTestId('editor')).not.toBeInTheDocument();
    });
  });
});
