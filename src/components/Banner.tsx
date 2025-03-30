import React, { useContext, useRef } from 'react';
import CloseIcon from '../assets/close_icon.svg?react';
import EditIcon from '../assets/edit_icon.svg?react';
import PreviewIcon from '../assets/play_icon.svg?react';
import './styles/Banner.css';
import useBanner from '../hooks/useBanner';
import { AppContext } from '../contexts/context';
import { appContext } from '../contexts/context';
import Message from './Message';

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useContext(appContext) as AppContext;
  const {
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
  } = useBanner(bannerRef);

  return (
    <section
      className='banner-wrapper'
      style={{ display: isVisible ? 'block' : 'none', ...bannerPosition }}>
      <div
        ref={bannerRef}
        className={`banner ${selectedElement === 'banner' ? 'selected' : ''}`}
        style={bannerStyle}
        onClick={handleBannerClick}
        data-element='banner'
        data-testid='banner'>
        {bannerStyles.backgroundImage && (
          <div
            className='banner-bg-image-overlay'
            data-testid='banner-bg-image-overlay'
            data-element='banner'></div>
        )}

        {bannerStyles.bannerLink && (
          <a
            data-testid='banner-link'
            aria-label={bannerStyles.bannerLinkLabel}
            href={bannerStyles.bannerLink}
            style={{ display: `${mode === 'preview' ? 'block' : 'none'}` }}
            className='banner-overlay-link'></a>
        )}

        <h2
          className={`banner-heading ${selectedElement === 'heading' ? 'selected' : ''}`}
          style={headingStyle}
          data-element='heading'
          data-testid='heading'>
          {headingStyles.textContent ||
            'Your Outie loves contributing to Open Source Software.'}
        </h2>
        <img
          src={imageStyles.src || '/images/ms_casey.png'}
          alt='Ms Casey'
          className={`banner-image ${selectedElement === 'image' ? 'selected' : ''}`}
          style={imageStyle}
          data-element='image'
          data-testid='banner-image'
        />
        <button
          type='button'
          className='close-banner-btn flex-center'
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          aria-label='Close banner'
          data-testid='close-banner-btn'>
          <CloseIcon />
        </button>
      </div>

      {mode === 'edit' &&
        canShowContrastMessage &&
        (selectedElement === 'banner' || selectedElement === 'heading') && (
          <Message
            id='banner-error-message'
            type='error'
            className='banner-error-message'
            message='Low contrast: Text may be hard to read.'
            onClose={(e: React.MouseEvent) => {
              e.stopPropagation();
              setCanShowContrastMessage(false);
            }}
          />
        )}

      {!selectedElement && (
        <button
          type='button'
          className='mode-btn'
          data-testid='mode-btn'
          onClick={toggleMode}>
          {mode === 'preview' ? 'Edit Banner' : 'Preview Banner'}
          {mode === 'preview' ? <EditIcon /> : <PreviewIcon />}
        </button>
      )}
    </section>
  );
}
