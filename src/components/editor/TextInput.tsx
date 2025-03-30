import React, { useEffect, useState } from 'react';
import './styles/TextInput.css';

type TextInputProps = {
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  disabled: boolean;
  id: string;
};

export default function TextInput({
  label,
  placeholder,
  onChange,
  value,
  className,
  disabled,
  id
}: TextInputProps) {
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    setTextValue(value ? value : '');
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <div
      className={`form-input-wrapper ${className} ${disabled ? 'disabled' : ''}`}
      data-testid={id}>
      <label className='form-label'>{label}</label>
      <input
        type='text'
        className={`text-input ${className}`}
        value={textValue}
        onChange={handleChange}
        placeholder={placeholder}
        data-testid={`${id}-input`}
        {...(disabled && { disabled: true })}
      />
    </div>
  );
}
