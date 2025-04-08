import { screen, act, waitFor } from '@testing-library/react';
import switchToEditMode from './EditorSetUp';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {
  setBackgroundColor,
  setTextColor,
  setFontSize,
  setFontWeight
} from '../test-utils';

describe('Editor Layout Section', () => {
  switchToEditMode();

  describe('Border Adjustment', () => {
    it('updates the border of the selected Element for each side when the number input values change', async () => {
      const bannerText = screen.getByTestId('banner-text');
      await userEvent.click(bannerText);
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

      expect(bannerText).toHaveStyle({
        borderTopWidth: '1px',
        borderRightWidth: '2px',
        borderBottomWidth: '3px',
        borderLeftWidth: '4px'
      });
    });
  });

  describe('Border Color Adjustment', () => {
    it('updates the border color of the selected element on change', async () => {
      const bannerText = screen.getByTestId('banner-text');
      await userEvent.click(bannerText);

      const colorButton = screen.getByTestId('border-color-picker-trigger');

      await userEvent.click(colorButton);

      const colorPickerInput = document.querySelector(
        'input[id^="rc-editable-input-"]'
      ) as HTMLInputElement;

      expect(colorPickerInput).toBeInTheDocument();

      const newColor = '#FF5733';
      await userEvent.clear(colorPickerInput);
      await userEvent.type(colorPickerInput, newColor);

      await userEvent.click(colorButton);

      expect(colorButton).toHaveTextContent(newColor);
      expect(bannerText).toHaveStyle({ borderColor: newColor });
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

  describe('Image Alt Text Editing', () => {
    it('updates the image Alt Text when the input value changes', async () => {
      const image = screen.getByTestId('banner-image');
      await userEvent.click(image);

      expect(image).toHaveClass('selected');
      const altTextInput = screen.getByTestId('image-alt-text-input');
      expect(altTextInput).toBeInTheDocument();

      await act(async () => {
        await userEvent.clear(altTextInput);
      });
      expect(altTextInput).toHaveValue('');

      await act(async () => {
        await userEvent.type(altTextInput, 'Test description');
      });

      await waitFor(() => {
        expect(image).toHaveAttribute('alt', 'Test description');
      });
    });

    it('does not render Alt Text input when an image is not selected', async () => {
      const banner = screen.getByTestId('banner');
      await userEvent.click(banner);

      expect(banner).toHaveClass('selected');
      expect(
        screen.queryByTestId('image-alt-text-input')
      ).not.toBeInTheDocument();
    });
  });

  describe('Contrast checks (AA level)', () => {
    describe('WCAG AA compliance', () => {
      it('passes for 24px regular text (3:1 ratio)', async () => {
        await setTextColor('#767676');
        await setBackgroundColor('#FFF');
        await setFontSize('24');
        expect(
          screen.queryByTestId('banner-error-message-text')
        ).not.toBeInTheDocument();
      });

      it('passes for 18.67px bold text (3:1 ratio)', async () => {
        await setTextColor('#777777');
        await setBackgroundColor('#FFF');
        await setFontSize('18.67');
        await setFontWeight('700');
        expect(
          screen.queryByTestId('banner-error-message-text')
        ).not.toBeInTheDocument();
      });

      it('fails for 18.66px regular text (needs 4.5:1)', async () => {
        await setTextColor('#777777');
        await setBackgroundColor('#FFF');
        await setFontSize('18.66');
        expect(
          screen.getByTestId('banner-error-message-text')
        ).toBeInTheDocument();
      });

      it('requires 4.5:1 for 14px regular text', async () => {
        await setTextColor('#777777');
        await setBackgroundColor('#FFF');
        await setFontSize('14');

        await waitFor(() => {
          expect(
            screen.getByTestId('banner-error-message-text')
          ).toBeInTheDocument();
        });
      });
    });

    it('shows message when contrast is too low', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');
      expect(
        screen.getByTestId('banner-error-message-text')
      ).toBeInTheDocument();
    });

    it('hides message when contrast improves', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');
      await setBackgroundColor('#FFF');
      await waitFor(() => {
        expect(
          screen.queryByTestId('banner-error-message-text')
        ).not.toBeInTheDocument();
      });
    });

    it('closes when clicking close button', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');
      await userEvent.click(
        screen.getByTestId('banner-error-message-close-btn')
      );
      await waitFor(() => {
        expect(
          screen.queryByTestId('banner-error-message-text')
        ).not.toBeInTheDocument();
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

    it('hides when clicking outside', async () => {
      await setTextColor('#000');
      await setBackgroundColor('#111');
      await userEvent.click(document.body);
      await waitFor(() => {
        expect(
          screen.queryByTestId('banner-error-message-text')
        ).not.toBeInTheDocument();
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
