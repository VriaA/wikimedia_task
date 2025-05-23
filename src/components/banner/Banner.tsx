import React, { useContext, useRef } from 'react';
import CloseIcon from '../../assets/close_icon.svg?react';
import CloseIconThin from '../../assets/close_icon_thin.svg?react';
import EditIcon from '../../assets/edit_icon.svg?react';
import PreviewIcon from '../../assets/play_icon.svg?react';
import '../styles/Banner.css';
import useBanner from '../../hooks/useBanner';
import { AppContext } from '../../contexts/context';
import { appContext } from '../../contexts/context';
import BannerContent from './BannerContent';
import Message from '../Message';

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const bannerWrapperRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useContext(appContext) as AppContext;
  const {
    canShowContrastMessage,
    setCanShowContrastMessage,
    selectedElement,
    handleDeselectButtonClick,
    isVisible,
    setIsVisible,
    toggleMode,
    handleBannerClick,
    handleKeyDown,
    currentBannerStyle,
    bannerPosition,
    bannerConfig
  } = useBanner(bannerRef, bannerWrapperRef);
  const isPreviewMode = mode === 'preview';

  return (
    <>
      <div
        ref={bannerWrapperRef}
        className='banner-wrapper'
        {...(!isPreviewMode && { role: 'region' })}
        {...(!isPreviewMode && { 'aria-labelledby': 'edit-mode-heading' })}
        style={{ display: isVisible ? 'block' : 'none', ...bannerPosition }}>
        <div
          dir={bannerConfig.dir}
          {...(isPreviewMode && { role: 'banner' })}
          ref={bannerRef}
          className={`banner ${selectedElement === 'banner' ? 'selected' : ''}`}
          style={currentBannerStyle}
          onClick={handleBannerClick}
          onKeyDown={handleKeyDown}
          data-element='banner'
          data-testid='banner'
          {...(!isPreviewMode && { tabIndex: 0 })}>
          {bannerConfig.backgroundImage && (
            <div
              className='banner-bg-image-overlay'
              data-testid='banner-bg-image-overlay'
              data-element='banner'></div>
          )}

          {isPreviewMode ? (
            <a
              className='banner-link'
              href={bannerConfig.bannerLink}
              data-testid='banner-link'>
              <BannerContent isPreviewMode={isPreviewMode} />
            </a>
          ) : (
            <BannerContent isPreviewMode={isPreviewMode} />
          )}

          <button
            type='button'
            className='close-banner-btn flex-center'
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            aria-label='Close banner'
            data-testid='close-banner-btn'>
            <CloseIcon aria-hidden='true' />
          </button>
        </div>

        {!isPreviewMode &&
          canShowContrastMessage &&
          (selectedElement === 'banner' || selectedElement === 'text') && (
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
            {isPreviewMode ? 'Edit Banner' : 'Preview Banner'}
            {isPreviewMode ? (
              <EditIcon aria-hidden='true' />
            ) : (
              <PreviewIcon aria-hidden='true' />
            )}
          </button>
        )}

        <div
          className='sr-only'
          aria-live='polite'
          aria-atomic='true'>
          {selectedElement && `${selectedElement} selected`}
        </div>
      </div>
      {mode === 'edit' && selectedElement && (
        <button
          type='button'
          className='deselect-btn flex-center'
          onClick={handleDeselectButtonClick}
          aria-label='Deselect selected element'
          data-testid='deselect-btn'>
          <CloseIconThin aria-hidden='true' />
        </button>
      )}
    </>
  );
}
