import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "../ui";
import {
  PublicOnly,
  RequireAuth,
  RequireChannelAdmin,
  RequirePlatformAdmin,
  RequireUser,
} from "./guards";

const Categories = lazy(() => import("../pages/Categories"));
const Channels = lazy(() => import("../pages/Channels"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const PlaylistDetail = lazy(() => import("../pages/PlaylistDetail"));
const ProfileChannel = lazy(() => import("../pages/ProfileChannel"));
const Search = lazy(() => import("../pages/Search"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const Upload = lazy(() => import("../pages/Upload"));
const UploadedVideos = lazy(() => import("../pages/UploadedVideos"));
const UserDashboard = lazy(() => import("../pages/UserDashboard"));
const UserCreateChannel = lazy(() => import("../pages/UserCreateChannel"));
const Users = lazy(() => import("../pages/Users"));
const UserVideos = lazy(() => import("../pages/UserVideos"));
const Video = lazy(() => import("../pages/Video"));
const VideoEdit = lazy(() => import("../pages/VideoEdit"));
const Videos = lazy(() => import("../pages/Videos"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Spinner size="lg" />
  </div>
);

const withAuth = (children) => <RequireAuth>{children}</RequireAuth>;

const withPlatformAdmin = (children) => (
  <RequireAuth>
    <RequirePlatformAdmin>{children}</RequirePlatformAdmin>
  </RequireAuth>
);

const withChannelAdmin = (children) => (
  <RequireAuth>
    <RequireChannelAdmin>{children}</RequireChannelAdmin>
  </RequireAuth>
);

const withUser = (children) => (
  <RequireAuth>
    <RequireUser>{children}</RequireUser>
  </RequireAuth>
);

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username?" element={<ProfileChannel />} />
        <Route path="/search/:q" element={<Search />} />
        <Route path="/v/:id" element={<Video />} />
        <Route path="/playlists/:playlistId" element={<PlaylistDetail />} />
        <Route
          path="/login"
          element={
            <PublicOnly>
              <Login />
            </PublicOnly>
          }
        />

        <Route path="/dashboard" element={withAuth(<Dashboard />)} />
        <Route
          path="/dashboard/channels"
          element={withPlatformAdmin(<Channels />)}
        />
        <Route
          path="/dashboard/upload"
          element={withPlatformAdmin(<Upload />)}
        />
        <Route
          path="/dashboard/playlists/:playlistId"
          element={withAuth(<PlaylistDetail />)}
        />
        <Route path="/dashboard/videos" element={withPlatformAdmin(<Videos />)} />
        <Route
          path="/dashboard/videos/:id"
          element={withPlatformAdmin(<VideoEdit />)}
        />
        <Route path="/dashboard/users" element={withPlatformAdmin(<Users />)} />
        <Route
          path="/dashboard/categories"
          element={withPlatformAdmin(<Categories />)}
        />
        <Route
          path="/dashboard/user-upload"
          element={withChannelAdmin(<UserVideos />)}
        />
        <Route
          path="/dashboard/user-videos"
          element={withChannelAdmin(<UploadedVideos />)}
        />
        <Route
          path="/dashboard/settings"
          element={withChannelAdmin(<SettingsPage />)}
        />

        <Route path="/user-dashboard" element={withUser(<UserDashboard />)} />
        <Route
          path="/user-dashboard/create-channel"
          element={withUser(<UserCreateChannel />)}
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
