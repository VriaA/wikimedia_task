import React from 'react';
import Appearance from './Appearance';
import './styles/Content.css';

export default function Preview() {
  return (
    <section
      className='content'
      data-testid='preview'>
      <h2 className='content-heading'>Lorem Ipsum</h2>

      <div className='content-body'>
        <p className='content-body-text'>
          <span className='content-subject'>Lorem ipsum </span>{' '}
          <a href='https://en.wikipedia.org/wiki/Help:IPA/English'>
            (/ˌlɔ:.rəm'Ip.səm
          </a>
          <a href='https://en.wikipedia.org/wiki/Help:Pronunciation_respelling_key'>
            / LOR-əm IP-səm)
          </a>{' '}
          is a dummy or placeholder text commonly used in graphic design,
          publishing, and web development. Its purpose is to permit a page
          layout to be designed, independently of the{' '}
          <a href='https://en.wikipedia.org/wiki/Copy_(publishing)'>copy</a>{' '}
          that will subsequently populate it, or to demonstrate various{' '}
          <a href='https://en.wikipedia.org/wiki/Font'>fonts</a> of a{' '}
          <a href='https://en.wikipedia.org/wiki/Typeface'>typeface</a> without
          meaningful text that could be distracting. Lorem ipsum is typically a
          corrupted version of{' '}
          <a href='https://en.wikipedia.org/wiki/Typeface'>
            De finibus bonorum et malorum
          </a>
          , a 1st-century BC text by the{' '}
          <a href='https://en.wikipedia.org/wiki/Roman_Republic'>Roman</a>{' '}
          statesman and philosopher{' '}
          <a href='https://en.wikipedia.org/wiki/Cicero'>Cicero</a>, with words
          altered, added, and removed to make it nonsensical and improper{' '}
          <a href='https://en.wikipedia.org/wiki/Latin'>Latin</a>. The first two
          words themselves are a{' '}
          <a href='https://en.wikipedia.org/wiki/Clipping_(morphology)'>
            truncation
          </a>{' '}
          of dolorem ipsum ("pain itself").
        </p>
        <p className='content-body-text'>
          Versions of the Lorem ipsum text have been used in{' '}
          <a href='https://en.wikipedia.org/wiki/Typesetting'>typesetting</a> at
          least since the 1960s, when it was popularized by advertisements for{' '}
          <a href='https://en.wikipedia.org/wiki/Letraset'>Letraset</a> transfer
          sheets.
          <a href='https://en.wikipedia.org/wiki/Letraset'>[1]</a> Lorem ipsum
          was introduced to the digital world in the mid-1980s, when{' '}
          <a href='https://en.wikipedia.org/wiki/Letraset'>Aldus</a> employed it
          in graphic and word-processing templates for its desktop publishing
          program{' '}
          <a href='https://en.wikipedia.org/wiki/Adobe_PageMaker'>PageMaker</a>.
          Other popular{' '}
          <a href='https://en.wikipedia.org/wiki/Adobe_PageMaker'>
            word processors
          </a>
          , including{' '}
          <a href='https://en.wikipedia.org/wiki/Pages_(word_processor)'>
            Pages
          </a>{' '}
          and{' '}
          <a href='https://en.wikipedia.org/wiki/Microsoft_Word'>
            Microsoft Word
          </a>
          , have since adopted Lorem ipsum,
          <a href='https://en.wikipedia.org/wiki/Lorem_ipsum#cite_note-SDop-2'>
            [2]
          </a>{' '}
          as have many{' '}
          <a href='https://en.wikipedia.org/wiki/Lorem_ipsum#cite_note-SDop-2'>
            LaTeX
          </a>{' '}
          packages,
          <a href='https://en.wikipedia.org/wiki/Lorem_ipsum#cite_note-3'>
            [3]
          </a>
          <a href='https://en.wikipedia.org/wiki/Lorem_ipsum#cite_note-4'>
            [4]
          </a>
          <a href='https://en.wikipedia.org/wiki/Lorem_ipsum#cite_note-4'>
            [5]
          </a>{' '}
          web content managers such as{' '}
          <a href='https://en.wikipedia.org/wiki/Joomla!'>Joomla!</a> and{' '}
          <a href='https://en.wikipedia.org/wiki/WordPress'>WordPress</a>, {''}
          and <a href='https://en.wikipedia.org/wiki/CSS'>CSS</a> libraries such
          as Semantic UI.
        </p>
      </div>

      <Appearance />
    </section>
  );
}
