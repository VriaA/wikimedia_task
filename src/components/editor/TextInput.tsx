import React from 'react';
import './styles/TextInput.css';

type TextInputProps = {
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

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
        className={`text-input ${className}`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...(disabled && { disabled: true })}
      />
    </div>
  );
}
