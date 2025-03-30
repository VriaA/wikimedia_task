import type { Option } from '../types/editor';

type FontWeights = {
  [key: string]: {
    weights: Option[];
  };
};

const fontWeights: FontWeights = {
  alegreya: {
    weights: [
      { value: '100', label: 'Thin', id: 'alegreya-100' },
      { value: '200', label: 'Extra Light', id: 'alegreya-200' },
      { value: '300', label: 'Light', id: 'alegreya-300' },
      { value: '400', label: 'Normal', id: 'alegreya-400' },
      { value: '500', label: 'Medium', id: 'alegreya-500' },
      { value: '600', label: 'Semi Bold', id: 'alegreya-600' },
      { value: '700', label: 'Bold', id: 'alegreya-700' },
      { value: '800', label: 'Extra Bold', id: 'alegreya-800' },
      { value: '900', label: 'Black', id: 'alegreya-900' }
    ]
  },
  bangers: {
    weights: [{ value: '400', label: 'Normal', id: 'bangers-400' }]
  },
  fraunces: {
    weights: [
      { value: '100', label: 'Thin', id: 'fraunces-100' },
      { value: '200', label: 'Extra Light', id: 'fraunces-200' },
      { value: '300', label: 'Light', id: 'fraunces-300' },
      { value: '400', label: 'Normal', id: 'fraunces-400' },
      { value: '500', label: 'Medium', id: 'fraunces-500' },
      { value: '600', label: 'Semi Bold', id: 'fraunces-600' },
      { value: '700', label: 'Bold', id: 'fraunces-700' },
      { value: '800', label: 'Extra Bold', id: 'fraunces-800' },
      { value: '900', label: 'Black', id: 'fraunces-900' }
    ]
  },
  roboto: {
    weights: [
      { value: '100', label: 'Thin', id: 'roboto-100' },
      { value: '200', label: 'Extra Light', id: 'roboto-200' },
      { value: '300', label: 'Light', id: 'roboto-300' },
      { value: '400', label: 'Normal', id: 'roboto-400' },
      { value: '500', label: 'Medium', id: 'roboto-500' },
      { value: '600', label: 'Semi Bold', id: 'roboto-600' },
      { value: '700', label: 'Bold', id: 'roboto-700' },
      { value: '800', label: 'Extra Bold', id: 'roboto-800' },
      { value: '900', label: 'Black', id: 'roboto-900' }
    ]
  },
  'sans-serif': {
    weights: [
      { value: '100', label: 'Thin', id: 'sans-serif-100' },
      { value: '200', label: 'Extra Light', id: 'sans-serif-200' },
      { value: '300', label: 'Light', id: 'sans-serif-300' },
      { value: '400', label: 'Normal', id: 'sans-serif-400' },
      { value: '500', label: 'Medium', id: 'sans-serif-500' },
      { value: '600', label: 'Semi Bold', id: 'sans-serif-600' },
      { value: '700', label: 'Bold', id: 'sans-serif-700' },
      { value: '800', label: 'Extra Bold', id: 'sans-serif-800' },
      { value: '900', label: 'Black', id: 'sans-serif-900' }
    ]
  }
};

const defaultFontWeight = { value: '400', label: 'Normal', id: 'default-400' };

export { defaultFontWeight, fontWeights };
