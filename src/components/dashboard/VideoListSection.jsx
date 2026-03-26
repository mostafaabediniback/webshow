import { Pagination } from '@mui/material'
import { Play } from 'iconsax-react'
import VideoRow from '../VideoRow'

function VideoListSection({
  title,
  items = [],
  isLoading,
  isError,
  emptyText,
  emptyIconClassName = 'bg-gray-100',
  emptyIconColor = '#9CA3AF',
  errorText = 'خطا در بارگذاری ویدیوها',
  errorDescription,
  totalPages = 0,
  page = 1,
  onPageChange,
  onDelete,
  onShow,
  isDeleting,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {title ? <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2> : null}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-red-500 font-medium">{errorText}</p>
          {errorDescription ? <p className="text-sm text-gray-500 mt-2">{errorDescription}</p> : null}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${emptyIconClassName}`}>
            <Play size={32} color={emptyIconColor} />
          </div>
          <p className="text-sm text-gray-500">{emptyText}</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((video) => (
              <VideoRow
                key={video.id}
                item={video}
                onDelete={onDelete}
                onShow={onShow}
                isDeleting={isDeleting}
              />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-4">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => onPageChange(value)}
                shape="rounded"
                color="primary"
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default VideoListSection
