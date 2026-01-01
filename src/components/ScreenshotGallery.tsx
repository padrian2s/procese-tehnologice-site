'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ScreenshotGalleryProps {
  screenshots: string[];
  industryName: string;
  title: string;
}

export default function ScreenshotGallery({ screenshots, industryName, title }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? screenshots.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === screenshots.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        {title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((screenshot, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-900 cursor-zoom-in group"
          >
            <Image
              src={screenshot}
              alt={`${industryName} screenshot ${index + 1}`}
              fill
              className="object-contain p-2"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="material-icons text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                zoom_in
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <span className="material-icons text-4xl">close</span>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
            aria-label="Previous"
          >
            <span className="material-icons text-4xl">chevron_left</span>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
            aria-label="Next"
          >
            <span className="material-icons text-4xl">chevron_right</span>
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[selectedIndex]}
              alt={`${industryName} screenshot ${selectedIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </>
  );
}
