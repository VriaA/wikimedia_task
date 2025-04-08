import React, { useState, useRef, useEffect } from 'react';
import DropdownIcon from '../../assets/dropdown_icon.svg?react';
import CheckIcon from '../../assets/check.svg?react';
import type { Option } from '../../types/editor';
import './styles/DropdownMenu.css';

type DropdownMenuProps = {
  id: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  disabled?: boolean;
};

export default function DropdownMenu({
  id,
  label,
  value = '',
  onChange,
  options,
  className,
  disabled
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  // SETS THE FOCUS INDEX ON FIRST RENDER
  useEffect(() => {
    const initialIndex = options.findIndex((option) => option.value === value);
    setFocusedIndex(initialIndex > -1 ? initialIndex : 0);
  }, [options, value]);

  // SETS SELECTED OPTION
  useEffect(() => {
    setSelectedOption(options.find((option) => option.value === value) || null);
  }, [value, options]);

  // CLOSES THE DROPDOWN OPTIONS ON CLICK OUTSIDE
  useEffect(() => {
    const dropdown = dropdownRef.current;
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false);
        setAnnouncement(`${label} dropdown menu is now closed.`);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, label]);

  const toggleDropdown = () => {
    const prevIsOpen = isOpen;
    setIsOpen(!prevIsOpen);
    setAnnouncement(
      `${label} dropdown menu is now ${prevIsOpen ? 'closed' : 'open'}.`
    );
  };

  function handleOptionClick(option: Option, index: number) {
    setSelectedOption(option);
    index >= 0 && setFocusedIndex(index);
    onChange(option.value);
    dropdownRef.current?.focus();
  }

  function gotoNextOption(index: number) {
    const nextIndex = (index + 1) % options.length;
    setFocusedIndex(nextIndex);
  }

  function gotoPreviousOption(index: number) {
    const prevIndex = (index - 1 + options.length) % options.length;
    setFocusedIndex(prevIndex);
  }

  function handleDropdownKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!isOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      setIsOpen(true);
      setAnnouncement(`${label} dropdown menu is now open.`);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        gotoNextOption(focusedIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        gotoPreviousOption(focusedIndex);
        break;
      case 'Enter':
      case ' ':
      case 'Tab':
        if (!isOpen) return;
        e.preventDefault();
        handleOptionClick(options[focusedIndex], focusedIndex);
        setIsOpen(false);
        setAnnouncement(`${label} dropdown menu is now closed.`);
        break;
      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
          setAnnouncement(`${label} dropdown menu is now closed.`);
        }
        break;
      case 'Home':
        isOpen && setFocusedIndex(0);
        break;
      case 'End':
        isOpen && setFocusedIndex(options.length - 1);
        break;
      default:
        if (isOpen && /^[a-z0-9]$/i.test(e.key)) {
          const char = e.key.toLowerCase();
          const foundIndex = options.findIndex((option) =>
            option.label.toLowerCase().startsWith(char)
          );
          if (foundIndex > -1) setFocusedIndex(foundIndex);
        }
    }
  }

  const triggerText = selectedOption
    ? selectedOption.label
    : 'Choose an option';

  return (
    <div
      className={`dropdown flex-column ${className} ${disabled ? 'disabled' : ''}`}
      id={id}>
      <label
        htmlFor={`${id}-dropdown-trigger`}
        className='form-label'>
        {label}
      </label>
      <button
        id={`${id}-dropdown-trigger`}
        data-testid={`${id}-trigger`}
        type='button'
        className='dropdown-trigger'
        ref={dropdownRef}
        onClick={toggleDropdown}
        onKeyDown={(e) => handleDropdownKeyDown(e)}
        tabIndex={0}
        role='combobox'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-controls={`${id}-options`}
        aria-activedescendant={isOpen ? options[focusedIndex].id : undefined}
        aria-label={triggerText}
        {...(disabled && { disabled: true })}>
        {triggerText}
        <DropdownIcon
          className={`${isOpen ? 'rotate-180' : ''} dropdown-icon`}
          aria-hidden='true'
        />
      </button>
      {isOpen && (
        <ul
          className='dropdown-options'
          id={`${id}-options`}
          role='listbox'
          data-testid={`${id}-options`}
          aria-labelledby={`${id}-label`}>
          {options.map((option, index) => {
            const isSelected = selectedOption?.value === option.value;
            const isFocused = focusedIndex === index;
            return (
              <li
                id={option.id}
                className={`dropdown-option ${isFocused ? 'focused-option' : ''}`}
                role='option'
                key={option.value}
                ref={(el) => {
                  optionsRef.current[index] = el;
                }}
                data-testid={option.id}
                onClick={() => handleOptionClick(option, index)}
                style={option.style}
                aria-selected={selectedOption?.value === option.value}>
                {option.label}
                {selectedOption?.value === option.value && (
                  <CheckIcon
                    height={16}
                    fill={isSelected && isFocused ? '#FFF' : '#202122'}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div
        className='sr-only'
        aria-live='polite'
        aria-atomic='true'>
        {announcement}
      </div>
    </div>
  );
}
