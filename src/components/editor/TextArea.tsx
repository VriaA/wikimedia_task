import React from 'react';
import './styles/TextArea.css';

type TextAreaProps = {
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
  disabled: boolean;
  id: string;
};

export default function TextArea({
  label,
  placeholder,
  onChange,
  value,
  className,
  disabled,
  id
}: TextAreaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange(e.target.value);

  return (
    <label
      htmlFor={`${id}-input`}
      className={`text-area-container form-label ${className} ${disabled ? 'disabled' : ''}`}>
      {label}
      <textarea
        id={`${id}-input`}
        className={`text-area-input ${className}`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        data-testid={`${id}-input`}
        {...(disabled && { disabled: true })}
      />
    </label>
  );
}
