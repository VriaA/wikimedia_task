import React from 'react';
import './styles/Heading.css';

type SectionHeadingProps = {
  text: string;
  subtext?: string;
  type: 'main' | 'form';
  className?: string;
};
export default function SectionHeading({
  text,
  subtext,
  type,
  className
}: SectionHeadingProps) {
  return (
    <header className={`section-header flex-column ${className}`}>
      <div className='section-heading-wrapper'>
        <h2
          className={`section-heading ${type === 'form' ? 'form-heading' : ''}`}>
          {text}
        </h2>
      </div>

      {subtext && <p className='section-subtext'>{subtext}</p>}
    </header>
  );
}
