import React from 'react';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import { BannerContextProvider } from '../src/contexts/BannerContext';
import AppContextProvider from '../src/contexts/AppContext';
import App from '../src/App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Editor', () => {
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

  async function setTextColor(newColor: string) {
    const bannerHeading = screen.getByTestId('heading');
    await userEvent.click(bannerHeading);
    const colorButton = screen.getByTestId('text-color-picker');
    await userEvent.click(colorButton);

    const colorPickerInput = document.querySelector(
      'input[spellcheck="false"][value^="#"]'
    ) as HTMLInputElement;
    expect(colorPickerInput).toBeInTheDocument();
    await act(async () => {
      await userEvent.clear(colorPickerInput);
      await userEvent.type(colorPickerInput, newColor);
    });

    await userEvent.click(colorButton);
    expect(colorButton).toHaveTextContent(newColor);
    expect(bannerHeading).toHaveStyle({ color: newColor });
  }

  async function setBackgroundColor(newColor: string) {
    const banner = screen.getByTestId('banner');
    await userEvent.click(banner);

    const colorButton = screen.getByTestId('background-color-picker');
    await userEvent.click(colorButton);

    const colorPickerInput = document.querySelector(
      'input[spellcheck="false"][value^="#"]'
    ) as HTMLInputElement;
    expect(colorPickerInput).toBeInTheDocument();

    await act(async () => {
      await userEvent.clear(colorPickerInput);
      await userEvent.type(colorPickerInput, newColor);
    });

    await userEvent.click(colorButton);

    expect(colorButton).toHaveTextContent(newColor);
    expect(banner).toHaveStyle({ backgroundColor: newColor });
  }

  describe('Rendering', () => {
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

  describe('Viewport Change Handling', () => {
    it('sets desktop as the default viewport option', async () => {
      const mobileRadio = screen.getByTestId('viewport-mobile');
      const tabletRadio = screen.getByTestId('viewport-tablet');
      const desktopRadio = screen.getByTestId('viewport-desktop');

      expect(mobileRadio).toBeInTheDocument();
      expect(tabletRadio).toBeInTheDocument();
      expect(desktopRadio).toBeInTheDocument();

      expect(mobileRadio).not.toBeChecked();
      expect(tabletRadio).not.toBeChecked();
      expect(desktopRadio).toBeChecked();
    });

    it('changes the banner width on device viewport option change', async () => {
      const banner = screen.getByTestId('banner');

      await userEvent.click(screen.getByTestId('viewport-mobile'));
      expect(banner).toHaveStyle({ width: '375px' });

      await userEvent.click(screen.getByTestId('viewport-tablet'));
      expect(banner).toHaveStyle({ width: '720px' });

      await userEvent.click(screen.getByTestId('viewport-desktop'));
      expect(banner).toHaveStyle({ width: '1200px' });

      act(() => {
        window.innerWidth = 1200;
        window.dispatchEvent(new Event('resize'));
      });

      expect(banner).toHaveStyle({ width: '100%' });
    });
  });

  describe('Banner Element Selection', () => {
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

    it('deselects the element on click outside', async () => {
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

    it('does not select banner elements in preview mode', async () => {
      await userEvent.click(screen.getByTestId('mode-btn'));
      const banner = screen.getByTestId('banner');
      expect(banner).toBeInTheDocument();

      await userEvent.click(banner);

      await waitFor(() => {
        expect(banner).not.toHaveClass('selected');
      });
    });
  });

  describe('Text Content Editing', () => {
    it('updates the text content of the selectedElementStyle when the textarea value changes', async () => {
      const input = screen.getByTestId('banner-text-field-input');
      const bannerHeading = screen.getByTestId('heading');
      await userEvent.click(bannerHeading);

      await act(async () => {
        await userEvent.clear(input);
        await userEvent.type(input, 'New Text Content');
      });

      await waitFor(() => {
        expect(bannerHeading).toHaveTextContent('New Text Content');
      });
    });
  });

  describe('Banner Link Editing', () => {
    it('updates the banner link when the input value changes', async () => {
      const banner = screen.getByTestId('banner');
      await userEvent.click(banner);

      expect(banner).toHaveClass('selected');
      const bannerLinkInput = screen.getByTestId('banner-link-field-input');
      expect(bannerLinkInput).toBeInTheDocument();

      await act(async () => {
        await userEvent.clear(bannerLinkInput);
      });
      expect(bannerLinkInput).toHaveValue('');

      await act(async () => {
        await userEvent.type(bannerLinkInput, 'https://new-link.com');
      });

      await waitFor(() => {
        expect(bannerLinkInput).toHaveValue('https://new-link.com');
      });

      await waitFor(() => {
        expect(screen.getByTestId('banner-link')).toHaveAttribute(
          'href',
          'https://new-link.com'
        );
      });
    });
  });

  describe('Font Family Selection', () => {
    it('updates the font family of the selectedElementStyle when a new font is selected from the dropdown menu', async () => {
      const bannerHeading = screen.getByTestId('heading');
      expect(bannerHeading).toBeInTheDocument();

      await userEvent.click(bannerHeading);

      await waitFor(() => {
        expect(bannerHeading).toHaveClass('selected');
      });

      const fontFamilyDropdown = screen.getByTestId(
        'font-family-dropdown-select'
      );

      await userEvent.click(fontFamilyDropdown);

      await waitFor(() => {
        const fontFamilyOptions = screen.getByTestId(
          'font-family-dropdown-options'
        );
        expect(fontFamilyOptions).toBeInTheDocument();
      });

      const newFontOption = await screen.findByTestId('sans-serif');

      await userEvent.click(newFontOption);

      expect(bannerHeading).toHaveStyle({ fontFamily: 'sans-serif' });
    });
  });

  describe('Text Color Adjustment', () => {
    it('updates the text color of the selected element on change', async () => {
      await setTextColor('#F8F8F8');
    });
  });

  describe('Font Size Adjustment', () => {
    it('updates the font size of the selectedElementStyle when the number input value changes', async () => {
      const bannerHeading = screen.getByTestId('heading');
      expect(bannerHeading).toBeInTheDocument();

      await userEvent.click(bannerHeading);

      await waitFor(() => {
        expect(bannerHeading).toHaveClass('selected');
      });

      const fontSizeInput = screen.getByTestId('font-size-field-input');

      await act(async () => {
        await userEvent.clear(fontSizeInput);
        await userEvent.type(fontSizeInput, '24');
      });

      expect(bannerHeading).toHaveStyle({ fontSize: '24px' });
    });
  });

  describe('Font Weight Selection', () => {
    it('updates the font weight of the selectedElementStyle when a new font is selected from the dropdown menu', async () => {
      const bannerHeading = screen.getByTestId('heading');
      expect(bannerHeading).toBeInTheDocument();

      await userEvent.click(bannerHeading);

      await waitFor(() => {
        expect(bannerHeading).toHaveClass('selected');
        expect(bannerHeading).toHaveStyle({ fontFamily: 'sans-serif' });
      });

      const fontWeightDropdown = screen.getByTestId(
        'font-weight-dropdown-select'
      );

      await userEvent.click(fontWeightDropdown);

      await waitFor(() => {
        const fontWeightOptions = screen.getByTestId(
          'font-weight-dropdown-options'
        );
        expect(fontWeightOptions).toBeInTheDocument();
      });

      const newFontWeightOption = await screen.findByTestId('sans-serif-400');

      await userEvent.click(newFontWeightOption);

      expect(bannerHeading).toHaveStyle({ fontFamily: 'sans-serif' });
    });
  });

  describe('Line Height Adjustment', () => {
    it('updates the line height of the selectedElementStyle when the number input value changes', async () => {
      const bannerHeading = screen.getByTestId('heading');
      expect(bannerHeading).toBeInTheDocument();

      await userEvent.click(bannerHeading);

      await waitFor(() => {
        expect(bannerHeading).toHaveClass('selected');
      });

      const lineHeightInput = screen.getByTestId('line-height-field-input');

      await act(async () => {
        await userEvent.clear(lineHeightInput);
        await userEvent.type(lineHeightInput, '1.4');
      });

      expect(bannerHeading).toHaveStyle({ fontSize: '1.4' });
    });
  });

  describe('Letter spacing Adjustment', () => {
    it('updates the letter spacing of the selectedElementStyle when the number input value changes', async () => {
      const bannerHeading = screen.getByTestId('heading');
      expect(bannerHeading).toBeInTheDocument();

      await userEvent.click(bannerHeading);

      await waitFor(() => {
        expect(bannerHeading).toHaveClass('selected');
      });

      const letterSpacingInput = screen.getByTestId(
        'letter-spacing-field-input'
      );

      await act(async () => {
        await userEvent.clear(letterSpacingInput);
        await userEvent.type(letterSpacingInput, '0.2');
      });

      expect(bannerHeading).toHaveStyle({ fontSize: '0.2' });
    });
  });

  describe('Width and Height Adjustment', () => {
    it('updates the width of the selectedElementStyle when the number input value changes', async () => {
      const bannerHeading = screen.getByTestId('heading');
      expect(bannerHeading).toBeInTheDocument();

      await userEvent.click(bannerHeading);

      await waitFor(() => {
        expect(bannerHeading).toHaveClass('selected');
      });

      const widthInput = screen.getByTestId('width-field-input');

      await act(async () => {
        await userEvent.clear(widthInput);
        await userEvent.type(widthInput, '100');
      });

      expect(bannerHeading).toHaveStyle({ fontSize: '100' });
    });
    it('updates the height of the selectedElementStyle when the number input value changes', async () => {
      const bannerHeading = screen.getByTestId('heading');
      expect(bannerHeading).toBeInTheDocument();

      await userEvent.click(bannerHeading);

      await waitFor(() => {
        expect(bannerHeading).toHaveClass('selected');
      });

      const heightInput = screen.getByTestId('height-field-input');

      await act(async () => {
        await userEvent.clear(heightInput);
        await userEvent.type(heightInput, '100');
      });

      expect(bannerHeading).toHaveStyle({ fontSize: '100' });
    });
  });

  describe('Padding Adjustment', () => {
    it('updates the padding of the selectedElementStyle for each side when the number input values change', async () => {
      const bannerHeading = screen.getByTestId('heading');
      await userEvent.click(bannerHeading);
      const topPaddingInput = screen.getByTestId('padding-top-field-input');
      const rightPaddingInput = screen.getByTestId('padding-right-field-input');
      const bottomPaddingInput = screen.getByTestId(
        'padding-bottom-field-input'
      );
      const leftPaddingInput = screen.getByTestId('padding-left-field-input');

      await userEvent.clear(topPaddingInput);
      await userEvent.type(topPaddingInput, '10');

      await userEvent.clear(rightPaddingInput);
      await userEvent.type(rightPaddingInput, '15');

      await userEvent.clear(bottomPaddingInput);
      await userEvent.type(bottomPaddingInput, '20');

      await userEvent.clear(leftPaddingInput);
      await userEvent.type(leftPaddingInput, '5');

      expect(bannerHeading).toHaveStyle('padding: 10px 15px 20px 5px');
    });
  });

  describe('Position Adjustment', () => {
    it('updates the position of the selectedElementStyle for each side when the number input values change', async () => {
      const bannerHeading = screen.getByTestId('heading');
      await userEvent.click(bannerHeading);
      const topPositionInput = screen.getByTestId('position-top-field-input');

      const leftPositionInput = screen.getByTestId('position-left-field-input');

      await userEvent.clear(topPositionInput);
      await userEvent.type(topPositionInput, '100');

      await userEvent.clear(leftPositionInput);
      await userEvent.type(leftPositionInput, '50');

      expect(bannerHeading).toHaveStyle({ top: '100px', left: '50px' });
    });
  });

  describe('Border Adjustment', () => {
    it('updates the border of the selectedElementStyle for each side when the number input values change', async () => {
      const bannerHeading = screen.getByTestId('heading');
      await userEvent.click(bannerHeading);
      const topBorderInput = screen.getByTestId('border-top-field-input');
      const rightBorderInput = screen.getByTestId('border-right-field-input');
      const bottomBorderInput = screen.getByTestId('border-bottom-field-input');
      const leftBorderInput = screen.getByTestId('border-left-field-input');

      await userEvent.clear(topBorderInput);
      await userEvent.type(topBorderInput, '1');

      await userEvent.clear(rightBorderInput);
      await userEvent.type(rightBorderInput, '2');

      await userEvent.clear(bottomBorderInput);
      await userEvent.type(bottomBorderInput, '3');

      await userEvent.clear(leftBorderInput);
      await userEvent.type(leftBorderInput, '4');

      expect(bannerHeading).toHaveStyle({
        borderTopWidth: '1px',
        borderRightWidth: '2px',
        borderBottomWidth: '3px',
        borderLeftWidth: '4px'
      });
    });
  });

  describe('Border Color Adjustment', () => {
    it('updates the border color of the selected element on change', async () => {
      const bannerHeading = screen.getByTestId('heading');
      await userEvent.click(bannerHeading);

      const colorButton = screen.getByTestId('border-color-picker');
      await act(async () => {
        await userEvent.click(colorButton);
      });

      const colorPickerInput = document.querySelector(
        'input[spellcheck="false"][value^="#"]'
      ) as HTMLInputElement;

      expect(colorPickerInput).toBeInTheDocument();

      const newColor = '#FF5733';
      await act(async () => {
        await userEvent.clear(colorPickerInput);
        await userEvent.type(colorPickerInput, newColor);
      });

      await act(async () => {
        await userEvent.click(colorButton);
      });

      expect(colorButton).toHaveTextContent(newColor);
      expect(bannerHeading).toHaveStyle({ borderColor: newColor });
    });
  });

  describe('Background Color Adjustment', () => {
    it('updates the background color of the selected element on change', async () => {
      await setBackgroundColor('#FF5733');
    });

    it('hides the background image overlay when the banner has a background color', async () => {
      await setBackgroundColor('#FF5733');

      await waitFor(() => {
        expect(
          screen.queryByTestId('banner-bg-image-overlay')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Background Image Change', () => {
    async function setBackgroundImage() {
      const banner = screen.getByTestId('banner');
      await userEvent.click(banner);

      expect(screen.getByTestId('image-uploader')).toBeInTheDocument();
      expect(screen.getByText('Upload Background Image')).toBeInTheDocument();

      const file = new File(['dummy image content'], 'test-image.png', {
        type: 'image/png'
      });

      const fileInput = screen.getByTestId(
        'image-uploader-input'
      ) as HTMLInputElement;

      expect(fileInput).toBeInTheDocument();
      await userEvent.upload(fileInput, file);

      expect(fileInput.files?.length).toBe(1);

      await waitFor(() => {
        expect(banner).toHaveStyle({
          backgroundImage: 'url("data:image/png;base64'
        });
      });
    }

    it('updates the background image of the selected element on change', async () => {
      await setBackgroundImage();
    });

    it('shows the background image overlay when the banner has a background image', async () => {
      await setBackgroundImage();
      await waitFor(() => {
        expect(
          screen.getByTestId('banner-bg-image-overlay')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Image Change', () => {
    it('updates the image of the selected element on change', async () => {
      const bannerImage = screen.getByTestId('banner-image');
      await userEvent.click(bannerImage);

      expect(screen.getByTestId('image-uploader')).toBeInTheDocument();
      expect(screen.getByText('Upload Image')).toBeInTheDocument();

      const file = new File(['dummy image content'], 'test-image.png', {
        type: 'image/png'
      });

      const fileInput = screen.getByTestId(
        'image-uploader-input'
      ) as HTMLInputElement;

      expect(fileInput).toBeInTheDocument();
      await userEvent.upload(fileInput, file);
      await waitFor(() => {
        expect(bannerImage.getAttribute('src')).toMatch(
          /^data:image\/png;base64,/
        );
      });
    });
  });

  describe('Contrast checks', () => {
    it('renders the insufficient contrast message when the contrast ratio is low', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');

      const errorMessage = screen.getByTestId('banner-error-message-text');
      expect(errorMessage).toBeInTheDocument();
    });

    it('removes the insufficient contrast message when contrast is improved', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');

      const errorMessage = screen.queryByTestId('banner-error-message-text');
      expect(errorMessage).toBeInTheDocument();

      await setBackgroundColor('#FFF');
      await waitFor(() => {
        expect(errorMessage).not.toBeInTheDocument();
      });
    });

    it('removes the insufficient contrast message on close button click', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');

      const errorMessage = screen.queryByTestId('banner-error-message-text');
      expect(errorMessage).toBeInTheDocument();

      await userEvent.click(
        screen.getByTestId('banner-error-message-close-btn')
      );
      await waitFor(() => {
        expect(errorMessage).not.toBeInTheDocument();
      });
    });

    it('does not show the insufficient contrast message when there is no selected element', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');

      const errorMessage = screen.queryByTestId('banner-error-message-text');
      expect(errorMessage).toBeInTheDocument();

      await userEvent.click(document.body);
      await waitFor(() => {
        expect(errorMessage).not.toBeInTheDocument();
      });
    });

    it('does not show the insufficient contrast message in preview mode', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');

      const errorMessage = screen.queryByTestId('banner-error-message-text');
      expect(errorMessage).toBeInTheDocument();

      await userEvent.click(document.body);
      await userEvent.click(screen.getByTestId('mode-btn'));
      await waitFor(() => {
        expect(errorMessage).not.toBeInTheDocument();
      });
    });
  });
});
