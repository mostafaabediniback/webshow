import { useQuery } from "@tanstack/react-query";
import { getLandingVideos } from "../services/videoApi";
import { usePaginationParams } from "../hooks/usePaginationParams";

export const useLandingVideos = (channelId, initialPage = 1) => {
  const { page, setPage } = usePaginationParams(initialPage);
  
  return useQuery({
    queryKey: ["landing-videos", channelId || "all", page],
    queryFn: () => getLandingVideos({ 
      channelId: channelId || null, 
      pageNumber: page 
    }),
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 دقیقه
    select: (data) => ({
      ...data,
      items: Array.isArray(data?.items) ? data.items : []
    })
  });
};
