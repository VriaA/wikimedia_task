import React, { useContext } from 'react';
import { bannerContext } from '../../contexts/context';
import type { BannerContext, ViewportType } from '../../types/banner';
import ColorPicker from './ColorPicker';
import ImageUploader from './ImageUploader';
import NumberInput from './NumberInput';
import DropdownMenu from './DropdownMenu';
import TextArea from './TextArea';
import TextInput from './TextInput';
import RadioGroup from '../RadioGroup';
import SectionHeading from '../SectionHeader';
import fontFamily from '../../constants/fontFamily';
import useEditor from '../../hooks/useEditor';
import './styles/Editor.css';

export default function Editor() {
  const {
    selectedElementStyle,
    handleBorderChange,
    fontWeightsToRender,
    handleBgColorChange,
    handleBorderColorChange,
    handleImageChange,
    handleColorChange,
    handleFontChange,
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
    handleLinkLabelChange,
    selectedElement
  } = useEditor();

  const { currentViewport, setCurrentViewport } = useContext(
    bannerContext
  ) as BannerContext;
  const canShowImageUploader =
    selectedElement === 'banner' || selectedElement === 'image';
  const canDisablePositionAndPaddingInputs =
    selectedElement === 'banner' || selectedElement === 'image';

  function handleViewportChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setCurrentViewport(target.value as ViewportType);
  }

  function getBannerLinkLabel(
    link: string | undefined,
    label: string | undefined
  ) {
    if (link) {
      return label ? label : `Visit ${link}`;
    }
    return '';
  }

  return (
    <div
      id='editor'
      className='editor-wrapper flex-column'
      data-testid='editor'>
      <SectionHeading
        text='Customization Form'
        type='main'
        subtext={
          selectedElement
            ? `Editing ${selectedElement} element`
            : 'Select an element on the banner to edit its properties'
        }
      />

      <form className='customization-form flex-column'>
        <section className='viewport-section'>
          <SectionHeading
            text='Device viewport'
            type='form'
          />
          <div className='viewport-inputs'>
            <RadioGroup
              heading=''
              name='deviceViewport'
              options={[
                { id: 'viewport-mobile', label: 'Mobile', value: 'mobile' },
                { id: 'viewport-tablet', label: 'Tablet', value: 'tablet' },
                { id: 'viewport-desktop', label: 'Desktop', value: 'desktop' }
              ]}
              value={currentViewport}
              onChange={handleViewportChange}
            />
          </div>
        </section>

        <section className='typography-section'>
          <SectionHeading
            text='Typography'
            type='form'
          />
          <div className='typography-inputs'>
            <TextArea
              id='banner-text-field'
              label='Text'
              value={selectedElementStyle?.textContent || ''}
              onChange={handleTextChange}
              className='typography-textarea transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'heading'}
            />

            <TextInput
              id='banner-link-field'
              label='Banner Link'
              value={selectedElementStyle?.bannerLink || ''}
              onChange={handleLinkChange}
              className='typography-link transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'banner'}
            />

            <TextInput
              id='banner-link-aria-label'
              label='Banner Link Aria Label'
              value={getBannerLinkLabel(
                selectedElementStyle?.bannerLink,
                selectedElementStyle?.bannerLinkLabel
              )}
              onChange={handleLinkLabelChange}
              className='typography-link-label transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'banner'}
            />

            <DropdownMenu
              id='font-family-dropdown'
              label='Font Family'
              options={fontFamily}
              value={selectedElementStyle?.fontFamily || ''}
              onChange={handleFontChange}
              className='typography-font-family transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'heading'}
            />

            <ColorPicker
              label='Color'
              elementColor={selectedElementStyle?.color || '#000'}
              onChange={handleColorChange}
              className='typography-color transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'heading'}
              id='text-color-picker'
            />

            <NumberInput
              id='font-size-field'
              min={0}
              step={1}
              label='Font Size'
              value={selectedElementStyle?.fontSize}
              onChange={handleFontSizeChange}
              className='typography-font-size transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'heading'}
            />

            <DropdownMenu
              id='font-weight-dropdown'
              label='Font Weight'
              value={selectedElementStyle?.fontWeight || '400'}
              options={fontWeightsToRender}
              onChange={handleFontWeightChange}
              className='typography-font-weight transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'heading'}
            />

            <NumberInput
              id='line-height-field'
              min={0}
              label='Line height'
              value={selectedElementStyle?.lineHeight || 1.5}
              onChange={handleLineHeightChange}
              className='typography-line-height transition-opacity-300-ease'
              step={0.1}
              disabled={!selectedElement || selectedElement !== 'heading'}
            />

            <NumberInput
              id='letter-spacing-field'
              min={0}
              step={0.01}
              label='Letter Spacing'
              value={selectedElementStyle?.letterSpacing}
              onChange={handleLetterSpacingChange}
              className='typography-letter-spacing transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'heading'}
            />
          </div>
        </section>

        <section className='layout-section'>
          <SectionHeading
            text='Layout'
            type='form'
          />
          <div className='layout-inputs'>
            <NumberInput
              id='width-field'
              min={0}
              step={1}
              label='Width'
              value={selectedElementStyle?.width}
              onChange={handleWidthChange}
              disabled={!selectedElement || selectedElement === 'banner'}
              className='transition-opacity-300-ease'
            />
            <NumberInput
              id='height-field'
              min={0}
              step={1}
              label='Height'
              value={selectedElementStyle?.height}
              onChange={handleHeightChange}
              disabled={!selectedElement}
              className='transition-opacity-300-ease'
            />
            <div className='layout-padding form-input-wrapper'>
              <label
                className={`form-label ${!selectedElement || canShowImageUploader ? 'disabled' : ''} transition-opacity-300-ease`}>
                Padding
              </label>
              <div className='layout-padding-inputs'>
                <NumberInput
                  id='padding-right-field'
                  min={0}
                  step={1}
                  side='right'
                  value={selectedElementStyle?.padding?.right}
                  onChange={(value) => handlePaddingChange('right', value)}
                  disabled={
                    !selectedElement || canDisablePositionAndPaddingInputs
                  }
                  className='transition-opacity-300-ease'
                />

                <NumberInput
                  id='padding-left-field'
                  min={0}
                  step={1}
                  side='left'
                  value={selectedElementStyle?.padding?.left}
                  onChange={(value) => handlePaddingChange('left', value)}
                  disabled={
                    !selectedElement || canDisablePositionAndPaddingInputs
                  }
                  className='transition-opacity-300-ease'
                />

                <NumberInput
                  id='padding-bottom-field'
                  step={1}
                  min={0}
                  side='bottom'
                  value={selectedElementStyle?.padding?.bottom}
                  onChange={(value) => handlePaddingChange('bottom', value)}
                  disabled={
                    !selectedElement || canDisablePositionAndPaddingInputs
                  }
                  className='transition-opacity-300-ease'
                />

                <NumberInput
                  id='padding-top-field'
                  step={1}
                  min={0}
                  side='top'
                  value={selectedElementStyle?.padding?.top}
                  onChange={(value) => handlePaddingChange('top', value)}
                  disabled={
                    !selectedElement || canDisablePositionAndPaddingInputs
                  }
                  className='transition-opacity-300-ease'
                />
              </div>
            </div>

            <div className='layout-position form-input-wrapper'>
              <label
                className={`form-label ${!selectedElement || selectedElement === 'banner' ? 'disabled' : ''} transition-opacity-300-ease`}>
                Position
              </label>
              <div className='layout-position-inputs'>
                <NumberInput
                  id='position-left-field'
                  step={1}
                  side='left'
                  value={selectedElementStyle?.position?.left}
                  onChange={(value) => handlePositionChange('left', value)}
                  disabled={!selectedElement || selectedElement === 'banner'}
                  className='transition-opacity-300-ease'
                  canHaveNegativeValue={true}
                />

                <NumberInput
                  id='position-top-field'
                  step={1}
                  side='top'
                  value={selectedElementStyle?.position?.top}
                  onChange={(value) => handlePositionChange('top', value)}
                  disabled={!selectedElement || selectedElement === 'banner'}
                  className='transition-opacity-300-ease'
                  canHaveNegativeValue={true}
                />
              </div>
            </div>
          </div>
        </section>

        <section className='appearance-section'>
          <SectionHeading
            text='Appearance'
            type='form'
          />

          <div className='appearance-inputs'>
            <div className='appearance-border form-input-wrapper'>
              <label
                className={`form-label ${!selectedElement ? 'disabled' : ''} transition-opacity-300-ease`}>
                Border
              </label>
              <div className='appearance-border-inputs'>
                <NumberInput
                  id='border-right-field'
                  min={0}
                  step={1}
                  side='right'
                  value={selectedElementStyle?.border?.right}
                  onChange={(value) => handleBorderChange('right', value)}
                  disabled={!selectedElement}
                  className='transition-opacity-300-ease'
                />

                <NumberInput
                  id='border-left-field'
                  min={0}
                  step={1}
                  side='left'
                  value={selectedElementStyle?.border?.left}
                  onChange={(value) => handleBorderChange('left', value)}
                  disabled={!selectedElement}
                  className='transition-opacity-300-ease'
                />

                <NumberInput
                  id='border-bottom-field'
                  step={1}
                  min={0}
                  side='bottom'
                  value={selectedElementStyle?.border?.bottom}
                  onChange={(value) => handleBorderChange('bottom', value)}
                  disabled={!selectedElement}
                  className='transition-opacity-300-ease'
                />

                <NumberInput
                  id='border-top-field'
                  step={1}
                  min={0}
                  side='top'
                  value={selectedElementStyle?.border?.top}
                  onChange={(value) => handleBorderChange('top', value)}
                  disabled={!selectedElement}
                  className='transition-opacity-300-ease'
                />
              </div>
            </div>

            <ColorPicker
              label='Border Color'
              elementColor={selectedElementStyle?.borderColor || '#000'}
              onChange={handleBorderColorChange}
              className='appearance-border-color transition-opacity-300-ease'
              disabled={!selectedElement}
              id='border-color-picker'
            />

            <ColorPicker
              label='Background Color'
              elementColor={selectedElementStyle?.backgroundColor || '#000'}
              onChange={handleBgColorChange}
              className='appearance-bg-color transition-opacity-300-ease'
              disabled={!selectedElement || selectedElement !== 'banner'}
              id='background-color-picker'
            />

            {canShowImageUploader && (
              <ImageUploader
                id='image-uploader'
                label={
                  selectedElement === 'banner'
                    ? 'Upload Background Image'
                    : 'Upload Image'
                }
                onImageUpload={handleImageChange}
                className='appearance-image-uploader transition-opacity-300-ease'
              />
            )}
          </div>
        </section>
      </form>
    </div>
  );
}
