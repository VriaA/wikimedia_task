import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { BannerContextProvider } from '../src/contexts/BannerContext';
import AppContextProvider from '../src/contexts/AppContext';
import App from '../src/App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('ImageUploader Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'scroll', {
      value: jest.fn(),
      writable: true
    });
  });

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

  it('shows ImageUploader when selectedElement is "banner"', async () => {
    const banner = screen.getByTestId('banner');
    await userEvent.click(banner);

    expect(screen.getByTestId('image-uploader')).toBeInTheDocument();
    expect(screen.getByText('Upload Background Image')).toBeInTheDocument();
  });

  it('shows ImageUploader when selectedElement is "image"', async () => {
    const imageElement = screen.getByTestId('banner-image');
    await userEvent.click(imageElement);

    expect(screen.getByTestId('image-uploader')).toBeInTheDocument();
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
  });

  it('does not show ImageUploader for other elements', async () => {
    const headingElement = screen.getByTestId('heading');
    await userEvent.click(headingElement);

    expect(screen.queryByTestId('image-uploader')).not.toBeInTheDocument();
  });
});
