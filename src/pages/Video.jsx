import axios from 'axios'
import { Eye } from 'iconsax-react'
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react'
=======
import { useEffect, useState } from 'react'
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
import { useEffect, useRef, useState } from 'react'
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useChannelVideos from '../hooks/useChannelVideos'
import { useVideo } from '../hooks/useVideo'
import Layout from '../layouts/Layout'
<<<<<<< HEAD
<<<<<<< HEAD
import { readAuthSession } from '../utils/auth'
=======
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
import { readAuthSession } from '../utils/auth'
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af

const DownloadIcon = ({ size = 16, color = '#4a5565', className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v12" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11l4 4 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 21H3" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Video() {
  const { id } = useParams()
  const { data, isLoading } = useVideo(id)
  const { data: relatedVideos, isLoading: isRelatedLoading } = useChannelVideos({ channelId: data?.data?.channel_id, pageNumber: 1, pageSize: 25 })

  const [isDownloading, setIsDownloading] = useState(false)
  const [videoSource, setVideoSource] = useState('')
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
  const [started, setStarted] = useState(false)

  const videoRef = useRef(null)
  const isMobile = window.innerWidth < 768
<<<<<<< HEAD
=======
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af

  useEffect(() => {
    const src = data?.data?.video_link || data?.data?.videoUrl || ''
    setVideoSource(src)
  }, [data])

  const extractFilenameFromContentDisposition = (cd) => {
    if (!cd) return null
    // try filename*=
    let m = cd.match(/filename\*=(?:UTF-8'')?(.+)/i)
    if (m && m[1]) {
      try {
        const raw = m[1].trim().replace(/(^"|"$)/g, '')
        return decodeURIComponent(raw)
      } catch {
        return m[1].replace(/(^"|"$)/g, '')
      }
    }
    m = cd.match(/filename="?([^"]+)"?/)
    if (m && m[1]) return m[1]
    return null
  }

  const handleDownload = async () => {
    if (!videoSource) {
      toast.error('آدرس ویدیو موجود نیست')
      return
    }
    if (isDownloading) return

    setIsDownloading(true)
    const safeName = (data?.data?.title || 'video').replace(/[\/\\?%*:|"<>]/g, '-').slice(0, 120)

    try {
      // فقط از axios استفاده می‌کنیم (آدرس کامل است)
<<<<<<< HEAD
<<<<<<< HEAD
      const { token } = readAuthSession()
=======
      const token = sessionStorage.getItem('token')
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
      const { token } = readAuthSession()
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
      const res = await axios.get(videoSource, {
        responseType: 'blob',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // در صورت نیاز می‌توانید onDownloadProgress اضافه کنید
      })

      const blob = res.data
      let ext = '.mp4'
      const mime = (blob && blob.type) || (res.headers && (res.headers['content-type'] || res.headers['Content-Type'])) || ''
      if (mime.includes('webm')) ext = '.webm'
      else if (mime.includes('ogg')) ext = '.ogg'
      else if (mime.includes('mp4')) ext = '.mp4'

      let downloadName = `${safeName}${ext}`
      const cdHeader = res.headers && (res.headers['content-disposition'] || res.headers['Content-Disposition'] || '')
      const cdName = extractFilenameFromContentDisposition(cdHeader)
      if (cdName) downloadName = cdName

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = downloadName
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      toast.success('دانلود شروع شد')
    } catch (err) {
      console.error('download error', err)
      // احتمال خطای CORS یا بلاک شدن توسط سرور
      // تلاش برای باز کردن لینک مستقیم به‌عنوان fallback
      try {
        window.open(videoSource, '_blank', 'noopener')
        toast.info('لینک ویدیو در تب جدید باز شد. در صورت نیاز می‌توانید روی آن راست‌کلیک و Save as کنید.')
      } catch (e) {
        toast.error('دانلود مستقیم ممکن نیست. لطفاً با پشتیبانی تماس بگیرید یا بعداً تلاش کنید.')
      }
    } finally {
      setIsDownloading(false)
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isMobile) {
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen()
      }
    }
  }
  // useEffect(() => {
  //   if (!isMobile && videoRef.current) {
  //     videoRef.current.play().catch(() => { })
  //   }
  // }, [videoSource])
  useEffect(() => {
    if (!videoSource || !videoRef.current) return

    if (!isMobile) {
      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // autoplay blocked → ignore
        })
      }
    }
  }, [videoSource, isMobile])
<<<<<<< HEAD
=======
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="animate-pulse">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg sm:rounded-xl" />
            <div className="mt-4 sm:mt-6 space-y-4">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4" />
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg font-medium">ویدیو یافت نشد</p>
            <p className="text-gray-500 mt-2">لطفاً آدرس را بررسی کنید</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl bg-black shadow-lg">
              <video
<<<<<<< HEAD
<<<<<<< HEAD
                ref={videoRef}
                controls
                playsInline
                autoPlay
                preload="auto"
                src={videoSource}
                className="w-full h-full"
                onCanPlay={() => {
                  const v = videoRef.current
                  if (!v) return

                  const playPromise = v.play()
                  if (playPromise !== undefined) {
                    playPromise.catch(() => {
                    })
                  }
                }}
=======
=======
                ref={videoRef}
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
                controls
                playsInline
                autoPlay
                preload="auto"
                src={videoSource}
                className="w-full h-full"
<<<<<<< HEAD
                poster={data.data.thumbnailUrl || data.data.cover_link || data.data.cover}
                src={data.data.video_link || data.data.videoUrl}
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
                onCanPlay={() => {
                  const v = videoRef.current
                  if (!v) return

                  const playPromise = v.play()
                  if (playPromise !== undefined) {
                    playPromise.catch(() => {
                    })
                  }
                }}
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
              />
            </div>
            <h1 className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight px-1">
              {data?.data?.title}
            </h1>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 flex-1 min-w-0">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
                <Link
                  to={data?.data?.username ? `/${data?.data?.username}` : "/"} state={{ channelId: data?.data?.channel_id }}
                  className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={data?.data?.channel_image}
                    alt={data?.data?.channelName || data?.data?.channel_name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 ring-2 ring-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{data?.data?.channel_name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{(data?.data?.view_count || 0).toLocaleString('fa-IR')} بازدید</p>
                  </div>
                </Link>
<<<<<<< HEAD
=======
                <img
                  src={data.data.channel_image}
                  alt={data.data.channelName || data.data.channel_name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 ring-2 ring-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{data.data.channel_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{(data.data.view_count || 0).toLocaleString('fa-IR')} بازدید</p>
                </div>
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
              </div>
              <div className="flex items-center gap-2 flex-wrap text-gray-600">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full bg-gray-100 px-3 py-1.5">
                  <Eye size={16} color="#4a5565" />
<<<<<<< HEAD
<<<<<<< HEAD
                  {(data?.data?.view_count || 0).toLocaleString('fa-IR')}
=======
                  {(data.data.view_count || 0).toLocaleString('fa-IR')}
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
                  {(data?.data?.view_count || 0).toLocaleString('fa-IR')}
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
                </span>
                {/* <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full bg-gray-100 px-3 py-1.5">
                  <Like1 size={16} color="#4a5565" />
                  {(data.data.likes || 0).toLocaleString('fa-IR')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full bg-gray-100 px-3 py-1.5">
                  <Dislike size={16} color="#4a5565" />
                  {(data.data.dislikes || 0).toLocaleString('fa-IR')}
                </span> */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading || !videoSource}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full bg-gray-100 px-3 py-1.5 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  title={!videoSource ? 'آدرس ویدیو موجود نیست' : 'دانلود ویدیو'}
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      در حال دانلود...
                    </>
                  ) : (
                    <>
                      <DownloadIcon size={16} color="#4a5565" />
                      دانلود
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
<<<<<<< HEAD
<<<<<<< HEAD
              <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 break-words ">
                {data?.data?.description}
=======
              <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 break-all">
                {data.data.description}
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
              <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 break-words ">
                {data?.data?.description}
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
              </p>
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ویدیوهای مرتبط</h3>
              {isRelatedLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-3 p-2 rounded-lg">
                    <div className="w-40 h-24 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))
              ) : (
                (relatedVideos?.items || []).filter(v => String(v.id) !== String(id)).slice(0, 10).map((video) => (
                  <Link to={`/v/${video.id}`} key={video.id} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="w-40 h-24 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden relative">
                      <img
                        src={video.thumbnailUrl || video.cover_link || video.cover}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/default/160/90"; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{video.channelName || video.channel_name}</p>
                      <p className="text-xs text-gray-400 mt-1">{(video.views || 0).toLocaleString('fa-IR')} بازدید</p>
                    </div>
                  </Link>
                ))
              )}
              {!isRelatedLoading && (!(relatedVideos?.items || []).length) && (
                <p className="text-gray-500 text-sm">ویدیوی مرتبطی یافت نشد</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export default Video