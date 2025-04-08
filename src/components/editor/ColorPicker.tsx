import React, { useEffect, useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import type { ColorResult } from 'react-color';
import './styles/ColorPicker.css';
import FocusLock from 'react-focus-lock';

type ColorPickerProps = {
  elementColor?: string;
  onChange: (color: string) => void;
  label: string;
  className?: string;
  disabled?: boolean;
  id: string;
};

export default function ColorPicker({
  elementColor = '#E5E3C9',
  label = 'Color',
  onChange,
  className,
  disabled,
  id
}: ColorPickerProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleColorPicker = () =>
    setIsColorPickerOpen((prevIsColorPickerOpen) => !prevIsColorPickerOpen);

  // CLOSES COLOR PICKER ON CLICK OUTSIDE
  useEffect(() => {
    function handleClose(e: MouseEvent) {
      if (
        isColorPickerOpen &&
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node)
      ) {
        setIsColorPickerOpen(false);
      }
    }
    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, [isColorPickerOpen]);

  // FOCUSES ON THE COLOR INPUT WHEN THE COLOR PICKER IS OPENED
  useEffect(() => {
    if (!isColorPickerOpen) return;
    const colorInput = document.querySelector(
      'input[id^="rc-editable-input-"]'
    ) as HTMLInputElement;
    colorInput.focus();
  }, [isColorPickerOpen]);

  function handleChange(newColor: ColorResult) {
    const hexColor = newColor.hex.toUpperCase();
    onChange(hexColor);
  }

  function closeOnKeyPress(e: React.KeyboardEvent) {
    if (e.key !== 'Escape') return;
    e.preventDefault();
    setIsColorPickerOpen(false);
  }

  return (
    <div
      aria-modal='true'
      className={`color-picker-wrapper form-input-wrapper ${className} ${disabled ? 'disabled' : ''}`}
      ref={pickerRef}>
      <label
        className='form-label'
        htmlFor={`${id}-picker-trigger`}>
        {label}
      </label>

      <div className='color-picker'>
        <button
          ref={triggerRef}
          id={`${id}-trigger`}
          data-testid={`${id}-trigger`}
          type='button'
          className='color-picker-trigger'
          onClick={toggleColorPicker}
          aria-haspopup='true'
          aria-expanded={isColorPickerOpen}
          aria-controls={`${id}-popover`}
          aria-label={`${isColorPickerOpen ? 'Close' : 'Open'} ${id}`}
          {...(disabled && { disabled: true })}>
          <div
            className='color-swatch'
            style={{ backgroundColor: elementColor }}
          />
          <div className='color-hex-value'>{elementColor}</div>
        </button>

        {isColorPickerOpen && (
          <FocusLock
            returnFocus={true}
            onDeactivation={() => triggerRef.current?.focus()}>
            <div
              id={`${id}-popover`}
              className='color-picker-popover'
              data-testid={`${id}-popover`}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={closeOnKeyPress}
              role='dialog'
              aria-modal='true'
              aria-labelledby={`${id}-dialog-title`}>
              <h2
                id={`${id}-dialog-title`}
                className='sr-only'>
                {label} Picker
              </h2>
              <ChromePicker
                color={elementColor}
                onChange={handleChange}
                disableAlpha={true}
              />
            </div>
          </FocusLock>
        )}
      </div>
    </div>
  );
}
