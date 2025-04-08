import { screen, act } from '@testing-library/react';
import switchToEditMode from './EditorSetUp';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Editor Viewport Section', () => {
  switchToEditMode();
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

      // CHECK IF THE BANNER TAKES THE FULL WIDTH OF LARGE SCREENS
      act(() => {
        window.innerWidth = 1200;
        window.dispatchEvent(new Event('resize'));
      });

      expect(banner).toHaveStyle({ width: '100%' });
    });
  });
});
