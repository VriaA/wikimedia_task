import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg?react' })],
  server: {
    host: true
  },
  optimizeDeps: {
    exclude: ['wcag-contrast']
  }
});
