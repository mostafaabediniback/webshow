import { Pagination } from "@mui/material";
import { ArrowLeft } from "iconsax-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import usePlaylistDetail from "../hooks/playlist/usePlaylistDetail";
import { usePaginationParams } from "../hooks/ui/usePaginationParams";
import Layout from "../layouts/Layout";
import { Button, EmptyState, ErrorMessage, Spinner } from "../ui";
import DashboardLayout from "../layouts/DashboardLayout";

const PAGE_SIZE = 25;

function PlaylistDetail() {
  const { playlistId } = useParams();
  const { page, setPage } = usePaginationParams(1);
  const { data, isLoading, isError, refetch } = usePlaylistDetail(playlistId, {
    page,
    perPage: PAGE_SIZE,
  });

  const playlist = data?.playlist;
  const items = useMemo(() => (Array.isArray(data?.items) ? data.items : []), [data?.items]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl  sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {playlist?.name || `پلی‌لیست ${playlistId}`}
            </h1>
          </div>

          <Button
            as={Link}
            to="/dashboard/user-videos"
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft size={18} color="currentColor" />
            بازگشت به ویدیوهای من
          </Button>
        </div>

        {isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : isError ? (
          <ErrorMessage
            title="خطا در دریافت جزئیات پلی‌لیست"
            message="اطلاعات پلی‌لیست یا ویدیوهای آن دریافت نشد."
            onRetry={refetch}
          />
        ) : !playlist ? (
          <EmptyState
            title="پلی‌لیست پیدا نشد"
            message="ممکن است این پلی‌لیست حذف شده باشد یا شناسه آن نادرست باشد."
          />
        ) : (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Overview
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    {playlist.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    شناسه پلی‌لیست: {playlist.id}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                    playlist.is_public
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {playlist.is_public ? "عمومی" : "خصوصی"}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                  <p className="text-xs text-slate-500">تعداد ویدیوها</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {Number(data?.totalItems || items.length).toLocaleString("fa-IR")}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                  <p className="text-xs text-slate-500">صفحه فعلی</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {Number(data?.meta?.current_page || page).toLocaleString("fa-IR")}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                  <p className="text-xs text-slate-500">تعداد صفحات</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {Number(data?.totalPages || 1).toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">ویدیوهای پلی‌لیست</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    خروجی `data.videos` از API جدید اینجا رندر می‌شود.
                  </p>
                </div>
              </div>

              {items.length === 0 ? (
                <EmptyState
                  title="این پلی‌لیست هنوز ویدیویی ندارد"
                  message="بعد از افزودن ویدیوها، همین صفحه لیست آن‌ها را نمایش می‌دهد."
                  className="py-12"
                />
              ) : (
                <>
                  <VideoGrid items={items} />

                  {data?.totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center border-t border-gray-100 pt-5">
                      <Pagination
                        count={data.totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        shape="rounded"
                        color="primary"
                      />
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default PlaylistDetail;
