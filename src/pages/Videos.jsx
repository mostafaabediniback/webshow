import { useEffect, useState } from "react";
import { DEFAULT_VIDEO_TYPE } from "../constants/videoTypeOptions";
import ManageableVideoCollection from "../features/videos/components/ManageableVideoCollection";
import useChannel from "../hooks/channel/useChannel";
import useChannelVideos from "../hooks/channel/useChannelVideos";
import usePlaylists from "../hooks/playlist/usePlaylists";
import { usePaginationParams } from "../hooks/ui/usePaginationParams";
import DashboardLayout from "../layouts/DashboardLayout";

const PAGE_SIZE = 25;

function Videos() {
  const { channels, isLoadingChannels } = useChannel();
  const [channelId, setChannelId] = useState("");
  const [videoType, setVideoType] = useState(DEFAULT_VIDEO_TYPE);
  const [viewMode, setViewMode] = useState("videos");
  const { page, setPage } = usePaginationParams(1);

  const videosQuery = useChannelVideos({
    channelId,
    pageNumber: page,
    pageSize: PAGE_SIZE,
    video_type: videoType,
  });

  const playlistsQuery = usePlaylists(channelId, {
    enabled: viewMode === "playlists",
  });

  useEffect(() => {
    setPage(1);
  }, [channelId, videoType, setPage]);

  return (
    <DashboardLayout>
      <div className="space-y-3">
        <div >
          <ManageableVideoCollection
            videosResponse={videosQuery.data}
            playlistsResponse={playlistsQuery.data}
            page={page}
            setPage={setPage}
            videoType={videoType}
            setVideoType={setVideoType}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isLoadingVideos={videosQuery.isLoading}
            isVideosError={videosQuery.isError}
            refetchVideos={videosQuery.refetch}
            isLoadingPlaylists={playlistsQuery.isLoading}
            isPlaylistsError={playlistsQuery.isError}
            refetchPlaylists={playlistsQuery.refetch}
            emptyVideosTitle={
              channelId
                ? "ویدیویی در این کانال یافت نشد"
                : "هنوز ویدیویی آپلود نشده است"
            }
            deleteMessage="آیا از حذف این ویدیو مطمئن هستید؟ این عمل قابل بازگشت نیست."
            toolbarStart={
              <div className="min-w-0 flex-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  فیلتر بر اساس کانال
                </label>
                <select
                  value={channelId}
                  onChange={(event) => setChannelId(event.target.value)}
                  className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoadingChannels}
                >
                  <option value="">همه ویدیوها</option>
                  {(channels || []).map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))}
                </select>
              </div>
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Videos;
