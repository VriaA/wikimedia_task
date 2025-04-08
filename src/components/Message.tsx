import React from 'react';
import NoticeIcon from '../assets/notice_icon.svg?react';
import WarningIcon from '../assets/warning_icon.svg?react';
import ErrorIcon from '../assets/error_icon.svg?react';
import SuccessIcon from '../assets/success_icon.svg?react';
import CloseIcon from '../assets/close_icon_thin.svg?react';
import './styles/Message.css';

interface MessageProps {
  onClose?: (e: React.MouseEvent) => void;
  type: 'notice' | 'error' | 'warning' | 'success';
  className?: string;
  id: string;
  message: string;
}

function Message({ onClose, type, className, id, message }: MessageProps) {
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic='true'
      className={`message-container ${type} ${className} flex-center-y`}
      data-testid={id}>
      <div
        className='message-icon'
        aria-hidden='true'>
        {type === 'notice' && <NoticeIcon />}
        {type === 'warning' && <WarningIcon />}
        {type === 'error' && <ErrorIcon />}
        {type === 'success' && <SuccessIcon />}
      </div>
      <p
        className='message-text'
        data-testid={`${id}-text`}>
        {message}
      </p>
      {onClose && (
        <button
          data-testid={`${id}-close-btn`}
          className='close-message-button'
          onClick={onClose}
          aria-label='Close message'
          type='button'>
          <CloseIcon
            width={18}
            height={20}
            aria-hidden='true'
          />
        </button>
      )}
    </div>
  );
}

export default Message;
