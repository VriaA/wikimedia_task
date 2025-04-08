import { screen, act, waitFor } from '@testing-library/react';
import switchToEditMode from './EditorSetUp';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Banner Element Selection', () => {
  switchToEditMode();

  async function selectElement() {
    const banner = screen.getByTestId('banner');
    expect(banner).toBeInTheDocument();

    await userEvent.click(banner);

    await waitFor(() => {
      expect(banner).toHaveClass('selected');
    });
  }

  it('selects the element for editing when clicked', async () => {
    await selectElement();
  });

  it('deselects the selected element on click outside', async () => {
    await selectElement();
    await userEvent.click(document.body);

    act(() => {
      window.scroll({ top: 0 });
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('banner')).not.toHaveClass('selected');
    });
  });

  it('deselects the selected element on deselect button click', async () => {
    await selectElement();
    await userEvent.click(screen.getByTestId('deselect-btn'));

    act(() => {
      window.scroll({ top: 0 });
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('banner')).not.toHaveClass('selected');
    });
  });

  it('deselects the selected element on escape key press', async () => {
    await selectElement();
    await userEvent.keyboard('{Escape}');

    act(() => {
      window.scroll({ top: 0 });
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('banner')).not.toHaveClass('selected');
    });
  });

  it('Selects an element on enter key press', async () => {
    const text = screen.getByTestId('banner-text');
    expect(text).toBeInTheDocument();
    text.focus();
    expect(text).toHaveFocus();
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      expect(text).toHaveClass('selected');
    });
  });

  it('Selects an element on space key press', async () => {
    const text = screen.getByTestId('banner-text');
    expect(text).toBeInTheDocument();
    text.focus();
    expect(text).toHaveFocus();
    await userEvent.keyboard(' ');

    await waitFor(() => {
      expect(text).toHaveClass('selected');
    });
  });

  it('does not select banner elements in preview mode', async () => {
    await userEvent.click(screen.getByTestId('mode-btn'));

    const bannerLink = screen.getByTestId('banner-link') as HTMLAnchorElement;
    // TO PREVENT NAVIGATION
    bannerLink.removeAttribute('href');

    const banner = screen.getByTestId('banner');
    expect(banner).toBeInTheDocument();

    await userEvent.click(banner);

    await waitFor(() => {
      expect(banner).not.toHaveClass('selected');
    });
  });
});
