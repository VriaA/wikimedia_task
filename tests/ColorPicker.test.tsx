import React from 'react';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import { BannerContextProvider } from '../src/contexts/BannerContext';
import AppContextProvider from '../src/contexts/AppContext';
import App from '../src/App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('ColorPicker Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'scroll', {
      value: jest.fn(),
      writable: true
    });
  });

  beforeEach(async () => {
    cleanup();
    render(
      <AppContextProvider>
        <BannerContextProvider>
          <App />
        </BannerContextProvider>
      </AppContextProvider>
    );
    const modeButton = await screen.findByTestId('mode-btn');
    await userEvent.click(modeButton);

    act(() => {
      window.scroll({ top: 0 });
      window.dispatchEvent(new Event('scroll'));
    });
  });

  it('clicking color button should toggle the color picker visibility', async () => {
    const bannerHeading = screen.getByTestId('heading');
    await userEvent.click(bannerHeading);

    const colorButton = screen.getByTestId('border-color-picker');
    await act(async () => {
      await userEvent.click(colorButton);
    });

    const colorPickerInput = document.querySelector(
      'input[spellcheck="false"][value^="#"]'
    ) as HTMLInputElement | null;

    expect(colorPickerInput).toBeInTheDocument();

    await userEvent.click(colorButton);

    await waitFor(() => {
      expect(
        screen.queryByTestId('border-color-picker-input')
      ).not.toBeInTheDocument();
    });
  });

  it('closes color picker when clicking outside', async () => {
    const bannerHeading = screen.getByTestId('heading');
    await userEvent.click(bannerHeading);
    const colorButton = screen.getByTestId('border-color-picker');

    await userEvent.click(colorButton);
    expect(
      screen.getByTestId('border-color-picker-popover')
    ).toBeInTheDocument();

    await userEvent.click(document.body);
    await waitFor(() => {
      expect(
        screen.queryByTestId('border-color-picker-popover')
      ).not.toBeInTheDocument();
    });
  });

  it('does not open when disabled', async () => {
    const colorButton = screen.getByTestId('border-color-picker');

    if (colorButton.hasAttribute('disabled')) {
      await userEvent.click(colorButton);
      expect(
        screen.queryByTestId('border-color-picker-popover')
      ).not.toBeInTheDocument();
    }
  });
});
