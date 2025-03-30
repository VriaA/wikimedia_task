import React, { useEffect, useState } from 'react';
import './styles/TextArea.css';

type TextAreaProps = {
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
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
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    setTextValue(value ? value : '');
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <div
      className={`text-area-container ${className} ${disabled ? 'disabled' : ''}`}
      data-testid={id}>
      <label className='form-label'>{label}</label>
      <textarea
        className={`text-area-input ${className}`}
        value={textValue}
        onChange={handleChange}
        placeholder={placeholder}
        data-testid={`${id}-input`}
        {...(disabled && { disabled: true })}
      />
    </div>
  );
}
