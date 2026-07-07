import VideoDropzone from "../../../components/VideoDropzone";
import { UPLOAD_TEXT } from "../constants/uploadText";

function UploadSourceCard({
  draft,
  showUploadTypeTabs = false,
  showProgress = false,
}) {
  const isFormDisabled = draft.videoStatus !== "success";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {showUploadTypeTabs && (
        <div className="flex justify-center mb-4">
          <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
            <button
              type="button"
              onClick={() => draft.setUploadType("file")}
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                draft.uploadType === "file"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {UPLOAD_TEXT.uploadFile}
            </button>

            <button
              type="button"
              onClick={() => draft.setUploadType("url")}
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                draft.uploadType === "url"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {UPLOAD_TEXT.videoLink}
            </button>
          </div>
        </div>
      )}

      {draft.uploadType === "file" ? (
        <VideoDropzone
          onFileSelected={(file) => draft.handleVideoSelected(file)}
          onUploaded={draft.handleVideoUploaded}
          onProgress={draft.handleProgress}
        />
      ) : (
        <div className="mt-4">
          <input
            value={draft.videoUrl}
            onChange={(event) => draft.handleVideoUrlChange(event.target.value)}
            placeholder="https://example.com/video.mp4"
            className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="mt-4 space-y-2">
        {isFormDisabled && (
          <p className="text-sm">
            {UPLOAD_TEXT.rulesPrefix}{" "}
            <span className="text-blue-500">{UPLOAD_TEXT.rulesTitle}</span>{" "}
            {UPLOAD_TEXT.rulesSuffix}
          </p>
        )}
        <div
          className={`rounded-lg border px-3 py-2 text-sm ${
            draft.videoStatus === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : draft.canEditMetadata
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {draft.uploadStatusText}
          {showProgress &&
          draft.videoStatus === "uploading" &&
          draft.uploadProgress > 0
            ? ` (${Math.round(draft.uploadProgress)}%)`
            : ""}
        </div>
      </div>
    </div>
  );
}

export default UploadSourceCard;
