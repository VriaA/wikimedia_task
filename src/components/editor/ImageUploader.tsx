import React, { useState, useRef } from 'react';
import './styles/ImageUploader.css';

type ImageUploaderProps = {
  onImageUpload: (file: File) => void;
  maxSizeKB?: number;
  label: string;
  className?: string;
  id: string;
};

export default function ImageUploader({
  onImageUpload,
  label,
  maxSizeKB = 250,
  className = '',
  id
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function preventDefaults(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    preventDefaults(e);
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    preventDefaults(e);
    setIsDragging(false);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    preventDefaults(e);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    preventDefaults(e);
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndUploadFile(files[0]);
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUploadFile(e.target.files[0]);
    }
  }

  function validateAndUploadFile(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const fileSizeKB = file.size / 1024;
    if (fileSizeKB > maxSizeKB) {
      alert(`File size exceeds ${maxSizeKB} KB limit`);
      return;
    }

    onImageUpload(file);
  }

  const handleBrowseClick = () => fileInputRef.current?.click();

  return (
    <div
      className={`form-input-wrapper ${className}`}
      data-testid={id}
      role='group'
      aria-labelledby={`${id}-label`}>
      <label
        id={`${id}-label`}
        className='form-label'
        htmlFor={`${id}-input`}>
        {label}
      </label>
      <div
        data-testid={`${id}-drop-zone`}
        className={`image-uploader-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <div className='image-uploader-content flex-column'>
          <div className='image-uploader-text'>
            <span>Drop image or&nbsp;</span>
            <button
              type='button'
              className='browse-btn'
              onClick={handleBrowseClick}
              aria-label='Browse for images to upload'>
              Browse
            </button>
          </div>
          <p className='image-uploader-size-limit'>
            Max file size: {maxSizeKB} KB
          </p>
          <input
            id={`${id}-input`}
            data-testid={`${id}-input`}
            type='file'
            ref={fileInputRef}
            className='file-input'
            accept='image/*'
            onChange={handleFileInputChange}
            aria-labelledby={`${id}-label`}
          />
        </div>
      </div>
    </div>
  );
}
