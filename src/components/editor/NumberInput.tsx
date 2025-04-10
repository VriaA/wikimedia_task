import React, { memo } from 'react';
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

function SideIndicator({
  side
}: {
  side: 'left' | 'right' | 'top' | 'bottom';
}) {
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

function NumberInput({
  label,
  side,
  value = 0,
  onChange,
  className = '',
  disabled = false,
  min,
  step,
  id,
  canHaveNegativeValue
}: NumberInputProps) {
  const property = id.split('-')[0];

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
        {side && <SideIndicator side={side} />}
        <input
          id={`${id}-input`}
          type='number'
          className='number-input'
          value={!canHaveNegativeValue && value < 0 ? 0 : value}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step}
          data-testid={`${id}-input`}
          {...(disabled && { disabled: true })}
          {...(min != null && { min: min })}
          {...(side && { 'aria-label': `${property} ${side}` })}
        />
        <span className='unit-text'>px</span>
      </div>
    </div>
  );
}
export default memo(NumberInput);
