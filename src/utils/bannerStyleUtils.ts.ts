import type { BannerElementConfig } from '../types/banner';
import { Mode } from '../types/mode';

export function getcurrentBannerStyle(
  bannerConfig: BannerElementConfig,
  mode: Mode,
  bannerWidth: string
) {
  return {
    backgroundColor: bannerConfig.backgroundColor,
    backgroundImage: bannerConfig.backgroundImage
      ? `url(${bannerConfig.backgroundImage})`
      : undefined,
    width: mode === 'edit' ? bannerWidth : bannerConfig.width,
    height: bannerConfig.height,
    paddingTop: bannerConfig.padding?.top,
    paddingLeft: bannerConfig.padding?.left,
    paddingBottom: bannerConfig.padding?.bottom,
    paddingRight: bannerConfig.padding?.right,
    borderTopWidth: bannerConfig.border?.top,
    borderBottomWidth: bannerConfig.border?.bottom,
    borderLeftWidth: bannerConfig.border?.left,
    borderRightWidth: bannerConfig.border?.right,
    borderStyle: 'solid',
    borderColor: bannerConfig.borderColor
  };
}

export function getcurrentTextStyle(textConfig: BannerElementConfig) {
  return {
    color: textConfig.color,
    fontFamily: textConfig.fontFamily,
    fontSize: textConfig.fontSize,
    fontWeight: textConfig.fontWeight,
    lineHeight: textConfig.lineHeight,
    letterSpacing: textConfig.letterSpacing,
    paddingTop: textConfig.padding?.top,
    paddingLeft: textConfig.padding?.left,
    paddingBottom: textConfig.padding?.bottom,
    paddingRight: textConfig.padding?.right,
    top: textConfig.position?.top,
    left: textConfig.position?.left,
    width: textConfig.width,
    height: textConfig.height,
    borderTopWidth: textConfig.border?.top,
    borderBottomWidth: textConfig.border?.bottom,
    borderLeftWidth: textConfig.border?.left,
    borderRightWidth: textConfig.border?.right,
    borderStyle: 'solid',
    borderColor: textConfig.borderColor
  };
}

export function getcurrentImageStyle(imageConfig: BannerElementConfig) {
  return {
    width: imageConfig.width,
    height: imageConfig.height,
    top: imageConfig.position?.top,
    left: imageConfig.position?.left,
    borderTopWidth: imageConfig.border?.top,
    borderBottomWidth: imageConfig.border?.bottom,
    borderLeftWidth: imageConfig.border?.left,
    borderRightWidth: imageConfig.border?.right,
    borderStyle: 'solid',
    borderColor: imageConfig.borderColor
  };
}
