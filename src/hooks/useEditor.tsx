import { useState, useEffect, useContext } from 'react';
import { bannerContext } from '../contexts/context';
import type { BannerContext } from '../types/banner';
import { fontWeights, defaultFontWeight } from '../constants/FontWeights';
import type { UseEditor } from '../types/editor';

export default function useEditor(): UseEditor {
  const { elements, selectedElement, currentViewport, updateElementStyle } =
    useContext(bannerContext) as BannerContext;
  const [selectedFont, setSelectedFont] = useState('');

  // FINDS THE FONT OF THE SELECTED ELEMENT
  useEffect(() => {
    if (
      selectedElement === 'text' &&
      elements.text[currentViewport].fontFamily
    ) {
      const fontName = elements.text[currentViewport].fontFamily.toLowerCase();
      setSelectedFont(fontName);
    }
  }, [selectedElement, elements, currentViewport]);

  // GETS AVAILABLE FONT WEIGHTS FOR THE SELECTED FONT OR FALLS BACK TO DEFAULT
  const fontWeightsToRender = selectedFont
    ? fontWeights[selectedFont.toLowerCase()]?.weights || [defaultFontWeight]
    : [defaultFontWeight];

  // GETS THE STYLES OF THE SELECTED ELEMENT FOR THE CURRENT VIEWPORT
  const selectedElementStyle = selectedElement
    ? elements[selectedElement][currentViewport]
    : null;

  function handleTextChange(value: string) {
    if (selectedElement === 'text') {
      updateElementStyle(selectedElement, currentViewport, {
        textContent: value
      });
    }
  }

  function handleLinkChange(value: string) {
    if (selectedElement === 'banner') {
      updateElementStyle(selectedElement, currentViewport, {
        bannerLink: value
      });
    }
  }

  function handleFontChange(fontValue: string) {
    setSelectedFont(fontValue);
    if (selectedElement === 'text') {
      updateElementStyle(selectedElement, currentViewport, {
        fontFamily: fontValue
      });
    }
  }

  function handleDirChange(value: string) {
    if (selectedElement === 'banner') {
      updateElementStyle(selectedElement, currentViewport, {
        dir: value
      });
    }
  }

  function handleFontSizeChange(value: number) {
    if (selectedElement === 'text') {
      updateElementStyle(selectedElement, currentViewport, {
        fontSize: value
      });
    }
  }

  function handleFontWeightChange(value: string) {
    if (selectedElement === 'text') {
      updateElementStyle(selectedElement, currentViewport, {
        fontWeight: value
      });
    }
  }

  function handleLineHeightChange(value: number) {
    if (selectedElement === 'text') {
      updateElementStyle(selectedElement, currentViewport, {
        lineHeight: value
      });
    }
  }

  function handleLetterSpacingChange(value: number) {
    if (selectedElement === 'text') {
      updateElementStyle(selectedElement, currentViewport, {
        letterSpacing: value
      });
    }
  }

  function handleWidthChange(value: number) {
    if (selectedElement) {
      updateElementStyle(selectedElement, currentViewport, {
        width: value
      });
    }
  }

  function handleHeightChange(value: number) {
    if (selectedElement) {
      updateElementStyle(selectedElement, currentViewport, {
        height: value
      });
    }
  }

  function handlePaddingChange(
    side: 'top' | 'right' | 'bottom' | 'left',
    value: number
  ) {
    if (selectedElement) {
      updateElementStyle(selectedElement, currentViewport, {
        padding: {
          ...elements[selectedElement][currentViewport].padding,
          [side]: value
        }
      });
    }
  }

  function handlePositionChange(
    side: 'top' | 'right' | 'bottom' | 'left',
    value: number
  ) {
    if (selectedElement) {
      updateElementStyle(selectedElement, currentViewport, {
        position: {
          ...elements[selectedElement][currentViewport].position,
          [side]: value
        }
      });
    }
  }

  function handleColorChange(color: string) {
    if (selectedElement === 'text') {
      updateElementStyle(selectedElement, currentViewport, { color });
    }
  }

  function handleBgColorChange(color: string) {
    if (selectedElement === 'banner') {
      updateElementStyle(selectedElement, currentViewport, {
        backgroundColor: color,
        backgroundImage: ''
      });
    }
  }

  function handleBorderChange(
    side: 'top' | 'right' | 'bottom' | 'left',
    value: number
  ) {
    if (selectedElement) {
      updateElementStyle(selectedElement, currentViewport, {
        border: {
          ...elements[selectedElement][currentViewport].border,
          [side]: value
        }
      });
    }
  }

  function handleBorderColorChange(borderColor: string) {
    updateElementStyle(selectedElement, currentViewport, { borderColor });
  }

  function handleImageChange(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        if (selectedElement === 'banner') {
          updateElementStyle(selectedElement, currentViewport, {
            backgroundImage: e.target.result as string,
            backgroundColor: undefined
          });
        }
        if (selectedElement === 'image') {
          updateElementStyle(selectedElement, currentViewport, {
            src: e.target.result as string
          });
        }
      }
    };

    reader.readAsDataURL(file);
  }

  function handleAltTextChange(value: string) {
    if (selectedElement === 'image') {
      updateElementStyle(selectedElement, currentViewport, {
        imgAlt: value
      });
    }
  }

  return {
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
  };
}
