import { Link, useParams } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import VideoSkeleton from "../components/VideoSkeleton";
import useSearch from "../hooks/video/useSearch";
import Layout from "../layouts/Layout";
import { Button, EmptyState, ErrorMessage } from "../ui";
import { ArrowRight2 } from "iconsax-react";

function Search() {
  const { q } = useParams();
  const { data: videos, isLoading, isError, refetch } = useSearch(q);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button
            as={Link}
            to="/"
            variant="ghost"
            icon={<ArrowRight2 size={18} color="currentColor" />}
            size="sm"
          >
            بازگشت به خانه
          </Button>
          <span className="text-slate-400">|</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            نتایج جستجو: {q}
          </h2>
        </div>
        {isLoading ? (
          <VideoSkeleton count={10} />
        ) : isError ? (
          <ErrorMessage onRetry={refetch} />
        ) : videos && videos.length > 0 ? (
          <VideoGrid items={videos} />
        ) : (
          <EmptyState
            title="موردی یافت نشد"
            message={`نتیجه‌ای برای جستجوی "${q}" پیدا نکردیم.`}
          />
        )}
      </div>
    </Layout>
  );
}

export default Search;
