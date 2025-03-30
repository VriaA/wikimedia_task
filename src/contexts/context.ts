import React, { createContext } from 'react';
import type { Appearance } from '../types/appearance';
import type { BannerContext } from '../types/banner';
import { Mode } from '../types/mode';

export type AppContext = {
  appearance: Appearance;
  setAppearance: React.Dispatch<React.SetStateAction<Appearance>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};

const appContext = createContext<AppContext | null>(null);

const bannerContext = createContext<BannerContext | undefined>(undefined);

export { appContext, bannerContext };
