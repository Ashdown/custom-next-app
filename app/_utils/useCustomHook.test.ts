import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import useCustomHook from './useCustomHook';
import useThingsQuery from '@/app/_queries/useThingsQuery';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/app/_queries/useThingsQuery', () => jest.fn());

const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUseThingsQuery = useThingsQuery as jest.Mock;

const DEFAULT_START_DATE = new Date('2026-01-01');
const DEFAULT_END_DATE = new Date('2026-01-07');

describe('useCustomHook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseThingsQuery.mockReturnValue({ data: [], isLoading: false });
  });

  it('uses default dates when no search params are present', () => {
    mockUseSearchParams.mockReturnValue({ get: () => null });

    renderHook(() => useCustomHook());

    expect(mockUseThingsQuery).toHaveBeenCalledWith(DEFAULT_START_DATE, DEFAULT_END_DATE);
  });

  it('parses startDate and endDate from search params', () => {
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => (key === 'startDate' ? '2026-03-01' : '2026-03-07'),
    });

    renderHook(() => useCustomHook());

    expect(mockUseThingsQuery).toHaveBeenCalledWith(new Date('2026-03-01'), new Date('2026-03-07'));
  });

});
