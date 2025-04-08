import React, { useContext } from 'react';
import { appContext } from '../contexts/context';
import type { AppContext } from '../contexts/context';
import MainMenuIcon from '../assets/header_main_menu.svg?react';
import SearchIcon from '../assets/search_icon.svg?react';
import PersonalToolsIcon from '../assets/personal_tools_icon.svg?react';
import './styles/AppHeader.css';

export default function AppHeader() {
  const { mode } = useContext(appContext) as AppContext;

  return (
    <header className='app-header flex-center-y'>
      {mode === 'preview' ? (
        <>
          <button
            type='button'
            className='main-menu-btn'
            aria-label='Main menu'>
            <MainMenuIcon />
          </button>

          <h1 className='main-heading'>
            <a href='/'>Banner Creator</a>
          </h1>

          <form
            className='search-form flex-center-y'
            onSubmit={(e) => e.preventDefault()}>
            <div className='search-input-wrapper flex-center-y'>
              <SearchIcon aria-hidden='true' />
              <input
                type='text'
                className='search-input'
                placeholder='Search'
              />
            </div>
            <button
              type='submit'
              className='search-button desktop-only'>
              Search
            </button>
          </form>

          <button
            type='button'
            className='search-icon-button mobile-only'
            aria-label='Search'>
            <SearchIcon />
          </button>

          <nav className='app-header-nav flex-center-y desktop-only'>
            <ul className='app-header-nav-list flex-center-y'>
              <li className='app-header-nav-item'>
                <a
                  href='.'
                  className='app-header-nav-link'>
                  Donate
                </a>
              </li>
              <li className='app-header-nav-item'>
                <a
                  href='.'
                  className='app-header-nav-link'>
                  Create Account
                </a>
              </li>
              <li className='app-header-nav-item'>
                <a
                  href='.'
                  className='app-header-nav-link'>
                  Log In
                </a>
              </li>
            </ul>

            <button
              type='button'
              className='personal-tools'
              aria-label='Personal Tools'>
              <PersonalToolsIcon aria-hidden='true' />
            </button>
          </nav>
        </>
      ) : (
        <h1
          className='main-heading editor-heading'
          id='edit-mode-heading'>
          Click Banner to Edit
        </h1>
      )}
    </header>
  );
}
