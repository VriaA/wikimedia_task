import React, { memo } from 'react';
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  direction?: 'row' | 'column';
};

function RadioGroup({
  heading,
  name,
  options,
  value,
  onChange,
  direction = 'column'
}: RadioGroupProps) {
  return (
    <fieldset className='radio-group-wrapper flex-column'>
      {heading && (
        <legend className='radio-group-heading  flex-column'>{heading}</legend>
      )}
      <div
        className='radio-group'
        style={{ flexDirection: direction === 'row' ? 'row' : 'column' }}>
        {options.map(({ id, label, value: optionValue }) => (
          <label
            key={id}
            htmlFor={id}
            className='radio-option'>
            <input
              type='radio'
              id={id}
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={onChange}
              className='radio-input'
              data-testid={id}
            />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default memo(RadioGroup);
