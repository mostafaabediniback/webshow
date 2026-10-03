const asPositiveInteger = (value, fallback) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
};

/**
 * Normalizes Laravel-style paginator envelopes used by the dashboard APIs.
 * The backend puts pagination metadata at the response root, while the list
 * itself is normally in `data` (or, for a few responses, `data.data`).
 */
export const normalizePaginatedResponse = (payload, explicitItems) => {
  const root = payload && typeof payload === "object" ? payload : {};
  const nestedData = root?.data && typeof root.data === "object" ? root.data : {};

  const items = Array.isArray(explicitItems)
    ? explicitItems
    : Array.isArray(root?.data)
      ? root.data
      : Array.isArray(nestedData?.data)
        ? nestedData.data
        : Array.isArray(root)
          ? root
          : [];

  const rawMeta = root?.meta ?? root?.pagination ?? nestedData?.meta ?? {};
  const meta = {
    ...rawMeta,
    current_page: asPositiveInteger(rawMeta?.current_page, 1),
    last_page: asPositiveInteger(rawMeta?.last_page, 1),
    per_page: asPositiveInteger(rawMeta?.per_page, items.length || 1),
    total: Number.isFinite(Number(rawMeta?.total))
      ? Number(rawMeta.total)
      : items.length,
  };

  return {
    items,
    links: root?.links ?? nestedData?.links ?? {},
    meta,
    totalPages: meta.last_page,
    totalItems: meta.total,
  };
};

export const normalizePage = (page) => asPositiveInteger(page, 1);

/** Fetches every page of a normalized list for selectors without pagination. */
export const getAllPaginatedItems = async (fetchPage) => {
  const firstPage = await fetchPage(1);
  const items = [...firstPage.items];

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    const nextPage = await fetchPage(page);
    items.push(...nextPage.items);
  }

  const seenIds = new Set();
  return items.filter((item) => {
    if (item?.id === undefined || item?.id === null) return true;

    const id = String(item.id);
    if (seenIds.has(id)) return false;

    seenIds.add(id);
    return true;
  });
};
