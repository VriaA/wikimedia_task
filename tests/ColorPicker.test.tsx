import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import switchToEditMode from './editor/EditorSetUp';

describe('ColorPicker Component', () => {
  switchToEditMode();

  it('clicking color button should toggle the color picker visibility', async () => {
    const bannerText = screen.getByTestId('banner-text');
    await userEvent.click(bannerText);

    const colorButton = screen.getByTestId('border-color-picker-trigger');
    await userEvent.click(colorButton);

    const colorPickerInput = document.querySelector(
      'input[spellcheck="false"][value^="#"]'
    ) as HTMLInputElement | null;

    expect(colorPickerInput).toBeInTheDocument();

    await userEvent.click(colorButton);

    expect(
      screen.queryByTestId('border-color-picker-input')
    ).not.toBeInTheDocument();
  });

  it('closes color picker when clicking outside', async () => {
    const bannerText = screen.getByTestId('banner-text');
    await userEvent.click(bannerText);
    const colorButton = screen.getByTestId('border-color-picker-trigger');

    await userEvent.click(colorButton);
    expect(
      screen.getByTestId('border-color-picker-popover')
    ).toBeInTheDocument();

    await userEvent.click(document.body);

    expect(
      screen.queryByTestId('border-color-picker-popover')
    ).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const colorButton = screen.getByTestId('border-color-picker-trigger');

    if (colorButton.hasAttribute('disabled')) {
      await userEvent.click(colorButton);
      expect(
        screen.queryByTestId('border-color-picker-popover')
      ).not.toBeInTheDocument();
    }
  });
});
