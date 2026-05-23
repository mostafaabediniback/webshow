import { Eye } from "iconsax-react";
import { Link } from "react-router-dom";
import usePlaylist from "../hooks/playlist/usePlaylist";
import { Button, Skeleton } from "../ui";

const FALLBACK_THUMBNAIL = "https://picsum.photos/seed/playlist/640/360";
export default function PlaylistCard({ playlist }) {
  const shouldHydrate = !playlist?.videos_count || !playlist?.thumbnail;
  const { data: detail } = usePlaylist(playlist?.id, {
    page: 1,
    perPage: 5,
    enabled: shouldHydrate,
    staleTime: 60_000,
  });

  const hydratedCount = detail?.totalItems || detail?.items?.length || 0;
  const hydratedThumbnail =
    detail?.items?.[0]?.cover_link ||
    detail?.items?.[0]?.cover ||
    detail?.items?.[0]?.thumbnail ||
    "";

  const totalVideos = Number(playlist?.videos_count || hydratedCount || 0);
  const thumbnail = playlist?.thumbnail || hydratedThumbnail || FALLBACK_THUMBNAIL;

  return (
    <article className="overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-40 w-full overflow-hidden bg-slate-200">
        <img
          src={thumbnail}
          alt={playlist?.name || `playlist-${playlist?.id}`}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_THUMBNAIL;
          }}
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            playlist?.is_public
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {playlist?.is_public ? "عمومی" : "خصوصی"}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {playlist?.name || `پلی‌لیست ${playlist?.id}`}
          </h2>
          <p className="mt-2 text-sm text-slate-500">شناسه: {playlist?.id}</p>
        </div>

        {/* <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">تعداد ویدیو</p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {totalVideos.toLocaleString("fa-IR")}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">تاریخ ایجاد</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {formatDate(playlist?.created_at)}
            </p>
          </div>
        </div> */}

        <Button
          variant = 'outline'
          as={Link}
          to={`/dashboard/playlists/${playlist?.id}`}
          className="w-full"
          icon={<Eye size={18} color="currentColor" />}
        >
          مشاهده
        </Button>
      </div>
    </article>
  );
}

function PlaylistListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <Skeleton className="h-40 w-full rounded-none" />
          <div className="space-y-4 p-5">
            <Skeleton className="h-6 w-2/3" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-20 rounded-2xl" />
              <Skeleton className="h-20 rounded-2xl" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

// function DashboardPlaylists() {
//   const navigate = useNavigate();
//   const { data: channelDetail } = useChannelDetail(null, { enabled: true });
//   const channelId = channelDetail?.data?.id;
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const {
//     data: playlistsResponse,
//     isLoading,
//     isError,
//     refetch,
//   } = usePlaylists(channelId, { enabled: true });
//   const createPlaylist = useCreatePlaylist();

//   const playlists = useMemo(
//     () => playlistsResponse?.items || [],
//     [playlistsResponse?.items],
//   );

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50 p-6 shadow-sm">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <h1 className="mt-2 text-2xl font-bold text-slate-900">
//                 مدیریت پلی‌لیست‌ها
//               </h1>
//               <p className="mt-2 text-sm text-slate-600">
//                 ساخت، مشاهده و مدیریت ویدیوهای داخل پلی‌لیست‌ها از این بخش انجام می‌شود.
//               </p>
//             </div>

//             <Button
//               onClick={() => setIsModalOpen(true)}
//               icon={<Add size={20} color="currentColor" />}
//               className="min-w-40"
//             >
//               ایجاد پلی‌لیست
//             </Button>
//           </div>
//         </section> */}

//         <section className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm">
//           {isLoading ? (
//             <PlaylistListSkeleton />
//           ) : isError ? (
//             <ErrorMessage
//               title="خطا در دریافت پلی‌لیست‌ها"
//               message="فهرست پلی‌لیست‌ها دریافت نشد."
//               onRetry={refetch}
//             />
//           ) : playlists.length === 0 ? (
//             <EmptyState
//               title="هنوز پلی‌لیستی ساخته نشده است"
//               message="برای شروع، یک پلی‌لیست جدید بسازید و بعد ویدیوها را به آن اضافه کنید."
//               action={
//                 <Button
//                   onClick={() => setIsModalOpen(true)}
//                   icon={<Add size={18} color="currentColor" />}
//                 >
//                   ایجاد اولین پلی‌لیست
//                 </Button>
//               }
//             />
//           ) : (
//             <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//               {playlists.map((playlist) => (
//                 <PlaylistCard key={playlist.id} playlist={playlist} />
//               ))}
//             </div>
//           )}
//         </section>
//       </div>

//       <PlaylistModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         isPending={createPlaylist.isPending}
//         onSubmit={async (payload) => {
//           const createdPlaylist = await createPlaylist.mutateAsync(payload);
//           setIsModalOpen(false);
//           if (createdPlaylist?.id) {
//             navigate(`/dashboard/playlists/${createdPlaylist.id}`);
//           }
//         }}
//       />
//     </DashboardLayout>
//   );
// }

// export default DashboardPlaylists;
