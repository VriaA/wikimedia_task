import React from 'react';
import useBanner from '../../hooks/useBanner';

export default function BannerContent({
  isPreviewMode
}: {
  isPreviewMode: boolean;
}) {
  const {
    currentTextStyle,
    currentImageStyle,
    textConfig,
    imageConfig,
    selectedElement
  } = useBanner();

  return (
    <>
      <p
        tabIndex={isPreviewMode ? undefined : 0}
        className={`banner-text ${selectedElement === 'text' ? 'selected' : ''}`}
        style={currentTextStyle}
        data-element='text'
        data-testid='banner-text'>
        {textConfig.textContent}
      </p>

      <img
        tabIndex={isPreviewMode ? undefined : 0}
        src={imageConfig.src}
        alt={imageConfig.imgAlt}
        className={`banner-image ${selectedElement === 'image' ? 'selected' : ''}`}
        style={currentImageStyle}
        data-element='image'
        data-testid='banner-image'
      />
    </>
  );
}
