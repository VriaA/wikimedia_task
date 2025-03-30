import React, { useState, ReactNode } from 'react';
import { bannerContext } from './context';
import {
  BannerElementStyle,
  BannerElements,
  ViewportType,
  BannerElementType
} from '../types/banner';
import { initialElements } from '../components/styles/BannerElements';

export function BannerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<BannerElements>(initialElements);
  const [selectedElement, setSelectedElement] =
    useState<BannerElementType>(null);
  const [currentViewport, setCurrentViewport] =
    useState<ViewportType>('desktop');

  function updateElementStyle(
    element: BannerElementType,
    viewport: ViewportType,
    style: Partial<BannerElementStyle>
  ) {
    if (!element) return;

    setElements((prev) => {
      const newElements = { ...prev };
      newElements[element][viewport] = {
        ...prev[element][viewport],
        ...style
      };

      return newElements;
    });
  }

  return (
    <bannerContext.Provider
      value={{
        elements,
        selectedElement,
        currentViewport,
        setSelectedElement,
        setCurrentViewport,
        updateElementStyle
      }}>
      {children}
    </bannerContext.Provider>
  );
}
