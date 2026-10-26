import { useIsFetching, useIsMutating } from "@tanstack/react-query";

function GlobalLoading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gray-200">
      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]" />
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

export default GlobalLoading;

