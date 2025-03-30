import React, { useContext, useState, useEffect } from 'react';
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
  getCurrentHeadingStyle,
  getCurrentImageStyle
} from '../components/styles/BannerElements';
import ColorContrastChecker from 'color-contrast-checker';

export default function useBanner(
  bannerRef: React.RefObject<HTMLDivElement | null>
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
  const headingStyles = elements.heading[activeViewport];
  const imageStyles = elements.image[activeViewport];

  const bannerStyle = getCurrentBannerStyle(bannerStyles, mode, bannerWidth);
  const headingStyle = getCurrentHeadingStyle(headingStyles);
  const imageStyle = getCurrentImageStyle(imageStyles);

  const bannerPosition =
    selectedElement && mode === 'edit'
      ? { position: 'sticky' as const, top: '20px' }
      : {};

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
    const ccc = new ColorContrastChecker();
    if (bannerStyle.backgroundColor && headingStyle.color) {
      const isContrastGood = ccc.isLevelAA(
        headingStyle.color,
        bannerStyle.backgroundColor,
        headingStyle.fontSize
      );
      isContrastGood
        ? setCanShowContrastMessage(false)
        : setCanShowContrastMessage(true);
    }
  }, [headingStyle.color, bannerStyle.backgroundColor, headingStyle.fontSize]);

  // TOGGLES MODE BETWEEN EDIT & PREVIEW
  function toggleMode() {
    setMode((prevMode) => (prevMode === 'preview' ? 'edit' : 'preview'));
  }

  // HANDLES BANNER ELEMENT SELECTIONS
  function handleBannerClick(e: React.MouseEvent) {
    if (mode !== 'edit') return;

    e.preventDefault();

    const target = e.target as HTMLElement;
    let elementType: BannerElementType = null;
    switch (target.dataset.element) {
      case 'heading':
        elementType = 'heading';
        break;
      case 'image':
        elementType = 'image';
        break;
      case 'banner':
        elementType = 'banner';
        break;
    }
    setSelectedElement(elementType);
  }

  return {
    canShowContrastMessage,
    setCanShowContrastMessage,
    selectedElement,
    isVisible,
    setIsVisible,
    toggleMode,
    handleBannerClick,
    bannerStyle,
    headingStyle,
    imageStyle,
    bannerPosition,
    bannerStyles,
    headingStyles,
    imageStyles
  };
}
