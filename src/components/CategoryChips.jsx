function CategoryChips({ channels, activeChannelId, onSelect }) {
  const list = Array.isArray(channels) ? channels : (channels ? [channels] : [])
  return (
    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={`flex flex-col items-center gap-1 flex-shrink-0 transition ${
          activeChannelId === null ? 'scale-105' : 'opacity-70 hover:opacity-100'
        }`}
      >
        <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${activeChannelId === null ? 'border-blue-600' : 'border-gray-300'} bg-gray-100 flex items-center justify-center`}>
          <span className="text-sm text-gray-700">همه</span>
        </div>
        <span className="text-xs truncate max-w-[56px]">همه</span>
      </button>

      {list.map((channel) => {
        const isActive = activeChannelId === channel.id

        return (
          <button
            key={channel.id}
            onClick={() => onSelect(channel.id)}
            className={`flex flex-col items-center gap-1 flex-shrink-0 transition ${
              isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full overflow-hidden border-2 ${
                isActive ? 'border-blue-600' : 'border-gray-300'
              }`}
            >
              <img
                src={channel.image}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-xs truncate max-w-[56px]">
              {channel.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryChips

