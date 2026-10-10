import { useEffect, useRef } from 'react';

/**
 * Reusable hook for infinite scrolling using Intersection Observer
 * @param {Object} options
 * @param {boolean} options.hasNextPage - Whether more data is available
 * @param {boolean} options.isFetchingNextPage - Whether data is currently being fetched
 * @param {Function} options.fetchNextPage - Function to fetch the next page
 * @param {string} options.rootMargin - Margin around the root (default: '300px')
 * @param {number} options.threshold - Threshold for intersection (default: 0.1)
 * @returns {React.RefObject} - Ref to be attached to the sentinel element
 */
export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  rootMargin = '300px 0px',
  threshold = 0.1,
}) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasNextPage) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, rootMargin, threshold]);

  return sentinelRef;
};

export default useInfiniteScroll;
