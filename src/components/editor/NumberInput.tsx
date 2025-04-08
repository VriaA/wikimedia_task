import React from 'react';
import LeftSideIcon from '../../assets/left_side_icon.svg?react';
import RightSideIcon from '../../assets/right_side_icon.svg?react';
import BottomSideIcon from '../../assets/bottom_side_icon.svg?react';
import TopSideIcon from '../../assets/top_side_icon.svg?react';
import './styles/NumberInput.css';

type NumberInputProps = {
  label?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  value?: number;
  onChange: (value: number) => void;
  className?: string;
  step: number;
  disabled?: boolean;
  min?: number;
  id: string;
  canHaveNegativeValue?: boolean;
};

export default function NumberInput({
  label,
  side,
  value = 0,
  onChange,
  className,
  disabled,
  min,
  step,
  id,
  canHaveNegativeValue
}: NumberInputProps) {
  const property = id.split('-')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(Number(e.target.value));

  function SideIndicator() {
    return (
      <>
        {side === 'left' ? (
          <LeftSideIcon
            className='flex-none'
            aria-hidden='true'
          />
        ) : side === 'right' ? (
          <RightSideIcon
            className='flex-none'
            aria-hidden='true'
          />
        ) : side === 'top' ? (
          <TopSideIcon
            className='flex-none'
            aria-hidden='true'
          />
        ) : (
          <BottomSideIcon
            className='flex-none'
            aria-hidden='true'
          />
        )}
      </>
    );
  }

  return (
    <div
      className={`form-input-wrapper ${className} ${disabled ? 'disabled' : ''}`}
      data-testid={id}>
      {label && (
        <label
          className='form-label'
          htmlFor={`${id}-input`}>
          {label}
        </label>
      )}
      <div className='number-input-wrapper'>
        {side && <SideIndicator />}
        <input
          id={`${id}-input`}
          type='number'
          className='number-input'
          value={!canHaveNegativeValue && value < 0 ? 0 : value}
          onChange={handleChange}
          step={step}
          data-testid={`${id}-input`}
          {...(disabled && { disabled: true })}
          {...(min && { min: min })}
          {...(side && { 'aria-label': `${property} ${side}` })}
        />
        <span className='unit-text'>px</span>
      </div>
    </div>
  );
}
