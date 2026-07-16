import { renderHook } from '@testing-library/react';
import useIndexImages from './useIndexImages';

describe('useIndexImages', () => {
  it('returns only the first image when imagesPerSlide equals total images', () => {
    const images = ['a.jpg', 'b.jpg', 'c.jpg'];
    const { result } = renderHook(() => useIndexImages(images, 3));
    expect(result.current).toEqual(['a.jpg']);
  });

  it('returns every nth image based on imagesPerSlide', () => {
    const images = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg'];
    const { result } = renderHook(() => useIndexImages(images, 2));
    expect(result.current).toEqual(['a.jpg', 'c.jpg', 'e.jpg']);
  });

  it('returns all images when imagesPerSlide is 1', () => {
    const images = ['a.jpg', 'b.jpg', 'c.jpg'];
    const { result } = renderHook(() => useIndexImages(images, 1));
    expect(result.current).toEqual(['a.jpg', 'b.jpg', 'c.jpg']);
  });

  it('returns an empty array when given an empty images array', () => {
    const { result } = renderHook(() => useIndexImages([], 2));
    expect(result.current).toEqual([]);
  });

  it('returns only the first image when imagesPerSlide exceeds total images', () => {
    const images = ['a.jpg', 'b.jpg'];
    const { result } = renderHook(() => useIndexImages(images, 5));
    expect(result.current).toEqual(['a.jpg']);
  });
});
