import { useQuery } from "@tanstack/react-query";
import { getLandingChannels } from "../services/videoApi";
import { usePaginationParams } from "../hooks/usePaginationParams";

export const useLandingChannels = (initialPage = 1) => {
  const { page, setPage } = usePaginationParams(initialPage);
  
  return useQuery({
    queryKey: ["landing-channels", page],
    queryFn: () => getLandingChannels({ pageNumber: page }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 دقیقه
    select: (data) => ({
      ...data,
      items: Array.isArray(data?.items) ? data.items : []
    })
  });
};
