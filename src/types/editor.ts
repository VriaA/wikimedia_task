import type { BannerElementStyle, BannerElementType } from '../types/banner';

export type Option = {
  id: string;
  value: string;
  label: string;
  style?: React.CSSProperties;
};

export type UseEditor = {
  selectedElementStyle: BannerElementStyle | null;
  fontWeightsToRender: Option[];
  handleTextChange: (value: string) => void;
  handleLinkChange: (value: string) => void;
  handleAltTextChange: (value: string) => void;
  handleDirChange: (value: string) => void;
  handleFontChange: (value: string) => void;
  handleFontSizeChange: (value: number) => void;
  handleFontWeightChange: (value: string) => void;
  handleLineHeightChange: (value: number) => void;
  handleLetterSpacingChange: (value: number) => void;
  handleWidthChange: (value: number) => void;
  handleHeightChange: (value: number) => void;
  handlePaddingChange: (
    side: 'top' | 'right' | 'bottom' | 'left',
    value: number
  ) => void;
  handlePositionChange: (
    side: 'top' | 'right' | 'bottom' | 'left',
    value: number
  ) => void;
  handleBgColorChange: (value: string) => void;
  handleColorChange: (value: string) => void;
  handleBorderColorChange: (value: string) => void;
  handleImageChange: (value: File) => void;
  handleBorderChange: (
    side: 'top' | 'right' | 'bottom' | 'left',
    value: number
  ) => void;
  selectedElement: BannerElementType;
};
