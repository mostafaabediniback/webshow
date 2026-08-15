import { useNavigate } from "react-router-dom";

function CategoryChips({ channels, activeChannelId, onSelect }) {
  const navigate = useNavigate();

  const list = Array.isArray(channels) ? channels : channels ? [channels] : [];
  // useEffect(() => {
  //   isRefetch()
  // }, [activeChannelId])

  return (
    <div className="flex w-full flex-nowrap gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden p-2 scrollbar-hide">
      {" "}
      <button
        onClick={() => onSelect(null)}
        className={`flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200 ${
          activeChannelId === null
            ? "scale-105"
            : "opacity-75 hover:opacity-100 hover:scale-[1.02]"
        }`}
      >
        <div
          onClick={() => navigate("/")}
          className={`w-16 h-16 rounded-[10px] overflow-hidden border-2 shadow-sm flex items-center justify-center transition-all duration-200 ${
            activeChannelId === null
              ? "border-indigo-500 bg-indigo-50"
              : "border-slate-200 bg-slate-100 hover:border-slate-300"
          }`}
        >
          <span
            className={`text-sm font-medium ${activeChannelId === null ? "text-indigo-600" : "text-slate-600"}`}
          >
            همه
          </span>
        </div>
        {/* <span className={`text-xs font-medium truncate max-w-[56px] ${activeChannelId === null ? 'text-slate-900' : 'text-slate-600'}`}>
          همه
        </span> */}
      </button>
      {list.map((channel) => {
        const isActive = activeChannelId == channel.id;

        return (
          <button
            key={channel.id}
            onClick={() => onSelect(channel.id)}
            className={`flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200 
              //${isActive ? "scale-105" : "opacity-75 hover:opacity-100 hover:scale-[1.02]"}//
              `}
          >
            <div
              onClick={() => navigate("/")}
              className={`w-16 h-16 rounded-[10px] overflow-hidden border-2 shadow-sm transition-all duration-200 ${
                isActive
                  ? "border-indigo-500 ring-2 ring-indigo-200"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img
                src={channel.image}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* <span className={`text-xs font-medium truncate max-w-[56px] ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
              {channel.name}
            </span> */}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryChips;
