import React, { useEffect, useState } from 'react';
import LeftSideIcon from '../../assets/left_side_icon.svg?react';
import RightSideIcon from '../../assets/right_side_icon.svg?react';
import BottomSideIcon from '../../assets/bottom_side_icon.svg?react';
import TopSideIcon from '../../assets/top_side_icon.svg?react';
import './styles/NumberInput.css';

type NumberInputProps = {
  label?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  value?: number;
  onChange?: (value: number) => void;
  unit?: string;
  className?: string;
  step: number;
  disabled: boolean;
  min?: number;
  id: string;
  canHaveNegativeValue?: boolean;
};

export default function NumberInput({
  label,
  side,
  value = 0,
  onChange,
  unit = 'px',
  className,
  disabled,
  min,
  step,
  id,
  canHaveNegativeValue
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value) || 0;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  }

  function SideIndicator() {
    return (
      <>
        {side === 'left' ? (
          <LeftSideIcon className='flex-none' />
        ) : side === 'right' ? (
          <RightSideIcon className='flex-none' />
        ) : side === 'top' ? (
          <TopSideIcon className='flex-none' />
        ) : (
          <BottomSideIcon className='flex-none' />
        )}
      </>
    );
  }

  return (
    <div
      className={`form-input-wrapper ${className} ${disabled ? 'disabled' : ''}`}
      data-testid={id}>
      {label && <label className='form-label'>{label}</label>}
      <div className='number-input-wrapper'>
        {side && <SideIndicator />}
        <input
          type='number'
          className='number-input'
          value={!canHaveNegativeValue && inputValue < 0 ? 0 : inputValue}
          onChange={handleChange}
          step={step}
          data-testid={`${id}-input`}
          {...(disabled && { disabled: true })}
          {...(min && { min: min })}
        />
        <span className='unit-text'>{unit}</span>
      </div>
    </div>
  );
}
