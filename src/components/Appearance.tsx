import React from 'react';
import { useContext, useState } from 'react';
import { appContext } from '../contexts/context';
import RadioGroup from './RadioGroup';
import './styles/Content.css';
import type { AppContext } from '../contexts/context';

export default function Appearance() {
  const [isVisible, setIsVisible] = useState(true);
  const { appearance, setAppearance } = useContext(appContext) as AppContext;

  if (!isVisible) {
    return null;
  }

  function updateAppearance(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setAppearance((prevAppearance) => ({ ...prevAppearance, [name]: value }));
  }

  const textOptions = [
    { id: 'text-small', label: 'Small', value: 'small' },
    { id: 'text-standard', label: 'Standard', value: 'standard' },
    { id: 'text-large', label: 'Large', value: 'large' }
  ];

  const widthOptions = [
    { id: 'width-standard', label: 'Standard', value: 'standard' },
    { id: 'width-wide', label: 'Wide', value: 'wide' }
  ];

  const colorOptions = [
    { id: 'color-automatic', label: 'Automatic', value: 'automatic' },
    { id: 'color-light', label: 'Light', value: 'light' },
    { id: 'color-dark', label: 'Dark', value: 'dark' }
  ];

  return (
    <aside className='appearance flex-column'>
      <header className='appearance-header'>
        <h2 className='appearance-title'>Appearance</h2>
        <button
          type='button'
          className='hide-button'
          onClick={() => setIsVisible(false)}>
          hide
        </button>
      </header>

      <RadioGroup
        heading='Text'
        name='textSize'
        options={textOptions}
        value={appearance.textSize}
        onChange={updateAppearance}
      />

      <RadioGroup
        heading='Width'
        name='width'
        options={widthOptions}
        value={appearance.width}
        onChange={updateAppearance}
      />

      <RadioGroup
        heading='Color (beta)'
        name='colorTheme'
        options={colorOptions}
        value={appearance.colorTheme}
        onChange={updateAppearance}
      />
    </aside>
  );
}
