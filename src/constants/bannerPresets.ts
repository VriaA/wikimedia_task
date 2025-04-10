import type { BannerElements, BannerElementConfig } from '../types/banner';

const bannerPresets: BannerElementConfig = {
  backgroundColor: '#990000',
  height: 120,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  border: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  borderColor: '',
  backgroundImage: '',
  bannerLink:
    'https://tv.apple.com/us/show/severance/umc.cmc.1srk2goyh2q2zdxcx605w8vtx',
  dir: 'ltr'
};

const bannerPresetsTablet: BannerElementConfig = {
  ...bannerPresets,
  backgroundColor: '#0A4BC9'
};

const bannerPresetsMobile: BannerElementConfig = {
  ...bannerPresets,
  height: 220,
  backgroundImage: '/images/severance_work.jpg'
};

const textPresets: BannerElementConfig = {
  textContent: 'Your Outie loves contributing to Open Source Software.',
  fontFamily: 'sans-serif',
  fontSize: 22,
  fontWeight: '700',
  lineHeight: 1.5,
  letterSpacing: 0.01,
  color: '#ffffff',
  width: 696.4,
  height: 42.8,
  padding: {
    top: 12,
    right: 0,
    bottom: 0,
    left: 0
  },
  position: {
    top: 20,
    left: 20
  },
  border: {
    top: 1,
    right: 0,
    bottom: 0,
    left: 0
  },
  borderColor: '#FFFFFF'
};

const textPresetsMobile: BannerElementConfig = {
  ...textPresets,
  fontSize: 18,
  width: 300,
  textContent: 'The work is mysterious and important.'
};

const textPresetsTablet: BannerElementConfig = {
  ...textPresets,
  width: 380,
  textContent: 'Enjoy each contribution equally.'
};

const imagePresets: BannerElementConfig = {
  width: 171,
  height: 170,
  position: {
    top: 0,
    left: 1000
  },
  border: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  borderColor: '',

  src: '/images/ms_casey.png',
  imgAlt: "​Miss Casey from 'Severance' in a teal uniform with a Lumon pin"
};

const imagePresetsTablet: BannerElementConfig = {
  ...imagePresets,
  position: { top: 0, left: 580 }
};

export const initialBannerConfig: BannerElements = {
  banner: {
    mobile: bannerPresetsMobile,
    tablet: bannerPresetsTablet,
    desktop: bannerPresets
  },
  text: {
    mobile: textPresetsMobile,
    tablet: textPresetsTablet,
    desktop: textPresets
  },
  image: {
    mobile: imagePresets,
    tablet: imagePresetsTablet,
    desktop: imagePresets
  }
};
