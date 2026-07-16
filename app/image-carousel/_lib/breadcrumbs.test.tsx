import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Breadcrumbs from './breadcrumbs';
import useIndexImages from '@/app/image-carousel/_utils/useIndexImages';

jest.mock('@/app/image-carousel/_utils/useIndexImages', () => jest.fn());
jest.mock('./breadcrumbs.module.css', () => ({}));
jest.mock('@/app/image-carousel/_lib/hiddenText.module.css', () => ({}));

const mockUseIndexImages = useIndexImages as jest.Mock;

const DEFAULT_PROPS = {
  data: ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg'],
  slidesPerPage: 2,
  selectedImage: 0,
  onSelectImage: jest.fn(),
};

describe('Breadcrumbs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseIndexImages.mockReturnValue(['a.jpg', 'c.jpg']);
  });

  it('renders one button per index image', () => {
    render(<Breadcrumbs {...DEFAULT_PROPS} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders accessible labels for each button', () => {
    render(<Breadcrumbs {...DEFAULT_PROPS} />);
    expect(screen.getByText('image 1')).toBeInTheDocument();
    expect(screen.getByText('image 2')).toBeInTheDocument();
  });

  it('disables the button corresponding to the selected image', () => {
    render(<Breadcrumbs {...DEFAULT_PROPS} selectedImage={0} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it('disables the correct button when a non-first slide is selected', () => {
    render(<Breadcrumbs {...DEFAULT_PROPS} selectedImage={2} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('calls onSelectImage with the correct button index when clicked', async () => {
    const onSelectImage = jest.fn();
    render(<Breadcrumbs {...DEFAULT_PROPS} selectedImage={2} onSelectImage={onSelectImage} />);
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);
    expect(onSelectImage).toHaveBeenCalledWith(0);
  });

});
