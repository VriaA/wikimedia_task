import React, { useState, ReactNode, useCallback, useMemo } from 'react';
import { bannerContext } from './context';
import {
  BannerElementConfig,
  BannerElements,
  ViewportType,
  BannerElementType
} from '../types/banner';
import { initialBannerConfig } from '../constants/bannerPresets';

export function BannerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<BannerElements>(initialBannerConfig);
  const [selectedElement, setSelectedElement] =
    useState<BannerElementType>(null);
  const [currentViewport, setCurrentViewport] =
    useState<ViewportType>('desktop');

  const updateElementConfig = useCallback(
    (
      element: BannerElementType,
      viewport: ViewportType,
      style: Partial<BannerElementConfig>
    ) => {
      if (!element) return;

      setElements((prev) => {
        const newElements = { ...prev };
        newElements[element][viewport] = {
          ...prev[element][viewport],
          ...style
        };

        return newElements;
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      elements,
      selectedElement,
      currentViewport,
      setSelectedElement,
      setCurrentViewport,
      updateElementConfig
    }),
    [elements, selectedElement, currentViewport, updateElementConfig]
  );
  return (
    <bannerContext.Provider value={value}>{children}</bannerContext.Provider>
  );
}
