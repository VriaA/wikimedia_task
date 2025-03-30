import React from 'react';
import './styles/RadioGroup.css';

type RadioOption = {
  id: string;
  label: string;
  value: string;
};

type RadioGroupProps = {
  heading?: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  direction?: 'row' | 'column';
};

export default function RadioGroup({
  heading,
  name,
  options,
  value,
  onChange,
  direction
}: RadioGroupProps) {
  return (
    <div className='radio-group-wrapper'>
      {heading && <h3 className='radio-group-heading'>{heading}</h3>}
      <div
        className='radio-group'
        style={{ flexDirection: direction === 'row' ? 'row' : 'column' }}>
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className='radio-option'>
            <input
              type='radio'
              id={option.id}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className='radio-input'
              data-testid={option.id}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
