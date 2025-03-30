import type { BannerElements, BannerElementStyle } from '../../types/banner';
import { Mode } from '../../types/mode';

const initialBannerStyle: BannerElementStyle = {
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
  bannerLinkLabel: 'Watch Severance on Apple Tv.'
};

const initialBannerStyleTablet: BannerElementStyle = {
  ...initialBannerStyle,
  backgroundColor: '#0A4BC9'
};

const initialBannerStyleMobile: BannerElementStyle = {
  ...initialBannerStyle,
  height: 220,
  backgroundImage: '/images/severance_work.jpg'
};

const initialHeadingStyle: BannerElementStyle = {
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

const initialHeadingStyleMobile: BannerElementStyle = {
  ...initialHeadingStyle,
  fontSize: 18,
  width: 300,
  textContent: 'The work is mysterious and important.'
};

const initialHeadingStyleTablet: BannerElementStyle = {
  ...initialHeadingStyle,
  width: 380,
  textContent: 'Enjoy each contribution equally.'
};

const initialImageStyle: BannerElementStyle = {
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

  src: '/images/ms_casey.png'
};

const initialImageStyleTablet: BannerElementStyle = {
  ...initialImageStyle,
  position: { top: 0, left: 580 }
};

export const initialElements: BannerElements = {
  banner: {
    mobile: initialBannerStyleMobile,
    tablet: initialBannerStyleTablet,
    desktop: initialBannerStyle
  },
  heading: {
    mobile: initialHeadingStyleMobile,
    tablet: initialHeadingStyleTablet,
    desktop: initialHeadingStyle
  },
  image: {
    mobile: initialImageStyle,
    tablet: initialImageStyleTablet,
    desktop: initialImageStyle
  }
};

export function getCurrentBannerStyle(
  bannerStyles: BannerElementStyle,
  mode: Mode,
  bannerWidth: string
) {
  return {
    backgroundColor: bannerStyles.backgroundColor,
    backgroundImage: bannerStyles.backgroundImage
      ? `url(${bannerStyles.backgroundImage})`
      : undefined,
    width: mode === 'edit' ? bannerWidth : bannerStyles.width,
    height: bannerStyles.height,
    paddingTop: bannerStyles.padding?.top,
    paddingLeft: bannerStyles.padding?.left,
    paddingBottom: bannerStyles.padding?.bottom,
    paddingRight: bannerStyles.padding?.right,
    borderTopWidth: bannerStyles.border?.top,
    borderBottomWidth: bannerStyles.border?.bottom,
    borderLeftWidth: bannerStyles.border?.left,
    borderRightWidth: bannerStyles.border?.right,
    borderStyle: 'solid',
    borderColor: bannerStyles.borderColor
  };
}

export function getCurrentHeadingStyle(headingStyles: BannerElementStyle) {
  return {
    color: headingStyles.color,
    fontFamily: headingStyles.fontFamily,
    fontSize: headingStyles.fontSize,
    fontWeight: headingStyles.fontWeight,
    lineHeight: headingStyles.lineHeight,
    letterSpacing: headingStyles.letterSpacing,
    paddingTop: headingStyles.padding?.top,
    paddingLeft: headingStyles.padding?.left,
    paddingBottom: headingStyles.padding?.bottom,
    paddingRight: headingStyles.padding?.right,
    top: headingStyles.position?.top,
    left: headingStyles.position?.left,
    width: headingStyles.width,
    height: headingStyles.height,
    borderTopWidth: headingStyles.border?.top,
    borderBottomWidth: headingStyles.border?.bottom,
    borderLeftWidth: headingStyles.border?.left,
    borderRightWidth: headingStyles.border?.right,
    borderStyle: 'solid',
    borderColor: headingStyles.borderColor
  };
}

export function getCurrentImageStyle(imageStyles: BannerElementStyle) {
  return {
    width: imageStyles.width,
    height: imageStyles.height,
    top: imageStyles.position?.top,
    left: imageStyles.position?.left,
    borderTopWidth: imageStyles.border?.top,
    borderBottomWidth: imageStyles.border?.bottom,
    borderLeftWidth: imageStyles.border?.left,
    borderRightWidth: imageStyles.border?.right,
    borderStyle: 'solid',
    borderColor: imageStyles.borderColor
  };
}
