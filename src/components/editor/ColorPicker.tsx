import React, { useEffect, useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import type { ColorResult } from 'react-color';
import './styles/ColorPicker.css';

type ColorPickerProps = {
  elementColor?: string;
  onChange: (color: string) => void;
  label: string;
  className?: string;
  disabled: boolean;
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
  const [color, setColor] = useState(elementColor);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClick = () =>
    setIsColorPickerOpen((prevIsColorPickerOpen) => !prevIsColorPickerOpen);

  useEffect(() => {
    setColor(elementColor);
  }, [elementColor]);

  useEffect(() => {
    function handleClose(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setIsColorPickerOpen(false);
      }
    }
    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, []);

  function handleChange(newColor: ColorResult) {
    const hexColor = newColor.hex.toUpperCase();
    onChange(hexColor);
  }

  return (
    <div
      className={`form-input-wrapper ${className} ${disabled ? 'disabled' : ''}`}
      ref={pickerRef}>
      <label className='form-label'>{label}</label>
      <button
        type='button'
        className='color-input-container'
        onClick={handleClick}
        data-testid={id}
        {...(disabled && { disabled: true })}>
        <div
          className='color-swatch'
          style={{ backgroundColor: color }}
        />
        <div className='color-hex-value'>{color}</div>
        {isColorPickerOpen ? (
          <>
            <div
              className='color-picker-popover'
              data-testid={`${id}-popover`}
              onClick={(e) => e.stopPropagation()}>
              <ChromePicker
                color={color}
                onChange={handleChange}
                disableAlpha={true}
              />
            </div>
          </>
        ) : null}
      </button>
    </div>
  );
}
