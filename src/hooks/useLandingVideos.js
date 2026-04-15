import { useQuery } from "@tanstack/react-query";
import { getLandingVideos } from "../services/videoApi";

export const useLandingVideos = (channelId, pageNumber, pageSize = 25) => {
  return useQuery({
    queryKey: ["landing-videos", channelId || "all", pageNumber, pageSize],
    queryFn: () => getLandingVideos({ 
      channelId: channelId || undefined, 
      pageNumber,
      pageSize
    }),
    enabled: !!pageNumber && pageNumber > 0,
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000,
    select: (data) => ({
      ...data,
      items: Array.isArray(data?.items) ? data.items : [],
      hasNextPage: pageNumber < data?.totalPages,
      hasPrevPage: pageNumber > 1
    })
  });
};