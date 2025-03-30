import React from 'react';
import { useContext } from 'react';
import { appContext } from '../contexts/context';
import type { AppContext } from '../contexts/context';
import Preview from './Preview';
import Editor from './editor/Editor';

export default function PreviewCustomizer() {
  const { mode } = useContext(appContext) as AppContext;

  return <>{mode === 'preview' ? <Preview /> : <Editor />}</>;
}
