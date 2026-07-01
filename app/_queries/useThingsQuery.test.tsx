import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useThingsQuery from './useThingsQuery';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const START_DATE = new Date('2026-03-01');
const END_DATE = new Date('2026-03-07');

describe('useThingsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches things with formatted date params', async () => {
    const mockData = [{ id: 1, name: 'Thing 1' }];
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    } as Response);

    const { result } = renderHook(() => useThingsQuery(START_DATE, END_DATE), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith(
      '/api/things?startDate=2026-03-01&endDate=2026-03-07',
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
    expect(result.current.data).toEqual(mockData);
  });

  it('is in loading state initially', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => new Promise(() => {}),
    } as unknown as Response);

    const { result } = renderHook(() => useThingsQuery(START_DATE, END_DATE), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('is in error state when fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useThingsQuery(START_DATE, END_DATE), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
