import React, { memo } from 'react';
import './styles/TextInput.css';

type TextInputProps = {
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
  disabled?: boolean;
  id: string;
};

function TextInput({
  label,
  placeholder,
  onChange,
  value,
  className = '',
  disabled = false,
  id
}: TextInputProps) {
  return (
    <div
      className={`form-input-wrapper ${className} ${disabled ? 'disabled' : ''}`}>
      <label
        className='form-label'
        htmlFor={`${id}-input`}>
        {label}
      </label>
      <input
        id={`${id}-input`}
        data-testid={`${id}-input`}
        type='text'
        className='text-input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...(disabled && { disabled: true })}
      />
    </div>
  );
}

export default memo(TextInput);
