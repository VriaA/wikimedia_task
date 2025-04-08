import { act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

export async function setTextColor(newColor: string) {
  const bannerText = screen.getByTestId('banner-text');
  await userEvent.click(bannerText);
  const colorButton = screen.getByTestId('text-color-picker-trigger');
  await userEvent.click(colorButton);

  const colorPickerInput = document.querySelector(
    'input[id^="rc-editable-input-"]'
  ) as HTMLInputElement;
  expect(colorPickerInput).toBeInTheDocument();

  await userEvent.clear(colorPickerInput);
  await userEvent.type(colorPickerInput, newColor);
  await userEvent.click(colorButton);

  expect(colorButton).toHaveTextContent(newColor);
  expect(bannerText).toHaveStyle({ color: newColor });
}

export async function setBackgroundColor(newColor: string) {
  const banner = screen.getByTestId('banner');
  await userEvent.click(banner);

  const colorButton = screen.getByTestId('background-color-picker-trigger');
  await userEvent.click(colorButton);

  const colorPickerInput = document.querySelector(
    'input[id^="rc-editable-input-"]'
  ) as HTMLInputElement;
  expect(colorPickerInput).toBeInTheDocument();

  await userEvent.clear(colorPickerInput);
  await userEvent.type(colorPickerInput, newColor);
  await userEvent.click(colorButton);

  expect(colorButton).toHaveTextContent(newColor);
  expect(banner).toHaveStyle({ backgroundColor: newColor });
}

export async function setFontSize(fontSize: string) {
  const bannerText = screen.getByTestId('banner-text');
  expect(bannerText).toBeInTheDocument();

  await userEvent.click(bannerText);

  await waitFor(() => {
    expect(bannerText).toHaveClass('selected');
  });

  const fontSizeInput = screen.getByTestId('font-size-field-input');

  await act(async () => {
    await userEvent.clear(fontSizeInput);
    await userEvent.type(fontSizeInput, fontSize);
  });

  expect(bannerText).toHaveStyle({ fontSize: fontSize });
}

export async function setFontWeight(weight: string) {
  const bannerText = screen.getByTestId('banner-text');
  expect(bannerText).toBeInTheDocument();

  await userEvent.click(bannerText);

  await waitFor(() => {
    expect(bannerText).toHaveClass('selected');
    expect(bannerText).toHaveStyle({ fontFamily: 'sans-serif' });
  });

  const fontWeightDropdown = screen.getByTestId('font-weight-dropdown-trigger');

  await userEvent.click(fontWeightDropdown);

  await waitFor(() => {
    const fontWeightOptions = screen.getByTestId(
      'font-weight-dropdown-options'
    );
    expect(fontWeightOptions).toBeInTheDocument();
  });

  const newFontWeightOption = await screen.findByTestId(`sans-serif-${weight}`);

  await userEvent.click(newFontWeightOption);

  expect(bannerText).toHaveStyle({ fontWeight: weight });
}
