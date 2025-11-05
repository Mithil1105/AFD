import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';

export default function Lightbox({ images, startIndex = 0, isOpen, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    // Ensure the clicked image is the one shown first and slideshow is off by default
    setIndex(startIndex);
    setPlaying(false);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, startIndex, next, prev, onClose]);

  useEffect(() => {
    if (!playing) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => next(), 3000);
    return () => clearInterval(timerRef.current);
  }, [playing, index, next]);

  if (!isOpen) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Close"><FiX size={22} /></button>
        <button className="lightbox__nav lightbox__nav--left" onClick={prev} aria-label="Previous"><FiChevronLeft size={24} /></button>
        <img src={images[index]} alt="preview" className="lightbox__image" />
        <button className="lightbox__nav lightbox__nav--right" onClick={next} aria-label="Next"><FiChevronRight size={24} /></button>
        <div className="lightbox__controls">
          <button className="btn btn-outline btn-sm" onClick={() => setPlaying((p) => !p)}>
            {playing ? <FiPause /> : <FiPlay />} {playing ? 'Pause' : 'Slideshow'}
          </button>
          <span className="lightbox__counter">{index + 1} / {images.length}</span>
        </div>
      </div>
    </div>
  );
}


