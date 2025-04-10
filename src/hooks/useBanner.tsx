import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import type { AppContext } from '../contexts/context';
import { appContext, bannerContext } from '../contexts/context';
import {
  BannerContext,
  BannerElementType,
  ViewportType,
  UseBanner
} from '../types/banner';
import {
  getCurrentBannerStyle,
  getCurrenttextStyle,
  getCurrentImageStyle
} from '../components/styles/BannerElements';
import tinycolor from 'tinycolor2';

export default function useBanner(
  bannerRef?: React.RefObject<HTMLDivElement | null>
): UseBanner {
  const { mode, setMode } = useContext(appContext) as AppContext;
  const { elements, selectedElement, setSelectedElement, currentViewport } =
    useContext(bannerContext) as BannerContext;

  const [isVisible, setIsVisible] = useState(true);
  const [bannerWidth, setBannerWidth] = useState<string>('');
  const [activeViewport, setActiveViewport] =
    useState<ViewportType>(currentViewport);
  const [canShowContrastMessage, setCanShowContrastMessage] =
    useState<boolean>(false);

  const bannerStyles = elements.banner[activeViewport];
  const textStyles = elements.text[activeViewport];
  const imageStyles = elements.image[activeViewport];

  const bannerStyle = getCurrentBannerStyle(bannerStyles, mode, bannerWidth);
  const textStyle = getCurrenttextStyle(textStyles);
  const imageStyle = getCurrentImageStyle(imageStyles);

  const bannerPosition = useMemo(
    () =>
      selectedElement && mode === 'edit'
        ? { position: 'sticky' as const, top: '20px' }
        : {},
    [mode, selectedElement]
  );

  // FOCUSES ON THE BANNER WHEN THE MODE IS SWITCHED TO EDIT
  useEffect(() => {
    if (mode === 'edit') {
      bannerRef?.current?.focus();
    }
  }, [mode, bannerRef]);

  // SCROLLS TO THE TOP WHEN A BANNER ELEMENT IS DESELECTED
  useEffect(() => {
    if (selectedElement) return;
    window.scroll({ top: 0 });
  }, [selectedElement]);

  // SETS THE ACTIVE VIEWPORT BASED ON SCREEN SIZE
  // USED TO DETERMINE THE BANNER WIDTH
  // IN PREVIEW MODE, WIDTH MATCHES DEVICE WIDTH
  // IN EDIT MODE, WIDTH USES THE SELECTED VIEWPORT

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      let newActiveViewport: ViewportType;
      if (mode === 'preview') {
        newActiveViewport =
          width < 720 ? 'mobile' : width < 1200 ? 'tablet' : 'desktop';
      } else {
        newActiveViewport = currentViewport;
      }

      setActiveViewport(newActiveViewport);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentViewport, mode]);

  // DESELECTS SELECTED ELEMENT ON CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const editor = document.getElementById('editor') as HTMLDivElement;
      const clickTarget = event.target as HTMLElement;
      if (
        mode === 'edit' &&
        bannerRef?.current &&
        !bannerRef.current.contains(clickTarget) &&
        !editor.contains(clickTarget)
      ) {
        setSelectedElement(null);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mode, setSelectedElement, bannerRef]);

  // SETS THE BANNER WIDTH BASED ON THE SELECTED VIEWPORT
  // BANNER SPANS THE FULL VIEWPORT WIDTH IN LARGE SCREENS
  useEffect(() => {
    let newBannerWidth: string;
    function updateBannerWidth() {
      switch (currentViewport) {
        case 'mobile':
          newBannerWidth = '375px';
          break;
        case 'tablet':
          newBannerWidth = '720px';
          break;
        case 'desktop':
          newBannerWidth = window.innerWidth >= 1200 ? '100%' : '1200px';
          break;
      }
      setBannerWidth(newBannerWidth);
    }
    updateBannerWidth();
    window.addEventListener('resize', updateBannerWidth);
    return () => window.removeEventListener('resize', updateBannerWidth);
  }, [currentViewport]);

  // CHECKS CONTRAST AND CHANGES CONTRAST MESSAGE VISIBILITY ACCORDINGLY
  useEffect(() => {
    if (
      bannerStyle.backgroundImage ||
      !bannerStyle.backgroundColor ||
      !textStyle.color
    )
      return;
    const fontSize = textStyle.fontSize;
    const isBold =
      textStyle.fontWeight &&
      ['700', '800', '900'].includes(textStyle.fontWeight);

    // WCAG LARGE TEXT DEFINITION (19pts or 14pts bold)
    const isLargeText =
      fontSize && (fontSize >= 24 || (fontSize >= 18.67 && isBold));

    const isValidContrastRatio = tinycolor.isReadable(
      textStyle.color,
      bannerStyle.backgroundColor,
      {
        level: 'AA',
        size: isLargeText ? 'large' : 'small'
      }
    );
    setCanShowContrastMessage(!isValidContrastRatio);
  }, [
    textStyle.color,
    bannerStyle.backgroundColor,
    bannerStyle.backgroundImage,
    textStyle.fontSize,
    textStyle.fontWeight
  ]);

  // TOGGLES MODE BETWEEN EDIT & PREVIEW
  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'preview' ? 'edit' : 'preview'));
  }, [setMode]);

  const selectElement = useCallback((target: HTMLElement) => {
    let elementType: BannerElementType = null;
    switch (target.dataset.element) {
      case 'text':
        elementType = 'text';
        break;
      case 'image':
        elementType = 'image';
        break;
      case 'banner':
        elementType = 'banner';
        break;
    }
    return elementType;
  }, []);

  // SELECTS BANNER ELEMENT ON CLICK
  const handleBannerClick = useCallback(
    (e: React.MouseEvent) => {
      if (mode !== 'edit') return;
      const target = e.target as HTMLElement;
      const selectedElement = selectElement(target);
      setSelectedElement(selectedElement);
    },
    [mode, setSelectedElement, selectElement]
  );

  // SELECTS OR DESELECTS BANNER ELEMENT ON KEY PRESS
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (mode !== 'edit') return;

      if (selectedElement && e.key === 'Escape') {
        e.preventDefault();
        setSelectedElement(null);
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        if (e.key === ' ') e.preventDefault();
        const newSelectedElement = selectElement(e.target as HTMLElement);
        setSelectedElement(newSelectedElement);
      }
    },
    [mode, setSelectedElement, selectedElement, selectElement]
  );

  const handleDeselectButtonClick = useCallback(() => {
    setSelectedElement(null);
    bannerRef?.current && bannerRef?.current.focus();
  }, [bannerRef, setSelectedElement]);

  return useMemo(
    () => ({
      handleDeselectButtonClick,
      canShowContrastMessage,
      setCanShowContrastMessage,
      selectedElement,
      isVisible,
      setIsVisible,
      toggleMode,
      handleBannerClick,
      handleKeyDown,
      bannerStyle,
      textStyle,
      imageStyle,
      bannerPosition,
      bannerStyles,
      textStyles,
      imageStyles
    }),
    [
      bannerPosition,
      bannerStyle,
      bannerStyles,
      canShowContrastMessage,
      handleBannerClick,
      handleDeselectButtonClick,
      handleKeyDown,
      imageStyle,
      imageStyles,
      isVisible,
      selectedElement,
      textStyle,
      textStyles,
      toggleMode
    ]
  );
}
