'use client'

export default function CategoryChips({ channels, activeChannelId, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button className="btn" onClick={() => onSelect('')} style={{ background: !activeChannelId ? '#0f172a' : '#f97316' }}>همه</button>
      {channels.map((channel) => (
        <button
          key={channel.id}
          className="btn"
          onClick={() => onSelect(channel.id)}
          style={{ background: activeChannelId === channel.id ? '#0f172a' : '#f97316' }}
        >
          {channel.name}
        </button>
      ))}
    </div>
  )
}
