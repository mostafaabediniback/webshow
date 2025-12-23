import { useQuery } from "@tanstack/react-query";
import { getChannels } from "../services/channelApi";
import { getAllVideos } from "../services/videoApi";
import { QueryKeys } from "../enums";

function useDashboard() {
  // دریافت لیست کانال‌ها
  const {
    data: channelsData,
    isLoading: isLoadingChannels,
    isError: isErrorChannels,
  } = useQuery({
    queryKey: [QueryKeys.channel, 1, 25],
    queryFn: () => getChannels(1, 25),
    enabled: true,
  });

  // دریافت لیست ویدیوها
  const {
    data: videosData,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
  } = useQuery({
    queryKey: [QueryKeys.video, 1, 25],
    queryFn: () => getAllVideos(1, 25),
    enabled: true,
  });

  const channels = channelsData || [];
  const videos = videosData || [];

  return {
    channels,
    videos,
    totalChannels: channels.length,
    totalVideos: videos.length,
    isLoading: isLoadingChannels || isLoadingVideos,
    isError: isErrorChannels || isErrorVideos,
  };
}

export default useDashboard;



