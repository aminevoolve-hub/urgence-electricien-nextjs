'use client';

import { useEffect, useState } from 'react';

export function usePageImages(page: string, section: string) {
  const [images, setImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedImages = localStorage.getItem('pageImages');
      if (!savedImages) return;

      const allImages = JSON.parse(savedImages);
      const filtered = allImages
        .filter((img: any) => img.page === page && img.section === section)
        .reduce((acc: any, img: any) => {
          acc[img.element] = img.url;
          return acc;
        }, {});

      setImages(filtered);
    } catch (err) {
      console.error('Error loading images:', err);
    }
  }, [page, section]);

  return images;
}

export function getImageByElement(images: { [key: string]: string }, elementName: string): string | null {
  return images[elementName] || null;
}
