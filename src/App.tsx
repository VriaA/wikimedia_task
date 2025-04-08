import React from 'react';
import { BannerContextProvider } from './contexts/BannerContext';
import AppHeader from './components/AppHeader';
import Banner from './components/banner/Banner';
import PreviewEditor from './components/PreviewEditor';
import AppContextProvider from './contexts/AppContext';
import Footer from './components/Footer';

function App() {
  return (
    <AppContextProvider>
      <BannerContextProvider>
        <AppHeader />
        <Banner />
        <PreviewEditor />
        <Footer />
      </BannerContextProvider>
    </AppContextProvider>
  );
}

export default App;
