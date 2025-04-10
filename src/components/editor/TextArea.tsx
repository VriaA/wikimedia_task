import React, { memo } from 'react';
import './styles/TextArea.css';

type TextAreaProps = {
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
  disabled?: boolean;
  id: string;
};

function TextArea({
  label,
  placeholder,
  onChange,
  value = '',
  className = '',
  disabled = false,
  id
}: TextAreaProps) {
  return (
    <label
      htmlFor={`${id}-input`}
      className={`text-area-container form-label ${className} ${disabled ? 'disabled' : ''}`}>
      {label}
      <textarea
        id={`${id}-input`}
        className='text-area-input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={`${id}-input`}
        {...(disabled && { disabled: true })}
      />
    </label>
  );
}

export default memo(TextArea);
