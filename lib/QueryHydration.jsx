import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
export default function QueryHydration({ entries, children }) {
  const client = new QueryClient();
  for (const [key, value] of entries) client.setQueryData(key, value);
  return <HydrationBoundary state={dehydrate(client)}>{children}</HydrationBoundary>;
}
