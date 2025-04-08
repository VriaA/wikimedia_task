import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import switchToEditMode from './editor/EditorSetUp';

describe('ImageUploader Component', () => {
  switchToEditMode();

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
    const bannerText = screen.getByTestId('banner-text');
    await userEvent.click(bannerText);

    expect(screen.queryByTestId('image-uploader')).not.toBeInTheDocument();
  });
});
