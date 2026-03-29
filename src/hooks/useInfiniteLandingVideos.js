import { useInfiniteQuery } from "@tanstack/react-query";
import { getLandingVideos } from "../services/videoApi";

export const useInfiniteLandingVideos = (channelId, pageSize = 25, initialPageData = null) => {
  return useInfiniteQuery({
    queryKey: ["landing-videos-infinite", channelId || "all", pageSize],
    queryFn: ({ pageParam = 1 }) => getLandingVideos({
      channelId: channelId || undefined,
      pageNumber: pageParam,
      pageSize,
    }),
    initialData: !channelId && initialPageData
      ? {
          pages: [initialPageData],
          pageParams: [1],
        }
      : undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= (lastPage?.totalPages || 1) ? nextPage : undefined;
    },
    staleTime: 2 * 60 * 1000,
    refetchOnMount: false,
    select: (data) => {
      const pages = Array.isArray(data?.pages) ? data.pages : [];
      const items = pages.flatMap((page) => Array.isArray(page?.items) ? page.items : []);
      const lastPage = pages.at(-1);

      return {
        ...data,
        items,
        totalPages: lastPage?.totalPages || 1,
        totalItems: lastPage?.totalItems || items.length,
      };
    },
  });
};

export default useInfiniteLandingVideos;
