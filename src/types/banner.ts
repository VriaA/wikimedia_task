export type BannerElementType = 'heading' | 'image' | 'banner' | null;

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
  bannerLinkLabel?: string | undefined;
  src?: string;
};

export type BannerElements = {
  banner: {
    mobile: BannerElementStyle;
    tablet: BannerElementStyle;
    desktop: BannerElementStyle;
  };
  heading: {
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
  canShowContrastMessage: boolean;
  setCanShowContrastMessage: React.Dispatch<React.SetStateAction<boolean>>;
  selectedElement: BannerElementType;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: () => void;
  handleBannerClick: (e: React.MouseEvent) => void;
  bannerStyle: React.CSSProperties;
  headingStyle: React.CSSProperties;
  imageStyle: React.CSSProperties;
  bannerPosition: BannerPosition;
  bannerStyles: BannerElementStyle;
  headingStyles: BannerElementStyle;
  imageStyles: BannerElementStyle;
};
