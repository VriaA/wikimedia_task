import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { bannerContext } from '../contexts/context';
import type {
  BannerContext,
  ViewportType,
  BannerElementType
} from '../types/banner';
import { fontWeights, defaultFontWeight } from '../constants/FontWeights';
import type { UseEditor } from '../types/editor';

export default function useEditor(): UseEditor {
  const {
    elements,
    selectedElement,
    currentViewport,
    setCurrentViewport,
    updateElementStyle
  } = useContext(bannerContext) as BannerContext;
  const [selectedFont, setSelectedFont] = useState('');

  // FINDS THE FONT OF THE SELECTED ELEMENT
  useEffect(() => {
    if (
      selectedElement === 'text' &&
      elements.text?.[currentViewport]?.fontFamily
    ) {
      const fontName = elements.text[currentViewport].fontFamily.toLowerCase();
      setSelectedFont(fontName);
    }
  }, [selectedElement, elements.text, currentViewport]);

  // GETS AVAILABLE FONT WEIGHTS FOR THE SELECTED FONT OR FALLS BACK TO DEFAULT
  const fontWeightsToRender = useMemo(
    () =>
      selectedFont
        ? fontWeights[selectedFont.toLowerCase()]?.weights || [
            defaultFontWeight
          ]
        : [defaultFontWeight],
    [selectedFont]
  );

  // GETS THE STYLES OF THE SELECTED ELEMENT FOR THE CURRENT VIEWPORT
  const selectedElementStyle = useMemo(
    () => (selectedElement ? elements[selectedElement][currentViewport] : null),
    [selectedElement, elements, currentViewport]
  );

  // REUSEABLE HANDLER FOR KNOWN ELEMENT TYPES
  const elementUpdateHandler = useCallback(
    (elementType: BannerElementType | null, property: string) =>
      (value: string | number) => {
        if (selectedElement === elementType) {
          updateElementStyle(selectedElement, currentViewport, {
            [property]: value
          });
        }
      },
    [currentViewport, selectedElement, updateElementStyle]
  );

  const handleDirChange = elementUpdateHandler('banner', 'dir');

  const handleFontSizeChange = elementUpdateHandler('text', 'fontSize');

  const handleFontWeightChange = elementUpdateHandler('text', 'fontWeight');

  const handleLineHeightChange = elementUpdateHandler('text', 'lineHeight');

  const handleLetterSpacingChange = elementUpdateHandler(
    'text',
    'letterSpacing'
  );

  const handleAltTextChange = elementUpdateHandler('image', 'imgAlt');

  const handleColorChange = elementUpdateHandler('text', 'color');

  const handleTextChange = elementUpdateHandler('text', 'textContent');

  const handleLinkChange = elementUpdateHandler('banner', 'bannerLink');

  // REUSEABLE FUNCTION FOR UPDATING PADDING, POSITION, AND BORDER
  const handleSideUpdate = useCallback(
    (
      property: 'padding' | 'position' | 'border',
      side: string,
      value: number
    ) => {
      if (
        selectedElement &&
        elements[selectedElement]?.[currentViewport]?.[property]
      ) {
        updateElementStyle(selectedElement, currentViewport, {
          [property]: {
            ...elements[selectedElement][currentViewport][property],
            [side]: value
          }
        });
      }
    },
    [currentViewport, elements, selectedElement, updateElementStyle]
  );

  const handlePaddingChange = useCallback(
    (side: string, value: number) => handleSideUpdate('padding', side, value),
    [handleSideUpdate]
  );

  const handlePositionChange = useCallback(
    (side: string, value: number) => handleSideUpdate('position', side, value),
    [handleSideUpdate]
  );

  const handleBorderChange = useCallback(
    (side: string, value: number) => handleSideUpdate('border', side, value),
    [handleSideUpdate]
  );

  const handleViewportChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentViewport(event.target.value as ViewportType);
    },
    [setCurrentViewport]
  );

  const handleFontChange = useCallback(
    (fontValue: string) => {
      setSelectedFont(fontValue);
      if (selectedElement === 'text') {
        updateElementStyle(selectedElement, currentViewport, {
          fontFamily: fontValue
        });
      }
    },
    [currentViewport, selectedElement, updateElementStyle]
  );

  const handleWidthChange = useCallback(
    (value: number) => {
      if (selectedElement) {
        updateElementStyle(selectedElement, currentViewport, {
          width: value
        });
      }
    },
    [currentViewport, selectedElement, updateElementStyle]
  );

  const handleHeightChange = useCallback(
    (value: number) => {
      if (selectedElement) {
        updateElementStyle(selectedElement, currentViewport, {
          height: value
        });
      }
    },
    [currentViewport, selectedElement, updateElementStyle]
  );

  const handleBgColorChange = useCallback(
    (color: string) => {
      if (selectedElement === 'banner') {
        updateElementStyle(selectedElement, currentViewport, {
          backgroundColor: color,
          backgroundImage: ''
        });
      }
    },
    [currentViewport, selectedElement, updateElementStyle]
  );

  const handleBorderColorChange = useCallback(
    (borderColor: string) => {
      if (selectedElement) {
        updateElementStyle(selectedElement, currentViewport, { borderColor });
      }
    },
    [currentViewport, selectedElement, updateElementStyle]
  );

  const handleImageChange = useCallback(
    (file: File) => {
      if (!selectedElement || !file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          const result = e.target.result as string;

          if (selectedElement === 'banner') {
            updateElementStyle(selectedElement, currentViewport, {
              backgroundImage: result,
              backgroundColor: undefined
            });
          } else if (selectedElement === 'image') {
            updateElementStyle(selectedElement, currentViewport, {
              src: result
            });
          }
        }
      };

      reader.readAsDataURL(file);
    },
    [currentViewport, selectedElement, updateElementStyle]
  );

  return useMemo(
    () => ({
      currentViewport,
      handleViewportChange,
      selectedElementStyle,
      handleBorderChange,
      fontWeightsToRender,
      handleBgColorChange,
      handleBorderColorChange,
      handleImageChange,
      handleColorChange,
      handleFontChange,
      handleDirChange,
      handleFontSizeChange,
      handleFontWeightChange,
      handleHeightChange,
      handleLetterSpacingChange,
      handleLineHeightChange,
      handlePositionChange,
      handlePaddingChange,
      handleTextChange,
      handleWidthChange,
      handleLinkChange,
      handleAltTextChange,
      selectedElement
    }),
    [
      currentViewport,
      fontWeightsToRender,
      handleAltTextChange,
      handleBgColorChange,
      handleBorderChange,
      handleBorderColorChange,
      handleColorChange,
      handleDirChange,
      handleFontChange,
      handleFontSizeChange,
      handleFontWeightChange,
      handleHeightChange,
      handleImageChange,
      handleLetterSpacingChange,
      handleLineHeightChange,
      handleLinkChange,
      handlePaddingChange,
      handlePositionChange,
      handleTextChange,
      handleViewportChange,
      handleWidthChange,
      selectedElement,
      selectedElementStyle
    ]
  );
}
