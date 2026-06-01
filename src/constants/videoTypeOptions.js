/**
 * @typedef {"all" | "published" | "private"} VideoType
 */

export const VIDEO_TYPE_OPTIONS = [
  { value: "all", label: "همه ویدیوها" },
  // { value: "published", label: "منتشر شده" },
  { value: "private", label: "منتشر نشده" },
];

export const DEFAULT_VIDEO_TYPE = "all";
