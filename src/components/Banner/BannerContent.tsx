import React from 'react';
import useBanner from '../../hooks/useBanner';

export default function BannerContent({
  isPreviewMode
}: {
  isPreviewMode: boolean;
}) {
  const { textStyle, imageStyle, textStyles, imageStyles, selectedElement } =
    useBanner();

  return (
    <>
      <p
        tabIndex={isPreviewMode ? undefined : 0}
        className={`banner-text ${selectedElement === 'text' ? 'selected' : ''}`}
        style={textStyle}
        data-element='text'
        data-testid='banner-text'>
        {textStyles.textContent}
      </p>

      <img
        tabIndex={isPreviewMode ? undefined : 0}
        src={imageStyles.src}
        alt={imageStyles.imgAlt}
        className={`banner-image ${selectedElement === 'image' ? 'selected' : ''}`}
        style={imageStyle}
        data-element='image'
        data-testid='banner-image'
      />
    </>
  );
}
