import {useQuery} from "@tanstack/react-query";
import formatDate from "@/app/_utils/formatDate";

const useThingsQuery = (startDate: Date, endDate: Date )=> useQuery({
  queryKey: ['things', startDate, endDate],
  queryFn: () =>
    fetch(`/api/things?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) =>
      res.json(),
    ),
})

export default useThingsQuery;
