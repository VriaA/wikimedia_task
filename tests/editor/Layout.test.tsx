import { screen, act, waitFor } from '@testing-library/react';
import switchToEditMode from './EditorSetUp';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Editor Layout Section', () => {
  switchToEditMode();
  describe('Width and Height Adjustment', () => {
    it('updates the width of the selected element when the number input value changes', async () => {
      const bannerText = screen.getByTestId('banner-text');
      expect(bannerText).toBeInTheDocument();

      await userEvent.click(bannerText);

      await waitFor(() => {
        expect(bannerText).toHaveClass('selected');
      });

      const widthInput = screen.getByTestId('width-field-input');

      await act(async () => {
        await userEvent.clear(widthInput);
        await userEvent.type(widthInput, '100');
      });

      expect(bannerText).toHaveStyle({ width: '100px' });
    });

    it('updates the height of the selected element when the number input value changes', async () => {
      const bannerText = screen.getByTestId('banner-text');
      expect(bannerText).toBeInTheDocument();

      await userEvent.click(bannerText);

      await waitFor(() => {
        expect(bannerText).toHaveClass('selected');
      });

      const heightInput = screen.getByTestId('height-field-input');

      await act(async () => {
        await userEvent.clear(heightInput);
        await userEvent.type(heightInput, '100');
      });

      expect(bannerText).toHaveStyle({ height: '100px' });
    });
  });

  describe('Padding Adjustment', () => {
    it('updates the padding of the selected element for each side when the number input values change', async () => {
      const bannerText = screen.getByTestId('banner-text');
      await userEvent.click(bannerText);
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

      expect(bannerText).toHaveStyle('padding: 10px 15px 20px 5px');
    });
  });

  describe('Position Adjustment', () => {
    it('updates the position of the selected element for each side when the number input values change', async () => {
      const bannerText = screen.getByTestId('banner-text');
      await userEvent.click(bannerText);
      const topPositionInput = screen.getByTestId('position-top-field-input');

      const leftPositionInput = screen.getByTestId('position-left-field-input');

      await userEvent.clear(topPositionInput);
      await userEvent.type(topPositionInput, '100');

      await userEvent.clear(leftPositionInput);
      await userEvent.type(leftPositionInput, '50');

      expect(bannerText).toHaveStyle({ top: '100px', left: '50px' });
    });
  });
});
