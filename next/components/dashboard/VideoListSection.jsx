'use client'

import { memo } from 'react'

function VideoListSection({ title, items, page, totalPages, onPageChange, isLoading }) {
  return (
    <section className="card">
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {isLoading ? <p className="muted">در حال بارگذاری...</p> : null}
      <div className="grid">
        {items.map((v) => (
          <article key={v.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
            <span>{v.title}</span>
            <span className="muted">{v.channel_name || v.channelName}</span>
          </article>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="btn" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>قبلی</button>
        <button className="btn" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>بعدی</button>
      </div>
    </section>
  )
}

export default memo(VideoListSection)
