import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BannerContextProvider } from '../../src/contexts/BannerContext';
import AppContextProvider from '../../src/contexts/AppContext';
import App from '../../src/App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

export default function switchToEditMode() {
  beforeEach(async () => {
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
}
