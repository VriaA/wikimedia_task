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
    updateElementConfig
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
  const selectedElementConfig = useMemo(
    () => (selectedElement ? elements[selectedElement][currentViewport] : null),
    [selectedElement, elements, currentViewport]
  );

  // REUSEABLE HANDLER FOR KNOWN ELEMENT TYPES
  const elementUpdateHandler = useCallback(
    (elementType: BannerElementType | null, property: string) =>
      (value: string | number) => {
        if (selectedElement === elementType) {
          updateElementConfig(selectedElement, currentViewport, {
            [property]: value
          });
        }
      },
    [currentViewport, selectedElement, updateElementConfig]
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
        updateElementConfig(selectedElement, currentViewport, {
          [property]: {
            ...elements[selectedElement][currentViewport][property],
            [side]: value
          }
        });
      }
    },
    [currentViewport, elements, selectedElement, updateElementConfig]
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
        updateElementConfig(selectedElement, currentViewport, {
          fontFamily: fontValue
        });
      }
    },
    [currentViewport, selectedElement, updateElementConfig]
  );

  const handleWidthChange = useCallback(
    (value: number) => {
      if (selectedElement) {
        updateElementConfig(selectedElement, currentViewport, {
          width: value
        });
      }
    },
    [currentViewport, selectedElement, updateElementConfig]
  );

  const handleHeightChange = useCallback(
    (value: number) => {
      if (selectedElement) {
        updateElementConfig(selectedElement, currentViewport, {
          height: value
        });
      }
    },
    [currentViewport, selectedElement, updateElementConfig]
  );

  const handleBgColorChange = useCallback(
    (color: string) => {
      if (selectedElement === 'banner') {
        updateElementConfig(selectedElement, currentViewport, {
          backgroundColor: color,
          backgroundImage: ''
        });
      }
    },
    [currentViewport, selectedElement, updateElementConfig]
  );

  const handleBorderColorChange = useCallback(
    (borderColor: string) => {
      if (selectedElement) {
        updateElementConfig(selectedElement, currentViewport, { borderColor });
      }
    },
    [currentViewport, selectedElement, updateElementConfig]
  );

  const handleImageChange = useCallback(
    (file: File) => {
      if (!selectedElement || !file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          const result = e.target.result as string;

          if (selectedElement === 'banner') {
            updateElementConfig(selectedElement, currentViewport, {
              backgroundImage: result,
              backgroundColor: undefined
            });
          } else if (selectedElement === 'image') {
            updateElementConfig(selectedElement, currentViewport, {
              src: result
            });
          }
        }
      };

      reader.readAsDataURL(file);
    },
    [currentViewport, selectedElement, updateElementConfig]
  );

  return useMemo(
    () => ({
      currentViewport,
      handleViewportChange,
      selectedElementConfig,
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
      selectedElementConfig
    ]
  );
}
