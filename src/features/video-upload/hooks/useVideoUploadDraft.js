import { useCallback, useEffect, useMemo, useState } from "react";
import { UPLOAD_TEXT } from "../constants/uploadText";

const THUMBNAIL_POSITIONS = [0.1, 0.5, 0.9];

function captureFrameFromUrl(videoUrl, timeInSeconds = 0) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;

    const cleanup = () => {
      try {
        video.src = "";
      } catch {
        // Ignore cleanup failures for object URLs managed by the browser.
      }
    };

    video.addEventListener("loadedmetadata", () => {
      if (!video.duration || Number.isNaN(video.duration)) {
        video.currentTime = 0;
        return;
      }

      video.currentTime = Math.min(timeInSeconds, video.duration);
    });

    video.addEventListener("seeked", () => {
      try {
        const width = video.videoWidth || 640;
        const height = video.videoHeight || 360;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(video, 0, 0, width, height);
        canvas.toBlob((blob) => {
          cleanup();
          if (!blob) {
            reject(new Error("cannot capture frame"));
            return;
          }
          resolve(blob);
        }, "image/png");
      } catch (error) {
        cleanup();
        reject(error);
      }
    });

    video.addEventListener("error", () => {
      cleanup();
      reject(new Error("video load error / CORS or invalid url"));
    });
  });
}

async function captureFrameFromFile(file, timeInSeconds = 0) {
  const url = URL.createObjectURL(file);
  try {
    return await captureFrameFromUrl(url, timeInSeconds);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function useVideoUploadDraft({ urlReadyText = UPLOAD_TEXT.urlReady } = {}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [tempPath, setTempPath] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoStatus, setVideoStatus] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [publicShow, setPublicShow] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadType, setUploadType] = useState("file");

  const handleVideoSelected = useCallback((file) => {
    setVideoFile(file || null);
    setTempPath(null);
    setVideoStatus(file ? "uploading" : "idle");
    setUploadProgress(0);
    setCoverFile(null);
    setVideoUrl("");
  }, []);

  const handleVideoUploaded = useCallback((payload) => {
    if (!payload) return;

    if (typeof payload === "string") {
      setTempPath(payload);
    } else if (typeof payload === "object") {
      setTempPath(payload.temp_path || null);
      setVideoFile(payload.file || null);
    }

    setVideoStatus("success");
    setUploadProgress(100);
  }, []);

  const handleProgress = useCallback((percent) => {
    setUploadProgress(percent);
    if (percent > 0 && percent < 100) {
      setVideoStatus("uploading");
    }
  }, []);

  const handleVideoUrlChange = useCallback((nextUrl) => {
    setVideoUrl(nextUrl);
    setTempPath(null);
    setVideoFile(null);
    setVideoStatus("idle");
    setUploadProgress(0);
  }, []);

  const handleUploadTypeChange = useCallback((nextType) => {
    setUploadType(nextType);
    setTempPath(null);
    setVideoFile(null);
    setVideoStatus("idle");
    setUploadProgress(0);
    setVideoUrl("");
  }, []);

  const resetDraft = useCallback(() => {
    setTitle("");
    setDescription("");
    setCoverFile(null);
    setTempPath(null);
    setVideoFile(null);
    setVideoStatus("idle");
    setUploadProgress(0);
    setThumbnails([]);
    setPublicShow(1);
    setVideoUrl("");
    setUploadType("file");
  }, []);

  useEffect(() => {
    let canceled = false;
    const createdUrls = [];

    const generate = async () => {
      setThumbnails([]);
      if (!videoFile && !tempPath) return;

      try {
        const video = document.createElement("video");
        let sourceUrl = tempPath;

        if (videoFile) {
          sourceUrl = URL.createObjectURL(videoFile);
        } else {
          video.crossOrigin = "anonymous";
        }

        video.src = sourceUrl;
        await new Promise((resolve, reject) => {
          video.addEventListener("loadedmetadata", resolve);
          video.addEventListener("error", reject);
        });

        const duration = video.duration || 0;
        if (videoFile) URL.revokeObjectURL(sourceUrl);

        const result = [];
        for (const position of THUMBNAIL_POSITIONS) {
          const time = Math.min(duration * position, duration || 0);
          try {
            const blob = videoFile
              ? await captureFrameFromFile(videoFile, time)
              : await captureFrameFromUrl(tempPath, time);
            if (canceled) break;

            const url = URL.createObjectURL(blob);
            createdUrls.push(url);
            result.push({ time, blob, url });
          } catch (error) {
            console.warn("capture frame failed", error);
          }
        }

        if (!canceled) setThumbnails(result);
      } catch (error) {
        console.warn("thumbnail generation overall error", error);
      }
    };

    generate();

    return () => {
      canceled = true;
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [videoFile, tempPath]);

  useEffect(() => {
    return () => {
      thumbnails.forEach((thumbnail) => {
        try {
          URL.revokeObjectURL(thumbnail.url);
        } catch {
          // Ignore cleanup failures for already-revoked URLs.
        }
      });
    };
  }, [thumbnails]);

  const uploadStatusText = useMemo(() => {
    if (uploadType === "url") {
      return videoUrl ? urlReadyText : UPLOAD_TEXT.enterVideoUrl;
    }

    if (videoStatus === "success") return UPLOAD_TEXT.fileReady;
    if (videoStatus === "uploading") return UPLOAD_TEXT.fileUploading;
    return UPLOAD_TEXT.selectFile;
  }, [uploadType, urlReadyText, videoStatus, videoUrl]);

  return {
    canEditMetadata: Boolean(videoFile || tempPath),
    coverFile,
    description,
    handleProgress,
    handleVideoSelected,
    handleVideoUploaded,
    handleVideoUrlChange,
    publicShow,
    resetDraft,
    setCoverFile,
    setDescription,
    setPublicShow,
    setTitle,
    setUploadType: handleUploadTypeChange,
    tempPath,
    thumbnails,
    title,
    uploadProgress,
    uploadStatusText,
    uploadType,
    videoFile,
    videoStatus,
    videoUrl,
  };
}

export default useVideoUploadDraft;
