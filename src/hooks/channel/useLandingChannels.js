import { useQuery } from "@tanstack/react-query";
import { getLandingChannels } from "../../services/videoApi";

export const useLandingChannels = () => {
  return useQuery({
    queryKey: ["landing-channels"],
    queryFn: getLandingChannels,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 دقیقه
    select: (data) => ({
      ...data,
      items: Array.isArray(data?.items) ? data.items : []
    })
  });
};
