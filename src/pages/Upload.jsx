import { CloseCircle, TickCircle } from "iconsax-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import cover from "../assets/img/cover.jpg";
import CoverPicker from "../components/Upload/CoverPicker";
import VideoDropzone from "../components/VideoDropzone";
import CategoryMultiSelect from "../components/Upload/CategoryMultiSelect";
import Modal from "../components/Modal";
import useCategories from "../hooks/category/useCategories";
import useCreateCategory from "../hooks/category/useCreateCategory";
import useChannelPlaylists from "../hooks/playlist/useChannelPlaylists";
import useCreatePlaylist from "../hooks/playlist/useCreatePlaylist";
import useChannel from "../hooks/useChannel";
import useVideoUpload from "../hooks/useVideoUpload";
import DashboardLayout from "../layouts/DashboardLayout";

function Upload() {
  const { channels: chans, isLoadingChannels } = useChannel();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreviewUrl, setThumbPreviewUrl] = useState(null);
  const [chanId, setChanId] = useState("");
  const { uploadAsync, isPending } = useVideoUpload();
  const [tempPath, setTempPath] = useState(null);
  const [videoStatus, setVideoStatus] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [publicShow, setPublicShow] = useState(1);
  const [uploadType, setUploadType] = useState("file"); // 'file' | 'url'
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistPublic, setNewPlaylistPublic] = useState(true);

  const navigate = useNavigate();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const { data: playlists = [], isLoading: isLoadingPlaylists } = useChannelPlaylists(chanId || undefined);
  const createPlaylistMutation = useCreatePlaylist(chanId || undefined);

  const handleCancelAndRefresh = () => {
    window.location.reload();
  };

  const captureFrameFromUrl = (videoUrl, timeInSeconds = 0) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;
      const cleanup = () => {
        try {
          video.src = "";
        } catch (e) {}
      };
      const onError = () => {
        cleanup();
        reject(new Error("video load error / CORS or invalid url"));
      };
      video.addEventListener("loadedmetadata", () => {
        if (!video.duration || isNaN(video.duration)) {
          video.currentTime = 0;
        } else {
          const t = Math.min(timeInSeconds, video.duration);
          video.currentTime = t;
        }
      });
      video.addEventListener("seeked", () => {
        try {
          const w = video.videoWidth || 640;
          const h = video.videoHeight || 360;
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, w, h);
          canvas.toBlob((blob) => {
            cleanup();
            if (!blob) return reject(new Error("cannot capture frame"));
            resolve(blob);
          }, "image/png");
        } catch (err) {
          cleanup();
          reject(err);
        }
      });
      video.addEventListener("error", onError);
    });
  };

  const captureFrameFromFile = async (file, timeInSeconds = 0) => {
    const url = URL.createObjectURL(file);
    try {
      const blob = await captureFrameFromUrl(url, timeInSeconds);
      return blob;
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  const handleVideoSelected = (file) => {
    setVideoFile(file || null);
    setTempPath(null);
    setVideoStatus(file ? "uploading" : "idle");
    setUploadProgress(0);
    setThumbFile(null);
    setVideoUrl("");
  };

  const handleVideoUploaded = (payload) => {
    if (!payload) return;

    if (typeof payload === "string") {
      setTempPath(payload);
      setVideoStatus("success");
    } else if (typeof payload === "object") {
      setTempPath(payload.temp_path || null);
      setVideoFile(payload.file || null);
      setVideoStatus("success");
    }

    setUploadProgress(100);
  };
  useEffect(() => {
    let canceled = false;
    const createdUrls = [];

    const generate = async () => {
      setThumbnails([]);
      if (!videoFile && !tempPath) return;

      try {
        let duration = 0;
        if (videoFile) {
          const tmp = document.createElement("video");
          const url = URL.createObjectURL(videoFile);
          tmp.src = url;
          await new Promise((res, rej) => {
            tmp.addEventListener("loadedmetadata", res);
            tmp.addEventListener("error", rej);
          });
          duration = tmp.duration || 0;
          URL.revokeObjectURL(url);

          const positions = [0.1, 0.5, 0.9].map((p) =>
            Math.min(duration * p, duration || 0),
          );
          const resArr = [];
          for (const t of positions) {
            try {
              const blob = await captureFrameFromFile(videoFile, t);
              if (canceled) break;
              const u = URL.createObjectURL(blob);
              createdUrls.push(u);
              resArr.push({ time: t, blob, url: u });
            } catch (err) {
              console.warn("capture from file failed", err);
            }
          }
          if (!canceled) setThumbnails(resArr);
        } else if (tempPath) {
          const tmp = document.createElement("video");
          tmp.crossOrigin = "anonymous";
          tmp.src = tempPath;
          await new Promise((res, rej) => {
            tmp.addEventListener("loadedmetadata", res);
            tmp.addEventListener("error", rej);
          });
          duration = tmp.duration || 0;
          const positions = [0.1 * duration, 0.5 * duration, 0.9 * duration];
          const resArr = [];
          for (const t of positions) {
            try {
              const blob = await captureFrameFromUrl(tempPath, t);
              if (canceled) break;
              const u = URL.createObjectURL(blob);
              createdUrls.push(u);
              resArr.push({ time: t, blob, url: u });
            } catch (err) {
              console.warn("capture from url failed", err);
            }
          }
          if (!canceled) setThumbnails(resArr);
        }
      } catch (err) {
        console.warn("thumbnail generation overall error", err);
      }
    };

    generate();

    return () => {
      canceled = true;
      createdUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [videoFile, tempPath]);

  useEffect(() => {
    if (!thumbFile) {
      if (thumbPreviewUrl) {
        try {
          URL.revokeObjectURL(thumbPreviewUrl);
        } catch (e) {}
        setThumbPreviewUrl(null);
      }
      return;
    }
    if (thumbFile instanceof File || thumbFile instanceof Blob) {
      const u = URL.createObjectURL(thumbFile);
      if (thumbPreviewUrl) {
        try {
          URL.revokeObjectURL(thumbPreviewUrl);
        } catch (e) {}
      }
      setThumbPreviewUrl(u);
    } else {
      if (thumbPreviewUrl) {
        try {
          URL.revokeObjectURL(thumbPreviewUrl);
        } catch (e) {}
        setThumbPreviewUrl(null);
      }
    }
  }, [thumbFile]);

  const handleUpload = async () => {
    if (!title.trim() || !chanId) {
      alert("لطفاً عنوان و کانال را کامل کنید");
      return;
    }

    // 👇 شرط جدید
    if (!tempPath && !videoUrl) {
      alert("لطفاً ویدیو آپلود کنید یا لینک وارد کنید");
      return;
    }

    if (!thumbFile) {
      alert("لطفاً یک تصویر کاور انتخاب کنید");
      return;
    }

    try {
      await uploadAsync({
        channelId: chanId,
        title,
        description: desc,
        temp_path: tempPath,
        url: videoUrl,
        coverFile: thumbFile,
        public_show: publicShow,
        categories: selectedCategories,
        playlist_id: selectedPlaylistId || undefined,
      });

      navigate("/dashboard/videos");
      resetForm();
    } catch {}
  };

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setVideoFile(null);
    setThumbFile(null);
    setThumbPreviewUrl(null);
    setChanId("");
    setTempPath(null);
    setThumbnails([]);
    setVideoStatus("idle");
    setUploadProgress(0);
    setVideoUrl("");
    setPublicShow(1);
    setSelectedCategories([]);
    setSelectedPlaylistId("");
  };

  useEffect(() => {
    return () => {
      if (thumbPreviewUrl) {
        try {
          URL.revokeObjectURL(thumbPreviewUrl);
        } catch (e) {}
      }
      thumbnails.forEach((t) => {
        try {
          URL.revokeObjectURL(t.url);
        } catch (e) {}
      });
    };
  }, []);

  useEffect(() => {
    setTempPath(null);
    setVideoFile(null);
    setVideoStatus("idle");
    setUploadProgress(0);
    setVideoUrl("");
  }, [uploadType]);

  const canEditMetadata = Boolean(videoFile || tempPath);
  const isUploadReady = videoStatus === "success" && Boolean(tempPath);

  const uploadStatusText = useMemo(() => {
    if (uploadType === "url") {
      return videoUrl
        ? "لینک ویدیو وارد شده است."
        : "لطفاً لینک ویدیو را وارد کنید.";
    }

    if (videoStatus === "success")
      return "آپلود ویدیو کامل شده و آماده انتشار است.";
    if (videoStatus === "uploading") return "آپلود ویدیو در حال انجام است.";
    return "ابتدا فایل ویدیو را انتخاب کنید.";
  }, [videoStatus, uploadType, videoUrl]);

  const isFormDisabled = videoStatus !== "success";
  return (
    <DashboardLayout>
      <div className="space-y-2">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setUploadType("file")}
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  uploadType === "file"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500"
                }`}
              >
                آپلود فایل
              </button>

              <button
                onClick={() => setUploadType("url")}
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  uploadType === "url"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500"
                }`}
              >
                لینک ویدیو
              </button>
            </div>
          </div>

          {uploadType === "file" ? (
            <VideoDropzone
              onFileSelected={(file) => {
                handleVideoSelected(file);
                setVideoUrl("");
              }}
              onUploaded={handleVideoUploaded}
              onProgress={(percent) => {
                setUploadProgress(percent);
                if (percent > 0 && percent < 100) {
                  setVideoStatus("uploading");
                }
              }}
            />
          ) : (
            <div className="mt-4">
              <input
                value={videoUrl}
                onChange={(e) => {
                  setVideoUrl(e.target.value);
                  setTempPath(null);
                  setVideoFile(null);
                  setVideoStatus("idle");
                }}
                placeholder="https://example.com/video.mp4"
                className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="mt-4 space-y-2">
            {isFormDisabled && (
              <p className="text-sm">
                لطفا پیش از بارگذاری ویدیو{" "}
                <span className="text-blue-500">قوانین اربعین تی وی</span> را
                مطالعه کنید{" "}
              </p>
            )}
            <div
              className={`rounded-lg border px-3 py-2 text-sm ${videoStatus === "success" ? "border-green-200 bg-green-50 text-green-700" : canEditMetadata ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}
            >
              {uploadStatusText}
              {videoStatus === "uploading" && uploadProgress > 0
                ? ` (${Math.round(uploadProgress)}%)`
                : ""}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-2 justify-center sm:justify-between pt-2">
          <div
            className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm ${canEditMetadata ? "w-full" : "w-full "}`}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              اطلاعات ویدیو
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  عنوان ویدیو <span className="text-red-500">*</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان ویدیو را وارد کنید"
                  className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  توضیحات
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="توضیحات ویدیو را وارد کنید (اختیاری)"
                  className="h-24 px-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  انتخاب کانال <span className="text-red-500">*</span>
                </label>
                <select
                  value={chanId}
                  onChange={(e) => setChanId(e.target.value)}
                  disabled={isLoadingChannels}
                  className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">انتخاب کانال</option>
                  {(chans || []).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">دسته‌بندی‌ها</label>
                <CategoryMultiSelect
                  categories={categories}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  onCreateClick={() => setCategoryModalOpen(true)}
                  isLoading={isLoadingCategories}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">پلی‌لیست</label>
                <div className="flex gap-2">
                  <select value={selectedPlaylistId} onChange={(e) => setSelectedPlaylistId(e.target.value)} className="h-11 px-4 rounded-lg border border-gray-300 w-full">
                    <option value="">بدون پلی‌لیست</option>
                    {(playlists || []).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <button type="button" onClick={() => setPlaylistModalOpen(true)} className="px-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs">پلی‌لیست جدید</button>
                </div>
                {isLoadingPlaylists && <p className="text-xs text-gray-500 mt-1">در حال بارگذاری پلی‌لیست‌ها...</p>}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={publicShow === 1}
                  onChange={(e) => setPublicShow(e.target.checked ? 1 : 0)}
                  className="w-4 h-4 accent-blue-600"
                />
                <label className="text-sm text-gray-700">
                  نمایش عمومی ویدیو
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full ">
            <div className="space-y-4">
              <div>
                <label className=" text-sm font-semibold text-gray-900 mb-5">
                  تصویر کاور (اجباری)
                </label>
                <CoverPicker
                  // isFormDisabled={isFormDisabled}
                  value={thumbFile}
                  onChange={(file) => setThumbFile(file)}
                  onConfirm={(file) => {
                    setThumbFile(file);
                  }}
                  defaultCovers={[
                    cover,
                    "/covers/default2.jpg",
                    "/covers/default3.jpg",
                  ]}
                  videoFile={videoFile}
                  videoUrl={tempPath}
                  videoThumbnails={thumbnails}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end ">
          <button
            onClick={handleUpload}
            disabled={
              !title.trim() ||
              !chanId ||
              (uploadType === "file" && !tempPath) ||
              (uploadType === "url" && !videoUrl) ||
              isPending ||
              !thumbFile
            }
            className="
     h-12 px-6 rounded-lg
    bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
    hover:from-blue-600 hover:via-blue-600 hover:to-blue-600
    disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300
    disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed
    text-white text-sm font-medium
    transition-all duration-200
    flex items-center justify-center gap-2
    shadow-md hover:shadow-lg
  "
          >
            {isPending ? (
              <>در حال آپلود...</>
            ) : (
              <>
                <TickCircle
                  size={20}
                  color={
                    !title.trim() ||
                    !chanId ||
                    (uploadType === "file" && !tempPath) ||
                    (uploadType === "url" && !videoUrl) ||
                    isPending ||
                    !thumbFile
                      ? "#000000"
                      : "#ffffff"
                  }
                />
                انتشار ویدیو
              </>
            )}
          </button>
          <button
            onClick={handleCancelAndRefresh}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm flex items-center gap-2 hover:border-red-300 hover:text-red-700 hover:bg-red-50"
          >
            <CloseCircle size={16} color="#fb2c36" />
            انصراف
          </button>
        </div>
      </div>

      <Modal isOpen={isCategoryModalOpen} onClose={() => setCategoryModalOpen(false)} title="ایجاد دسته‌بندی" size="sm">
        <div className="space-y-3">
          <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="h-10 px-3 border rounded-lg w-full" placeholder="نام دسته‌بندی"/>
          <button className="h-10 w-full rounded-lg bg-blue-600 text-white" onClick={async () => { const created = await createCategoryMutation.mutateAsync({ name: newCategoryName }); setSelectedCategories((prev) => [...new Set([...prev, Number(created?.id)])]); setNewCategoryName(""); setCategoryModalOpen(false); }}>ایجاد</button>
        </div>
      </Modal>

      <Modal isOpen={isPlaylistModalOpen} onClose={() => setPlaylistModalOpen(false)} title="ایجاد پلی‌لیست" size="sm">
        <div className="space-y-3">
          <input value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)} className="h-10 px-3 border rounded-lg w-full" placeholder="نام پلی‌لیست"/>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newPlaylistPublic} onChange={(e)=>setNewPlaylistPublic(e.target.checked)} /> عمومی</label>
          <button className="h-10 w-full rounded-lg bg-blue-600 text-white" onClick={async () => { const created = await createPlaylistMutation.mutateAsync({ name: newPlaylistName, is_public: newPlaylistPublic }); setSelectedPlaylistId(String(created?.id || "")); setNewPlaylistName(""); setPlaylistModalOpen(false); }}>ایجاد</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default Upload;
