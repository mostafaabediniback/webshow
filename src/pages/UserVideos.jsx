import { CloseCircle, TickCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryMultiSelect from "../components/Upload/CategoryMultiSelect";
import Modal from "../components/Modal";
import useCategories from "../hooks/category/useCategories";
import useCreateCategory from "../hooks/category/useCreateCategory";
import useChannelPlaylists from "../hooks/playlist/useChannelPlaylists";
import useCreatePlaylist from "../hooks/playlist/useCreatePlaylist";
import cover from "../assets/img/cover.jpg";
import CoverPicker from "../components/Upload/CoverPicker";
import VideoDropzone from "../components/VideoDropzone";
import useVideoUpload from "../hooks/useVideoUpload";
import DashboardLayout from "../layouts/DashboardLayout";
import useAuthStore from "../store/useAuthStore";
import { useMemo } from "react";

function UserVideos() {
  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin);

  const { uploadAsync, isPending } = useVideoUpload();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [tempPath, setTempPath] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoStatus, setVideoStatus] = useState("idle");
  const [thumbnails, setThumbnails] = useState([]);
  const [publicShow, setPublicShow] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadType, setUploadType] = useState("file"); // 'file' | 'url'
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistPublic, setNewPlaylistPublic] = useState(true);
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const { data: playlists = [], isLoading: isLoadingPlaylists } = useChannelPlaylists();
  const createPlaylistMutation = useCreatePlaylist();

  // helper: capture frame from URL
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

  // wrapper: capture frame from File
  const captureFrameFromFile = async (file, timeInSeconds = 0) => {
    const url = URL.createObjectURL(file);
    try {
      const blob = await captureFrameFromUrl(url, timeInSeconds);
      return blob;
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  // دریافت نتیجه VideoDropzone (مثل Upload)
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
  };
  const handleVideoSelected = (file) => {
    setVideoFile(file || null);
    setTempPath(null);
    setVideoStatus("uploading");

    setVideoUrl("");
  };

  // تولید thumbnails (همان منطق Upload)
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

  // create/revoke preview URL for thumbnail (existing behavior)
  useEffect(() => {
    if (!thumbFile) {
      if (thumbPreview) {
        try {
          URL.revokeObjectURL(thumbPreview);
        } catch (e) {}
        setThumbPreview(null);
      }
      return;
    }
    if (thumbFile instanceof File || thumbFile instanceof Blob) {
      const u = URL.createObjectURL(thumbFile);
      if (thumbPreview) {
        try {
          URL.revokeObjectURL(thumbPreview);
        } catch (e) {}
      }
      setThumbPreview(u);
    } else {
      if (thumbPreview) {
        try {
          URL.revokeObjectURL(thumbPreview);
        } catch (e) {}
        setThumbPreview(null);
      }
    }
  }, [thumbFile]);

  const isUploadReady = videoStatus === "success" && Boolean(tempPath);

  const uploadStatusText = useMemo(() => {
    if (uploadType === "url") {
      return videoUrl
        ? "لینک ویدیو آماده ثبت است."
        : "لطفاً لینک ویدیو را وارد کنید.";
    }

    if (videoStatus === "success")
      return "آپلود ویدیو کامل شده و آماده انتشار است.";
    if (videoStatus === "uploading") return "آپلود ویدیو در حال انجام است.";
    return "ابتدا فایل ویدیو را انتخاب کنید.";
  }, [videoStatus, uploadType, videoUrl]);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setThumbFile(null);
    setThumbPreview(null);
    setTempPath(null);
    setVideoFile(null);
    setVideoStatus("idle");
    setThumbnails([]);
    setVideoUrl("");
    setPublicShow(1);
    setSelectedCategories([]);
    setSelectedPlaylistId("");
  };
  const handleCancelAndRefresh = () => {
    window.location.reload();
  };

  const handleUpload = async () => {
    if (!title || !title.trim()) {
      toast.error("لطفاً عنوان ویدیو را وارد کنید");
      return;
    }

    // 👇 شرط جدید
    if (!tempPath && !videoUrl) {
      toast.error("لطفاً ویدیو آپلود کنید یا لینک وارد کنید");
      return;
    }

    if (!thumbFile) {
      toast.error("لطفاً یک تصویر کاور انتخاب کنید");
      return;
    }

    try {
      await uploadAsync({
        title: title.trim(),
        description: desc,
        temp_path: tempPath,
        url: videoUrl,
        coverFile: thumbFile,
        public_show: publicShow,
        categories: selectedCategories,
        playlist_id: selectedPlaylistId || undefined,
      });

      navigate("/dashboard/user-videos");
      resetForm();
    } catch {}
  };

  useEffect(() => {
    return () => {
      if (thumbPreview) {
        try {
          URL.revokeObjectURL(thumbPreview);
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
    setVideoUrl("");
  }, [uploadType]);

  const isFormDisabled = videoStatus !== "success"; // غیرفعال شدن وقتی ویدیو آپلود نشده

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
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
              onProgress={() => {}}
            />
          ) : (
            <div>
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

          {isFormDisabled && (
            <p className="text-sm mt-4">
              لطفا پیش از بارگذاری ویدیو{" "}
              <span className="text-blue-500">قوانین اربعین تی وی</span> را
              مطالعه کنید
            </p>
          )}
          <div
            className={`rounded-lg border px-3 py-2 mt-3 text-sm ${videoStatus === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}
          >
            {uploadStatusText}
            {/* {videoStatus === 'uploading' && uploadProgress > 0 ? ` (${Math.round(uploadProgress)}%)` : ''} */}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 justify-center sm:justify-between pt-2">
          <div
            className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full `}
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
                  className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
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
                  className="h-54 px-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">دسته‌بندی‌ها</label>
                <CategoryMultiSelect categories={categories} value={selectedCategories} onChange={setSelectedCategories} onCreateClick={() => setCategoryModalOpen(true)} isLoading={isLoadingCategories} />
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  تصویر کاور (اجباری)
                </label>
                <div>
                  <CoverPicker
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
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={handleUpload}
            disabled={
              !title ||
              (uploadType === "file" && !tempPath) ||
              (uploadType === "url" && !videoUrl) ||
              isPending ||
              !thumbFile
            }
            className="   h-12 px-6 rounded-lg
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
            className={`px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm flex items-center gap-2 hover:border-red-300 hover:text-red-700 hover:bg-red-50 `}
          >
            <CloseCircle size={16} color="#fb2c36" />
            انصراف
          </button>
        </div>
      </div>
      <Modal isOpen={isCategoryModalOpen} onClose={() => setCategoryModalOpen(false)} title="ایجاد دسته‌بندی" size="sm"><div className="space-y-3"><input value={newCategoryName} onChange={(e)=>setNewCategoryName(e.target.value)} className="h-10 px-3 border rounded-lg w-full"/><button className="h-10 w-full rounded-lg bg-blue-600 text-white" onClick={async()=>{const created=await createCategoryMutation.mutateAsync({name:newCategoryName});setSelectedCategories((prev)=>[...new Set([...prev, Number(created?.id)])]);setNewCategoryName("");setCategoryModalOpen(false);}}>ایجاد</button></div></Modal>
      <Modal isOpen={isPlaylistModalOpen} onClose={() => setPlaylistModalOpen(false)} title="ایجاد پلی‌لیست" size="sm"><div className="space-y-3"><input value={newPlaylistName} onChange={(e)=>setNewPlaylistName(e.target.value)} className="h-10 px-3 border rounded-lg w-full"/><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newPlaylistPublic} onChange={(e)=>setNewPlaylistPublic(e.target.checked)}/> عمومی</label><button className="h-10 w-full rounded-lg bg-blue-600 text-white" onClick={async()=>{const created=await createPlaylistMutation.mutateAsync({name:newPlaylistName,is_public:newPlaylistPublic});setSelectedPlaylistId(String(created?.id||""));setNewPlaylistName("");setPlaylistModalOpen(false);}}>ایجاد</button></div></Modal>
    </DashboardLayout>
  );
}

export default UserVideos;
