import React from 'react';
import GitHubLogo from '../assets/github_logo.svg?react';
import './styles/Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-inner'>
        <a
          aria-label="Oyelola Victoria's Wikimedia Task GitHub repository link."
          href='https://github.com/VriaA/wikimedia_task'
          target='_blank'>
          <GitHubLogo
            width={32}
            height={32}
          />
        </a>
        <span className='footer-credit'>Built by Oyelola Victoria</span>
      </div>
    </footer>
  );
}
