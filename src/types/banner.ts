export type BannerElementType = 'text' | 'image' | 'banner' | null;

export type ViewportType = 'mobile' | 'tablet' | 'desktop';

export type UpdateElementStyleType = (
  element: BannerElementType,
  viewport: ViewportType,
  style: Partial<BannerElementStyle>
) => void;

export type BannerElementStyle = {
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
    mobile: BannerElementStyle;
    tablet: BannerElementStyle;
    desktop: BannerElementStyle;
  };
  text: {
    mobile: BannerElementStyle;
    tablet: BannerElementStyle;
    desktop: BannerElementStyle;
  };
  image: {
    mobile: BannerElementStyle;
    tablet: BannerElementStyle;
    desktop: BannerElementStyle;
  };
};

export type BannerContext = {
  elements: BannerElements;
  selectedElement: BannerElementType;
  setSelectedElement: (element: BannerElementType) => void;
  currentViewport: ViewportType;
  setCurrentViewport: React.Dispatch<React.SetStateAction<ViewportType>>;
  updateElementStyle: UpdateElementStyleType;
};

export type BannerPosition =
  | { position: 'sticky'; top: string }
  | { position?: undefined; top?: undefined };

export type UseBanner = {
  handleCloseBtnClick: () => void;
  canShowContrastMessage: boolean;
  setCanShowContrastMessage: React.Dispatch<React.SetStateAction<boolean>>;
  selectedElement: BannerElementType;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: () => void;
  handleBannerClick: (e: React.MouseEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  bannerStyle: React.CSSProperties;
  textStyle: React.CSSProperties;
  imageStyle: React.CSSProperties;
  bannerPosition: BannerPosition;
  bannerStyles: BannerElementStyle;
  textStyles: BannerElementStyle;
  imageStyles: BannerElementStyle;
};
