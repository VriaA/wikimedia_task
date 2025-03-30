import React, { useEffect, useState } from 'react';
import { appContext } from './context';
import { Appearance } from '../types/appearance';
import { Mode } from '../types/mode';

const initialAppearance: Appearance = {
  textSize: 'standard',
  width: 'standard',
  colorTheme: 'light'
};

export default function AppContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [appearance, setAppearance] = useState<Appearance>(initialAppearance);
  const [mode, setMode] = useState<Mode>('preview');

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [mode]);

  return (
    <appContext.Provider value={{ appearance, setAppearance, mode, setMode }}>
      {children}
    </appContext.Provider>
  );
}
