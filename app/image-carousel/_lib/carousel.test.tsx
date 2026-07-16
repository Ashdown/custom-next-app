import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './carousel';
import Breadcrumbs from '@/app/image-carousel/_lib/breadcrumbs';

jest.mock('@/app/image-carousel/_lib/breadcrumbs', () => jest.fn(() => null));
jest.mock('./carousel.module.css', () => ({}));
jest.mock('@/app/image-carousel/_lib/hiddenText.module.css', () => ({}));

const mockBreadcrumbs = Breadcrumbs as jest.Mock;

const IMAGES = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg'];

describe('Carousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all images with correct src and alt', () => {
    render(<Carousel data={IMAGES} />);
    IMAGES.forEach((src, index) => {
      expect(screen.getByAltText(`image ${index + 1}`)).toHaveAttribute('src', src);
    });
  });

  it('advances to the next slide when Next is clicked', async () => {
    render(<Carousel data={IMAGES} slidesPerPage={2} />);
    await userEvent.click(screen.getByText('Next'));
    expect(mockBreadcrumbs).toHaveBeenLastCalledWith(
      expect.objectContaining({ selectedImage: 2 }),
      undefined
    );
  });

  it('wraps back to the first slide when Next is clicked on the last slide', async () => {
    render(<Carousel data={IMAGES} slidesPerPage={2} />);
    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Next'));
    expect(mockBreadcrumbs).toHaveBeenLastCalledWith(
      expect.objectContaining({ selectedImage: 0 }),
      undefined
    );
  });

  it('goes to the previous slide when Previous is clicked', async () => {
    render(<Carousel data={IMAGES} slidesPerPage={2} />);
    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Previous'));
    expect(mockBreadcrumbs).toHaveBeenLastCalledWith(
      expect.objectContaining({ selectedImage: 0 }),
      undefined
    );
  });

  it('wraps to the last image when Previous is clicked on the first slide', async () => {
    render(<Carousel data={IMAGES} slidesPerPage={1} />);
    await userEvent.click(screen.getByText('Previous'));
    expect(mockBreadcrumbs).toHaveBeenLastCalledWith(
      expect.objectContaining({ selectedImage: 5 }),
      undefined
    );
  });

  it('passes correct props to Breadcrumbs', () => {
    render(<Carousel data={IMAGES} slidesPerPage={2} />);
    expect(mockBreadcrumbs).toHaveBeenCalledWith(
      expect.objectContaining({
        data: IMAGES,
        slidesPerPage: 2,
        selectedImage: 0,
        onSelectImage: expect.any(Function),
      }),
      undefined
    );
  });

  it('updates selectedImage when onSelectImage is called via Breadcrumbs', async () => {
    render(<Carousel data={IMAGES} slidesPerPage={2} />);
    const onSelectImage = mockBreadcrumbs.mock.calls[0][0].onSelectImage;
    onSelectImage(1);
    expect(mockBreadcrumbs).toHaveBeenLastCalledWith(
      expect.objectContaining({ selectedImage: 0 }),
      undefined
    );
  });

  it('defaults slidesPerPage to 1', () => {
    render(<Carousel data={IMAGES} />);
    expect(mockBreadcrumbs).toHaveBeenCalledWith(
      expect.objectContaining({ slidesPerPage: 1 }),
      undefined
    );
  });
});
