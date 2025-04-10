export type BannerElementType = 'text' | 'image' | 'banner' | null;

export type ViewportType = 'mobile' | 'tablet' | 'desktop';

export type updateElementConfigType = (
  element: BannerElementType,
  viewport: ViewportType,
  style: Partial<BannerElementConfig>
) => void;

export type BannerElementConfig = {
  textContent?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  lineHeight?: number;
  letterSpacing?: number;
  width?: number;
  height?: number;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  position?: {
    top?: number;
    left?: number;
  };
  border?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  borderColor?: string;
  color?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  bannerLink?: string | undefined;
  src?: string;
  imgAlt?: string;
  dir?: string;
};

export type BannerElements = {
  banner: {
    mobile: BannerElementConfig;
    tablet: BannerElementConfig;
    desktop: BannerElementConfig;
  };
  text: {
    mobile: BannerElementConfig;
    tablet: BannerElementConfig;
    desktop: BannerElementConfig;
  };
  image: {
    mobile: BannerElementConfig;
    tablet: BannerElementConfig;
    desktop: BannerElementConfig;
  };
};

export type BannerContext = {
  elements: BannerElements;
  selectedElement: BannerElementType;
  setSelectedElement: (element: BannerElementType) => void;
  currentViewport: ViewportType;
  setCurrentViewport: React.Dispatch<React.SetStateAction<ViewportType>>;
  updateElementConfig: updateElementConfigType;
};

export type BannerPosition =
  | { position: 'sticky'; top: string }
  | { position?: undefined; top?: undefined };

export type UseBanner = {
  handleDeselectButtonClick: () => void;
  canShowContrastMessage: boolean;
  setCanShowContrastMessage: React.Dispatch<React.SetStateAction<boolean>>;
  selectedElement: BannerElementType;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: () => void;
  handleBannerClick: (e: React.MouseEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  currentBannerStyle: React.CSSProperties;
  currentTextStyle: React.CSSProperties;
  currentImageStyle: React.CSSProperties;
  bannerPosition: BannerPosition;
  bannerConfig: BannerElementConfig;
  textConfig: BannerElementConfig;
  imageConfig: BannerElementConfig;
};
