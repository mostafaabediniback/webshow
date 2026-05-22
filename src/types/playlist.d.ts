export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginationMeta {
  current_page?: number;
  from?: number | null;
  last_page?: number;
  links?: PaginationLink[];
  path?: string;
  per_page?: number;
  to?: number | null;
  total?: number;
}

export interface PlaylistSummary {
  id: number | string;
  name: string;
  is_public?: boolean | number;
  videos_count?: number;
  thumbnail?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PlaylistVideo {
  id: number | string;
  title?: string;
  description?: string;
  channel_id?: number | string;
  channel_name?: string;
  cover_link?: string;
  video_link?: string;
  username?: string;
  view_count?: number;
  duration?: number | string;
  order?: number | string;
  pivot?: {
    order?: number | string;
  };
}

export interface PlaylistListResponse {
  items: PlaylistSummary[];
  meta: PaginationMeta;
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
  totalItems: number;
  totalPages: number;
}

export interface PlaylistDetailResponse {
  playlist: PlaylistSummary | null;
  items: PlaylistVideo[];
  meta: PaginationMeta;
  totalItems: number;
  totalPages: number;
}

export interface CreatePlaylistPayload {
  name: string;
  is_public: boolean;
}

export interface PlaylistMutationPayload {
  playlistId: number | string;
  videoId: number | string;
}

export interface VideoPlaylistValue {
  id: number | string;
  name?: string;
}
