import React, { useState, useRef, useEffect } from 'react';
import DropdownIcon from '../../assets/dropdown_icon.svg?react';
import type { Option } from '../../types/editor';
import './styles/DropdownMenu.css';

type DropdownMenuProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  className?: string;
  disabled: boolean;
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
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    value ? options.find((option) => option.value === value) || null : null
  );

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);
  const dropdownAnnouncerRef = useRef<HTMLParagraphElement | null>(null);

  // CLOSES THE DROPDOWN OPTIONS ON CLICK OUTSIDE
  useEffect(() => {
    const dropdown = dropdownRef.current;
    function handleClickOutside(event: MouseEvent) {
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // UPDATES THE SELECTED OPTION
  useEffect(() => {
    setSelectedOption(
      value ? options.find((option) => option.value === value) || null : null
    );
  }, [value, options]);

  // FOCUS ON THE FIRST OPTION WHEN THERE IS NO SELECTED OPTION
  useEffect(() => {
    if (isOpen && !selectedOption) {
      setFocusedIndex(0);
      optionsRef.current[0] && optionsRef.current[0].focus();
    }
  }, [isOpen, options.length, selectedOption]);

  // FOCUS ON THE SELECTED OPTION WHEN THERE IS A SELECTED OPTION
  useEffect(() => {
    optionsRef.current[focusedIndex] &&
      optionsRef.current[focusedIndex].focus();
  }, [isOpen, options.length, focusedIndex]);

  // ANNOUNCE TO SCREEN READERS WHEN THE DROPDOWN MENU IS OPENED OR CLOSED
  useEffect(() => {
    const announcer = dropdownAnnouncerRef.current;
    if (announcer) {
      announcer.textContent = isOpen
        ? `${label} dropdown menu is now open.`
        : `${label} dropdown menu is now closed.`;
    }
  }, [isOpen, label]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  function handleOptionClick(option: Option, index: number) {
    setSelectedOption(option);
    index >= 0 && setFocusedIndex(index);
    onChange && onChange(option.value);
  }

  function gotoNextOption(index: number) {
    const nextIndex = (index + 1) % options.length;
    setFocusedIndex(nextIndex);
    optionsRef.current[nextIndex]?.focus();
    if (options[nextIndex]) setSelectedOption(options[nextIndex]);
  }

  function gotoPreviousOption(index: number) {
    const prevIndex = (index - 1 + options.length) % options.length;
    setFocusedIndex(prevIndex);
    optionsRef.current[prevIndex]?.focus();
    if (options[prevIndex]) setSelectedOption(options[prevIndex]);
  }

  function handleDropdownKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen((prevIsOpen) => !prevIsOpen);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  }

  function handleOptionKeyDown(
    e: React.KeyboardEvent<HTMLLIElement>,
    index: number,
    option: Option
  ) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleOptionClick(option, index);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        dropdownRef.current?.focus();
        break;
      case 'ArrowRight':
      case 'ArrowDown': {
        e.preventDefault();
        gotoNextOption(index);
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        e.preventDefault();
        gotoPreviousOption(index);
        break;
      }
      case 'Tab': {
        e.preventDefault();
        e.shiftKey ? gotoPreviousOption(index) : gotoNextOption(index);
        break;
      }
      default:
        break;
    }
  }

  return (
    <div
      className={`dropdown flex-column ${className} ${disabled ? 'disabled' : ''}`}
      id={id}>
      <label
        id={`${id}-label`}
        className='form-label'>
        {label}
      </label>
      <button
        data-testid={`${id}-select`}
        type='button'
        className='dropdown-select'
        ref={dropdownRef}
        onClick={toggleDropdown}
        onKeyDown={handleDropdownKeyDown}
        tabIndex={0}
        role='combobox'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-controls={`${id}-options`}
        aria-labelledby={`${id}-label`}
        aria-selected={!!selectedOption}
        {...(disabled && { disabled: true })}>
        {selectedOption ? selectedOption.label : 'Choose an option'}

        <DropdownIcon
          className={`${isOpen ? 'rotate-180' : ''} dropdown-icon`}
        />
      </button>
      {isOpen && (
        <ul
          className='dropdown-options'
          id={`${id}-options`}
          role='listbox'
          data-testid={`${id}-options`}
          aria-label={`${label} options`}>
          {options.map((option, index) => (
            <li
              className='menu-item'
              role='option'
              tabIndex={-1}
              key={option.value}
              ref={(el) => {
                optionsRef.current[index] = el;
              }}
              data-testid={option.id}
              onClick={() => handleOptionClick(option, index)}
              onKeyDown={(e) => handleOptionKeyDown(e, index, option)}
              style={option.style}>
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <div
        className='sr-only'
        ref={dropdownAnnouncerRef}
        aria-live='polite'
        aria-atomic='true'></div>
    </div>
  );
}
