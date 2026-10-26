import Link from 'next/link';
import SafeImage from './SafeImage';
const normalizeUrl = value => typeof value === 'string' ? value.trim().replace(/[`'"]/g, '') : '';

// Shared by server-rendered initial grids and interactive subsequent pages.
export default function VideoCard({ video }) {
  const href = `/v/${video.id}`;
  const channelName = video.channel_name || video.channelName || 'کانال ناشناس';
  return <article className="relative group/card block w-full h-full cursor-pointer touch-manipulation isolate rounded-[10px] border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200/50 transition-all duration-400 overflow-hidden hover:-translate-y-1 hover:scale-[1.02]">
    <Link href={href} className="relative block aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      <SafeImage src={normalizeUrl(video.cover_link || video.thumbnailUrl || video.cover)} alt={video.title} className="w-full h-full bg-black object-contain transition-all duration-700 group-hover/card:scale-105" loading="lazy" width={640} height={360} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
    </Link>
    <div className="flex flex-col justify-between p-4 sm:p-5">
      <h2 className="text-base flex-1 sm:text-lg font-bold leading-tight line-clamp-2 text-slate-900 group-hover/card:text-indigo-600 group-hover/card:font-black transition-all duration-300 mb-3 pr-1"><Link href={href} className="after:absolute after:inset-0 after:content-['']">{video.title}</Link></h2>
      <div className="flex items-center gap-3"><Link href={video.username ? `/${encodeURIComponent(video.username)}` : '/'} className="relative z-10 flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0"><SafeImage src={normalizeUrl(video.channel_image)} alt={channelName} fallback="/assets/img/user.png" width={44} height={44} className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover ring-2 ring-slate-100/50 shadow-lg hover:shadow-indigo-300/50 transition-all duration-300" /></div>
        <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover/card:text-indigo-600 transition-colors">{channelName}</p>{video.description && <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{video.description}</p>}</div>
      </Link></div>
    </div>
  </article>;
}
