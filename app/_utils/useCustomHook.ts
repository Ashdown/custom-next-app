import { useSearchParams } from 'next/navigation'
import useThingsQuery from "@/app/_queries/useThingsQuery";

// Custom hook to take query params from the url and pass them to a fetch request

const DEFAULT_START_DATE = new Date('2026-01-01')
const DEFAULT_END_DATE = new Date('2026-01-07')

const useCustomHook = () => {
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  return useThingsQuery(startDate !== null ? new Date(startDate) : DEFAULT_START_DATE, endDate !== null ? new Date(endDate) : DEFAULT_END_DATE)
}

export default useCustomHook;
