import { screen, act, waitFor } from '@testing-library/react';
import switchToEditMode from './EditorSetUp';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { setTextColor, setFontSize, setFontWeight } from '../test-utils';

describe('Editor Typography Section', () => {
  switchToEditMode();
  describe('Text Content Editing', () => {
    it('updates the text content of the selected element when the textarea value changes', async () => {
      const bannerText = screen.getByTestId('banner-text');
      await userEvent.click(bannerText);

      const input = screen.getByTestId('banner-text-field-input');
      await userEvent.clear(input);
      await userEvent.type(input, 'New Text Content');
      expect(bannerText).toHaveTextContent('New Text Content');
    });
  });

  describe('Banner Link Editing', () => {
    it('updates the banner link when the input value changes', async () => {
      const banner = screen.getByTestId('banner');
      await userEvent.click(banner);

      expect(banner).toHaveClass('selected');
      const bannerLinkInput = screen.getByTestId('banner-link-field-input');
      expect(bannerLinkInput).toBeInTheDocument();

      await userEvent.clear(bannerLinkInput);
      expect(bannerLinkInput).toHaveValue('');

      await userEvent.type(bannerLinkInput, 'https://new-link.com');
      await userEvent.click(screen.getByTestId('deselect-btn'));
      await userEvent.click(screen.getByTestId('mode-btn'));

      // MATCH THE DEFAULT EDIT MODE VIEWPORT IN PREVIEW MODE
      act(() => {
        window.innerWidth = 1200;
        window.dispatchEvent(new Event('resize'));
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
    it('updates the font family of the selected element when a new font is selected from the dropdown menu', async () => {
      const bannerText = screen.getByTestId('banner-text');
      expect(bannerText).toBeInTheDocument();

      await userEvent.click(bannerText);

      await waitFor(() => {
        expect(bannerText).toHaveClass('selected');
      });

      const fontFamilyDropdown = screen.getByTestId(
        'font-family-dropdown-trigger'
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

      expect(bannerText).toHaveStyle({ fontFamily: 'sans-serif' });
    });
  });

  describe('Text Color Adjustment', () => {
    it('updates the text color of the selected element on change', async () => {
      await setTextColor('#F8F8F8');
    });
  });

  describe('Font Size Adjustment', () => {
    it('updates the font size of the selected element when the number input value changes', async () => {
      await setFontSize('24');
    });
  });

  describe('Font Weight Selection', () => {
    it('updates the font weight of the selected element when a new font is selected from the dropdown menu', async () => {
      await setFontWeight('400');
    });
  });

  describe('Line Height Adjustment', () => {
    it('updates the line height of the selected element when the number input value changes', async () => {
      const bannerText = screen.getByTestId('banner-text');
      expect(bannerText).toBeInTheDocument();

      await userEvent.click(bannerText);

      await waitFor(() => {
        expect(bannerText).toHaveClass('selected');
      });

      const lineHeightInput = screen.getByTestId('line-height-field-input');

      await act(async () => {
        await userEvent.clear(lineHeightInput);
        await userEvent.type(lineHeightInput, '1.4');
      });

      expect(bannerText).toHaveStyle({ lineHeight: 1.4 });
    });
  });

  describe('Letter spacing Adjustment', () => {
    it('updates the letter spacing of the selected element when the number input value changes', async () => {
      const bannerText = screen.getByTestId('banner-text');
      expect(bannerText).toBeInTheDocument();

      await userEvent.click(bannerText);

      await waitFor(() => {
        expect(bannerText).toHaveClass('selected');
      });

      const letterSpacingInput = screen.getByTestId(
        'letter-spacing-field-input'
      );

      await act(async () => {
        await userEvent.clear(letterSpacingInput);
        await userEvent.type(letterSpacingInput, '0.2');
      });

      expect(bannerText).toHaveStyle({ letterSpacing: '0.2px' });
    });
  });

  describe('Banner Text Direction Selection', () => {
    it('updates the Text Direction of the banner when a different direction is selected from the dropdown menu', async () => {
      const banner = screen.getByTestId('banner');
      expect(banner).toBeInTheDocument();

      await userEvent.click(banner);

      await waitFor(() => {
        expect(banner).toHaveClass('selected');
      });

      const textDirectionDropdown = screen.getByTestId('dir-dropdown-trigger');

      await userEvent.click(textDirectionDropdown);

      await waitFor(() => {
        const textDirectionOptions = screen.getByTestId('dir-dropdown-options');
        expect(textDirectionOptions).toBeInTheDocument();
      });

      const newDirection = await screen.findByTestId('rtl');

      await userEvent.click(newDirection);

      expect(banner).toHaveAttribute('dir', 'rtl');
    });
  });
});
